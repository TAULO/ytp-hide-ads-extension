(() => {
    console.log("Hello from, Hide YT Ad's!")

    if (document.readyState !== "loading") {
        const video = document.querySelector("#movie_player > div.html5-video-container > video")
        let isOn = true

        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                isOn = request.isOn
                sendResponse({ isOn })
            });

        let hasMuted = true

        if (video && isOn) {
            // if the video has been paused from some time, the event listner somehow stop listening
            video.addEventListener("timeupdate", () => {
                if (isOn) {
                    console.log("Running!")
                    hasAd = document.querySelector(".video-ads.ytp-ad-module").children.length > 0
                    
                    if (hasAd) {
                        console.log("Ad is playing")
                        
                        // skip ad
                        document.querySelector(".ytp-ad-skip-button-modern.ytp-button")?.click()
                        
                        // mute ad
                        if (!video.muted) {
                            video.muted = true
                            hasMuted = true
                        }
                        
                        // hide ad
                        if (video.style.display !== "none") {
                            video.style.display = "none"
                        }
                    } else {
                        if (video.muted && hasMuted) {
                            video.muted = false
                            hasMuted = false
                        }
        
                        if (video.style.display === "none") {
                            video.style.display = "block" // return to default
                        }
                    }
                }
            })
        }
    }
})()

