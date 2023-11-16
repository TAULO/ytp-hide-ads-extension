(async () => {
    // I guess the only way to go is local storage:)

    let isOn = undefined

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            isOn = request.isOn ?? true
            console.log(isOn)
        }
    )

    if(isOn === undefined) isOn = true

    const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    });

    isOn = !isOn

    await chrome.tabs.sendMessage(tab.id, {
        isOn: isOn
    });

    document.querySelector("#toggleBtn").addEventListener("click", async () => {
        const btn = document.querySelector("#toggleBtn")

        if (isOn) { // off
            isOn = false
            await chrome.tabs.sendMessage(tab.id, { isOn });
            btn.style.opacity = 0.5 
        } else { // on
            isOn = true
            await chrome.tabs.sendMessage(tab.id, { isOn });
            btn.style.opacity = 1
        }
    })
})()