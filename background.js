let extensionState = true;

chrome.runtime.onInstalled.addListener(async () => {
    // Check if the 'enabled' key is already set in storage
    await chrome.storage.sync.get('enabled', async (data) => {
        // If not set, initialize it to true
        if (data.enabled === undefined) {
            await chrome.storage.sync.set({
                enabled: true
            });
        }
    });
});

// Toggle extension state when the button is clicked
chrome.browserAction.onClicked.addListener(async () => {
    extensionState = !extensionState;
    await chrome.storage.sync.set({
        enabled: extensionState
    });
});