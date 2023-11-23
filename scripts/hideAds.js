console.debug("Hello from, Hide YT Ad's!")

let hasMuted = true

function hide(node) {
                        
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

async function handleTimeUpdate(node) {
    let { enabled } = await chrome.storage.sync.get("enabled")

    if (enabled) {
        const hasAd = document.querySelector(".video-ads.ytp-ad-module").children.length > 0
        
        if (hasAd) {
            hide(node)
        } else {
            show(node)
        }
    } else {
        show(node)
    }
}

let video = document.querySelector("#movie_player > div.html5-video-container > video")

if (video) {
    // if the video has been paused and played again the script stops
    // however set interval seems to correct this
    // video.addEventListener("timeupdate", async () => {
    //     // video = document.querySelector("#movie_player > div.html5-video-container > video")
    //     await handleTimeUpdate(video)
    // })

    setInterval(async () => { 
        video = document.querySelector("#movie_player > div.html5-video-container > video")
        await handleTimeUpdate(video)
    }, 500)
}

