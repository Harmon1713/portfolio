import requests
import pandas as pd
from io import StringIO

# Define the URL with your API key
url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/georgia%2C%20usa/2024-01-01/2024-08-12?unitGroup=us&include=days&key=KE695ZTG9YBS636GJU42CYPQ9&contentType=csv"

try:
    # Send a GET request to the API
    response = requests.get(url)
    response.raise_for_status()  # Raise an error for bad status codes

    # Read the CSV data from the response content using StringIO
    data = pd.read_csv(StringIO(response.text))

    # Extract the datetime and feelslike columns
    temperature_data = data[['datetime', 'feelslike']]

    # Save the data to a CSV file
    temperature_data.to_csv('georgia_real_feel_temperatures.csv', index=False)

    print("Data saved successfully!")

except requests.exceptions.HTTPError as err:
    print(f"Failed to retrieve data: {err}")
