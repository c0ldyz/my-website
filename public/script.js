// public/script.js

document.getElementById("signup-btn").addEventListener("click", function() {
    alert("Sign-up functionality coming soon!");
});

function searchDebates() {
    let query = document.getElementById("search").value;
    let resultsContainer = document.getElementById("results-container");

    if (!query.trim()) {
        resultsContainer.innerHTML = "<p style='color:red;'>Please enter a search term.</p>";
        return;
    }

    resultsContainer.innerHTML = `<p>Searching debates for: <strong>${query}</strong>...</p>`;
}
