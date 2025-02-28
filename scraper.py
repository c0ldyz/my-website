import requests
from bs4 import BeautifulSoup

# URL of the visa information page
url = "https://example-government-visa-website.com"

# Send a request to the website
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Extract visa information
visa_info = []
for item in soup.find_all('div', class_='visa-details'):
    visa_type = item.find('h3').text
    duration = item.find('p', class_='duration').text
    requirements = [li.text for li in item.find_all('li')]
    fees = item.find('span', class_='fees').text

    visa_info.append({
        "type": visa_type,
        "duration": duration,
        "requirements": requirements,
        "fees": fees
    })

# Print the scraped data
print(visa_info)