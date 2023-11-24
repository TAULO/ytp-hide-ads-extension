console.debug("Hello from, Hide YT Ad's!")

let hasMuted = true

function hide(video) {
                        
    // skip ad
    document.querySelector(".ytp-ad-skip-button-modern.ytp-button")?.click()

    if (video.playbackRate = 1) {
        video.playbackRate = 16
    }
    
    // mute ad
    if (!video.muted) {
        video.muted = true
        hasMuted = true
    }
    
    // hide ad
    if (video.style.display !== "none") {
        video.style.display = "none"
    }
}

function show(video) {
    if (video.playbackRate !== 1) {  
        video.playbackRate = 1
    }

    if (video.muted && hasMuted) {
        video.muted = false
        hasMuted = false
    }

    if (video.style.display === "none") {
        video.style.display = "block" // return to default
    }
}

async function handleTimeUpdate(video, enabled) {
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
}

let video = document.querySelector("#movie_player > div.html5-video-container > video")

if (video) {
    setInterval(async () => { 
        const { enabled } = await chrome.storage.sync.get("enabled")

        if (enabled) {
            video = document.querySelector("#movie_player > div.html5-video-container > video")
            await handleTimeUpdate(video, enabled)
        }
    }, 500)
}

