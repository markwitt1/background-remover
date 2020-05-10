// Saves options to chrome.storage
function setAccuracy() {
    var accuracy = document.getElementById('accuracy').value;
    chrome.storage.sync.set({
        accuracy: accuracy
    }, () => {
        // Update status to let user know options were saved.
        document.getElementById('indicator').textContent = accuracy;
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function getAccuracy() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get("accuracy", function (items) {
        document.getElementById('accuracy').value = items.accuracy;
        document.getElementById('indicator').textContent = items.accuracy;
    });
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('accuracy').onchange = setAccuracy;
    getAccuracy();
});