document.getElementById("visaForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let nationality = document.getElementById("nationality").value;
    let destination = document.getElementById("destination").value;

    // Simulate fetching data (replace with actual API call)
    let results = fetchVisaInfo(nationality, destination);
    displayResults(results);
});

function fetchVisaInfo(nationality, destination) {
    // Replace with actual data fetching logic
    return [
        {
            type: "Tourist Visa",
            duration: "30 days",
            requirements: ["Passport", "Visa application form"],
            fees: "$25"
        },
        {
            type: "Business Visa",
            duration: "90 days",
            requirements: ["Passport", "Invitation letter"],
            fees: "$50"
        }
    ];
}

function displayResults(results) {
    let resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "<h2>Visa Options</h2>";

    results.forEach(result => {
        let resultItem = document.createElement("div");
        resultItem.className = "result-item";
        resultItem.innerHTML = `
            <strong>${result.type}</strong>
            <p>Duration: ${result.duration}</p>
            <p>Requirements: ${result.requirements.join(", ")}</p>
            <p>Fees: ${result.fees}</p>
        `;
        resultsContainer.appendChild(resultItem);
    });
}