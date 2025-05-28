import os
import requests
import psycopg2
from dotenv import load_dotenv
from datetime import datetime
import base64

# Load environment variables from .env file
load_dotenv()

# Access credentials
client_id = os.getenv("SPOTIFY_CLIENT_ID")
client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")
db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")

# Establish connection to PostgreSQL database
conn = psycopg2.connect(
    dbname=db_name,
    user=db_user,
    password=db_password,
    host=db_host,
    port=db_port
)
cur = conn.cursor()

# Function to get Spotify API token
def get_spotify_token():
    # Combine client ID and client secret into a single string, separated by a colon
    client_credentials = f"{client_id}:{client_secret}"
    
    # Encode the string as bytes, then base64 encode it
    client_credentials_b64 = base64.b64encode(client_credentials.encode("ascii")).decode("ascii")
    
    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": f"Basic {client_credentials_b64}"
    }
    data = {"grant_type": "client_credentials"}
    
    response = requests.post(url, headers=headers, data=data)
    
    # Raise an error if the request failed
    response.raise_for_status()
    
    return response.json()["access_token"]

# Function to fetch and store track data
def fetch_and_store_track_data(artist_id):
    token = get_spotify_token()
    headers = {"Authorization": f"Bearer {token}"}

    url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks?market=US"
    response = requests.get(url, headers=headers)

    # Print the JSON response for debugging
    print(response.json())

    # Attempt to access the 'tracks' key
    tracks = response.json().get("tracks", [])
    
    if not tracks:
        print("No tracks found or invalid response format")
        return

    for track in tracks:
        cur.execute("""
            INSERT INTO tracks (track_id, name, popularity, album_id, date_recorded)
            VALUES (%s, %s, %s, %s, %s)
            """, (track["id"], track["name"], track["popularity"], track["album"]["id"], datetime.today()))
        conn.commit()

# Function to fetch and store album data
def fetch_and_store_album_data(artist_id):
    token = get_spotify_token()
    headers = {"Authorization": f"Bearer {token}"}

    url = f"https://api.spotify.com/v1/artists/{artist_id}/albums?market=US"
    response = requests.get(url, headers=headers)

    # Check if the response contains an error
    if response.status_code != 200:
        print(f"Error fetching albums: {response.json()['error']['message']}")
        return

    albums = response.json().get("items", [])
    
    if not albums:
        print("No albums found or invalid response format")
        return

    for album in albums:
        cur.execute("""
            INSERT INTO albums (album_id, name, release_date, popularity)
            VALUES (%s, %s, %s, %s)
            """, (
                album["id"], 
                album["name"], 
                album["release_date"], 
                album.get("popularity", 0)  # Default to 0 if 'popularity' is missing
            ))
        conn.commit()

# Function to fetch and store playlist data with pagination
def fetch_and_store_playlist_data(artist_name):
    token = get_spotify_token()
    headers = {"Authorization": f"Bearer {token}"}
    
    url = f"https://api.spotify.com/v1/search?q={artist_name}&type=playlist&limit=10"
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print(f"Error fetching playlists: {response.json()['error']['message']}")
        return
    
    playlists = response.json().get("playlists", {}).get("items", [])
    
    if not playlists:
        print("No playlists found or invalid response format")
        return
    
    for playlist in playlists:
        print(f"Processing playlist: {playlist['name']}")

        tracks = fetch_playlist_tracks(playlist["id"], token)

        for track in tracks:
            cur.execute("""
                INSERT INTO playlists (playlist_id, name, track_id, inclusion_date)
                VALUES (%s, %s, %s, %s)
                """, (playlist["id"], playlist["name"], track["track"]["id"], datetime.today()))
        conn.commit()

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

# Function to fetch and store follower data
def fetch_and_store_follower_data(artist_id):
    token = get_spotify_token()
    headers = {"Authorization": f"Bearer {token}"}

    url = f"https://api.spotify.com/v1/artists/{artist_id}"
    response = requests.get(url, headers=headers)
    artist = response.json()

    cur.execute("""
        INSERT INTO followers (artist_id, follower_count, date_recorded)
        VALUES (%s, %s, %s)
        """, (artist_id, artist["followers"]["total"], datetime.today()))
    conn.commit()

# Example usage
artist_id = "7MiDcPa6UiV3In7lIM71IN"  # Gusttavo Lima's Spotify Artist ID
artist_name = "Gusttavo Lima"

fetch_and_store_track_data(artist_id)
fetch_and_store_album_data(artist_id)
fetch_and_store_playlist_data(artist_name)
fetch_and_store_follower_data(artist_id)

# Close the database connection
cur.close()
conn.close()
