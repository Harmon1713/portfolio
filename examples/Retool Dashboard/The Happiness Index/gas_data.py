import requests
import pandas as pd

# Your API key
api_key = "DQlCnmjlAIvGehGNwWhbYJhSlGpehfmBjTh3gcwS"

# API URL
url = "https://api.eia.gov/v2/petroleum/pri/gnd/data/?frequency=weekly&data[0]=value&start=2024-04-22&end=2024-08-12&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000"
# Add the API key to the URL
url_with_key = f"{url}&api_key={api_key}"

# Send a GET request to the API
response = requests.get(url_with_key)

# Check if the request was successful
if response.status_code == 200:
    data = response.json()
    print("Data retrieved successfully")

    # Extract the data part from the JSON response
    records = data.get("response", {}).get("data", [])

    if not records:
        print("No data found in the response.")
    else:
        # Convert the data to a DataFrame
        df = pd.DataFrame(records)
        
        # Save the DataFrame to a CSV file
        df.to_csv("gas_prices2.csv", index=False)
        print("Data saved to gas_prices2.csv")
else:
    print(f"Failed to retrieve data: {response.status_code}")
    print(response.text)  # Print the error message if any
