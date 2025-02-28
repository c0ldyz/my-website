import requests
from bs4 import BeautifulSoup
import json
import os
import re

# URL of the Wikipedia page
url = "https://en.wikipedia.org/wiki/Visa_requirements_for_British_citizens"

# Send a request to the website
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Find the visa requirements table
table = soup.find('table', {'class': 'wikitable'})

# Extract column headers to identify the indices of the required columns
headers = [header.text.strip() for header in table.find_all('th')]
country_index = headers.index("Country / Region") if "Country / Region" in headers else -1
requirement_index = headers.index("Visa requirement") if "Visa requirement" in headers else -1  # Lowercase "r"
allowed_stay_index = headers.index("Allowed stay") if "Allowed stay" in headers else -1
notes_index = headers.index("Notes (excluding departure fees)") if "Notes (excluding departure fees)" in headers else -1

# Function to clean text
def clean_text(text):
    # Remove newlines and extra spaces
    text = text.replace('\n', ' ').strip()
    # Remove citations (e.g., [376], [377])
    text = re.sub(r'\[\d+\]', '', text)
    # Remove any remaining extra spaces
    text = re.sub(r'\s+', ' ', text)
    return text

# Extract visa information
visa_info = []
for row in table.find_all('tr')[1:]:  # Skip the header row
    columns = row.find_all('td')
    if len(columns) >= 4:  # Ensure there are enough columns
        country = columns[country_index].text.strip() if country_index != -1 else "N/A"
        requirement = columns[requirement_index].text.strip() if requirement_index != -1 else "N/A"
        allowed_stay = columns[allowed_stay_index].text.strip() if allowed_stay_index != -1 else "N/A"
        notes = columns[notes_index].text.strip() if notes_index != -1 and len(columns) > notes_index else "No notes available"

        # Clean the text
        country = clean_text(country)
        requirement = clean_text(requirement)
        allowed_stay = clean_text(allowed_stay)
        notes = clean_text(notes)

        # Handle special characters (e.g., Côte d'Ivoire)
        country = country.encode('utf-8', errors='ignore').decode('utf-8')
        requirement = requirement.encode('utf-8', errors='ignore').decode('utf-8')
        allowed_stay = allowed_stay.encode('utf-8', errors='ignore').decode('utf-8')
        notes = notes.encode('utf-8', errors='ignore').decode('utf-8')

        visa_info.append({
            "country": country,
            "requirement": requirement,
            "allowed_stay": allowed_stay,
            "notes": notes
        })

# Create a folder to store the scraped data
output_folder = "scraped_data"
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Save the scraped data to a JSON file with a dynamic name
output_file = os.path.join(output_folder, "visaData_GB.json")  # GB for British citizens
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(visa_info, f, indent=4, ensure_ascii=False)

print(f"Scraped data saved to {output_file}")