let hasMuted = true

function hide(node) {
    console.log("Ad is playing")
                        
    // skip ad
    document.querySelector(".ytp-ad-skip-button-modern.ytp-button")?.click()
    
    // mute ad
    if (!node.muted) {
        node.muted = true
        hasMuted = true
    }
    
    // hide ad
    if (node.style.display !== "none") {
        node.style.display = "none"
    }
}

function show(node) {
    if (node.muted && hasMuted) {
        node.muted = false
        hasMuted = false
    }

    if (node.style.display === "none") {
        node.style.display = "block" // return to default
    }
}

(async () => {
    console.log("Hello from, Hide YT Ad's!")

    if (document.readyState !== "loading") {
        const video = document.querySelector("#movie_player > div.html5-video-container > video")

        if (video) {
            // if the video has been paused from some time, the event listner somehow stop listening
            video.addEventListener("timeupdate", async () => {
                const { enabled } = await chrome.storage.sync.get("enabled")
                console.log("On: " + enabled)

                if (enabled) {
                    const hasAd = document.querySelector(".video-ads.ytp-ad-module").children.length > 0
                    
                    if (hasAd) {
                        hide(video)
                    } else {
                        show(video)
                    }
                } else {
                    show(video)
                }
            })
        }
    }
})()

