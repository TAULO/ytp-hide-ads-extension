console.log("Hejsa! Skip YT Ad's!")

let hasMuted = true

// also remove sponsored videos
function removeSponsoredVideos() {
    document.querySelectorAll("ytd-ad-slot-renderer").forEach(parent => {
        parent?.querySelectorAll(".style-scope.ytd-badge-supported-renderer").forEach(ele => {
            const spons =  ele?.innerHTML
            if (spons === "Sponsored") {
                parent.remove()
            }
        })
    })
}

(function foo() {
    document.querySelectorAll(".ytp-ad-text").forEach(e => {
        if (e.innerHTML === "Skip") e.click() 
    })
})()

function skip(video) {
                        
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

function skipAdd(video, enabled) {
    if (enabled) {
        const hasAd = document.querySelector(".video-ads.ytp-ad-module")?.children.length > 0   
        if (hasAd) {
            skip(video)
        } else {
            show(video)
        }
    } else {
        show(video)
    }
}

let video = document.querySelector("#movie_player > div.html5-video-container > video")

setInterval(async () => {
    video = document.querySelector("#movie_player > div.html5-video-container > video")
    const { enabled } = await chrome.storage.sync.get("enabled")
    if (enabled) {
        removeSponsoredVideos()
        video = document.querySelector("#movie_player > div.html5-video-container > video")
        if (video) {
            skipAdd(video, enabled)
        }
    }
}, 500)

