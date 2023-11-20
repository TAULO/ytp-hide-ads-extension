document.addEventListener('DOMContentLoaded', async () => {
    const toggleButton = document.getElementById('toggleButton');
    
    // Fetch the extension state from storage and update the button
    await chrome.storage.sync.get('enabled', (data) => {
        extensionState = data.enabled !== undefined ? data.enabled : true;
        updateButton(extensionState)
    
        // Add click event listener to the button
        toggleButton.addEventListener('click', async () => {
            extensionState = !extensionState;
            await chrome.storage.sync.set({ enabled: extensionState });
            updateButton(extensionState)
        });
    });
    
    // Function to update the button text based on the extension state
    function updateButton(state) {
        toggleButton.checked = state
        toggleButton.innerText = state ? "On" : "Off"
    }
});      