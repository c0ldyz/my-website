// Fetch the scraped data from the JSON file
fetch('/scraped_data/visaData_GB.json')
    .then(response => response.json())
    .then(data => {
        // Extract the list of countries from the scraped data
        const countries = data.map(entry => ({
            name: entry.country,
            code: entry.country // Use the country name as the code for simplicity
        }));

        // Manually add the United Kingdom to the list
        countries.unshift({ name: "United Kingdom", code: "United Kingdom" });

        // Populate the Nationality dropdown
        populateDropdown(document.getElementById("nationality"), countries);

        // Add an event listener to the Nationality dropdown
        document.getElementById("nationality").addEventListener("change", function () {
            const selectedNationality = this.value;
            const filteredCountries = countries.filter(country => country.code !== selectedNationality);
            populateDropdown(document.getElementById("destination"), filteredCountries);
        });

        // Initially populate the Destination dropdown with all countries
        populateDropdown(document.getElementById("destination"), countries);
    })
    .catch(error => {
        console.error("Error loading visa data:", error);
    });

// Function to populate a dropdown
function populateDropdown(dropdown, countries) {
    // Clear existing options
    dropdown.innerHTML = '';

    // Add a default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select a country";
    dropdown.appendChild(defaultOption);

    // Add countries to the dropdown
    countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country.code;
        option.text = country.name;
        dropdown.appendChild(option);
    });
}

// Handle form submission
document.getElementById("visaForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const nationality = document.getElementById("nationality").value;
    const destination = document.getElementById("destination").value;

    // Fetch visa info from the backend
    fetch(`/visa-info?nationality=GB&destination=${destination}`) // Hardcode nationality=GB for now
        .then(response => {
            if (!response.ok) {
                throw new Error("No visa data found for the selected destination.");
            }
            return response.json();
        })
        .then(data => {
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = `
                <h2>Visa Information</h2>
                <p><strong>Nationality:</strong> ${data.nationality}</p>
                <p><strong>Destination:</strong> ${data.destination}</p>
                <p><strong>Visa Requirement:</strong> ${data.requirement}</p>
                <p><strong>Allowed Stay:</strong> ${data.allowed_stay}</p>
                <p><strong>Notes:</strong> ${data.notes}</p>
            `;
        })
        .catch(error => {
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = `<p class="error">${error.message}</p>`;
        });
});