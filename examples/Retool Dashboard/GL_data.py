import os
import requests
import pandas as pd
from dotenv import load_dotenv
from datetime import datetime
import base64

# Load environment variables from .env file
load_dotenv()

# Access credentials
client_id = os.getenv("SPOTIFY_CLIENT_ID")
client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")

# Function to get Spotify API token
def get_spotify_token():
    client_credentials = f"{client_id}:{client_secret}"
    client_credentials_b64 = base64.b64encode(client_credentials.encode("ascii")).decode("ascii")
    
    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": f"Basic {client_credentials_b64}"
    }
    data = {"grant_type": "client_credentials"}
    
    response = requests.post(url, headers=headers, data=data)
    response.raise_for_status()
    
    return response.json()["access_token"]

# Function to fetch and save track data
def fetch_and_save_track_data(artist_id):
    token = get_spotify_token()
    headers = {"Authorization": f"Bearer {token}"}
    
    url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks?market=US"
    response = requests.get(url, headers=headers)
    tracks = response.json().get("tracks", [])

    if not tracks:
        print("No tracks found or invalid response format")
        return

    # Save data to a CSV file
    track_data = [{
        "track_id": track["id"],
        "name": track["name"],
        "popularity": track["popularity"],
        "album_id": track["album"]["id"],
        "date_recorded": datetime.today()
    } for track in tracks]

    df_tracks = pd.DataFrame(track_data)
    df_tracks.to_csv('spotify_tracks_glima.csv', index=False)
    print("Track data saved to spotify_tracks_glima.csv")

# Function to fetch and save album data
def fetch_and_save_album_data(artist_id):
    token = get_spotify_token()
    headers = {"Authorization": f"Bearer {token}"}
    
    url = f"https://api.spotify.com/v1/artists/{artist_id}/albums?market=US"
    response = requests.get(url, headers=headers)
    albums = response.json().get("items", [])

    if not albums:
        print("No albums found or invalid response format")
        return

    # Save data to a CSV file
    album_data = [{
        "album_id": album["id"],
        "name": album["name"],
        "release_date": album["release_date"],
        "popularity": album.get("popularity", 0)  # Default to 0 if 'popularity' is missing
    } for album in albums]

    df_albums = pd.DataFrame(album_data)
    df_albums.to_csv('spotify_albums_glima.csv', index=False)
    print("Album data saved to spotify_albums_glima.csv")

# Function to fetch and save playlist data with pagination
def fetch_and_save_playlist_data(artist_name):
    token = get_spotify_token()
    headers = {"Authorization": f"Bearer {token}"}
    
    url = f"https://api.spotify.com/v1/search?q={artist_name}&type=playlist&limit=10"
    response = requests.get(url, headers=headers)
    playlists = response.json().get("playlists", {}).get("items", [])

    if not playlists:
        print("No playlists found or invalid response format")
        return

    all_tracks = []
    for playlist in playlists:
        print(f"Processing playlist: {playlist['name']}")
        tracks = fetch_playlist_tracks(playlist["id"], token)
        
        for track in tracks:
            all_tracks.append({
                "playlist_id": playlist["id"],
                "name": playlist["name"],
                "track_id": track["track"]["id"],
                "inclusion_date": datetime.today()
            })

    if all_tracks:
        df_playlists = pd.DataFrame(all_tracks)
        df_playlists.to_csv('spotify_playlists_glima.csv', index=False)
        print("Playlist data saved to spotify_playlists_glima.csv")

# Function to fetch tracks from a playlist with pagination support
def fetch_playlist_tracks(playlist_id, access_token):
    url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    response = requests.get(url, headers=headers)
    response_data = response.json()
    
    tracks = []
    
    while response_data:
        if 'items' in response_data:
            tracks.extend(response_data['items'])
            if response_data['next']:
                response = requests.get(response_data['next'], headers=headers)
                response_data = response.json()
            else:
                break
        else:
            print(f"Missing 'items' in playlist: {playlist_id}")
            break
    
    return tracks

# Function to fetch and save follower data
def fetch_and_save_follower_data(artist_id):
    token = get_spotify_token()
    headers = {"Authorization": f"Bearer {token}"}
    
    url = f"https://api.spotify.com/v1/artists/{artist_id}"
    response = requests.get(url, headers=headers)
    artist = response.json()

    follower_data = [{
        "artist_id": artist_id,
        "follower_count": artist["followers"]["total"],
        "date_recorded": datetime.today()
    }]

    df_followers = pd.DataFrame(follower_data)
    df_followers.to_csv('spotify_followers_glima.csv', index=False)
    print("Follower data saved to spotify_followers_glima.csv")

# Example usage
artist_id = "7MiDcPa6UiV3In7lIM71IN"  # Gusttavo Lima's Spotify Artist ID
artist_name = "Gusttavo Lima"

fetch_and_save_track_data(artist_id)
fetch_and_save_album_data(artist_id)
fetch_and_save_playlist_data(artist_name)
fetch_and_save_follower_data(artist_id)
