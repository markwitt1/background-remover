// Saves options to chrome.storage
function setTolerance() {
    var tolerance = document.getElementById('tolerance').value;
    chrome.storage.sync.set({
        tolerance: tolerance
    }, () => {
        // Update status to let user know options were saved.
        document.getElementById('indicator').textContent = tolerance;
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function getTolerance() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get("tolerance", function (items) {
        document.getElementById('tolerance').value = items.tolerance;
        document.getElementById('indicator').textContent = items.tolerance;
    });
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('tolerance').onchange = setTolerance;
    getTolerance();
});