function searchTopic() {
    let searchQuery = document.getElementById("search").value;
    if (searchQuery.trim() !== "") {
        alert("Searching for: " + searchQuery);
    } else {
        alert("Please enter a topic to search.");
    }
}
