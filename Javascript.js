// Object containing video data for each category
const videos = {
    category1: {
        urls: [
            {id: "nFpoZGSEVx0", title: "Funny Video 1"},
            {id: "3L_olCnKckw", title: "Funny Video 2"}
        ],
        description: "A collection of funny videos to make you laugh"
    },
    category2: {
        urls: [
            {id: "6g2vk8Gudqs", title: "Game Video 1"},
            {id: "bg8i4CvE74M", title: "Game Video 2"}
        ],
        description: "Exciting gameplay videos from various popular games"
    }
};

let currentVideoIndex = 0;

// Get references to DOM elements
const mainVideoContainer = document.getElementById('main-video-container');
const categoryElement = document.getElementById('category');
const autoplayCheckbox = document.getElementById('autoplay');
const descriptionElement = document.getElementById('video-description');
const videoTitleElement = document.getElementById('video-title');
const suggestedVideosContainer = document.getElementById('suggested-videos');
const pageTitleElement = document.getElementById('page-title');

// Function to create YouTube embed iframe
function createYouTubeEmbed(videoId) {
    return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
}

// Function to play the next video when autoplay is enabled
function playNextVideo() {
    if (autoplayCheckbox.checked) {
        currentVideoIndex = (currentVideoIndex + 1) % videos[categoryElement.value].urls.length;
        updateMainVideo();
    }
}

// Function to update the main video
function updateMainVideo() {
    const category = categoryElement.value;
    const video = videos[category].urls[currentVideoIndex];
    mainVideoContainer.innerHTML = createYouTubeEmbed(video.id);
    videoTitleElement.textContent = video.title;
    descriptionElement.textContent = videos[category].description;
}

// Function to update the suggested videos
function updateSuggestedVideos() {
    const category = categoryElement.value;
    suggestedVideosContainer.innerHTML = '';
    videos[category].urls.forEach((video, index) => {
        if (index !== currentVideoIndex) {
            const videoItem = document.createElement('div');
            videoItem.className = 'video-item';
            videoItem.innerHTML = `
                <img src="https://img.youtube.com/vi/${video.id}/0.jpg" alt="Video thumbnail">
                <p>${video.title}</p>
            `;
            videoItem.addEventListener('click', () => {
                currentVideoIndex = index;
                updateMainVideo();
            });
            suggestedVideosContainer.appendChild(videoItem);
        }
    });
}

// Function to update the page title
function updatePageTitle() {
    const pageTitleElement = document.getElementById('page-title');
    const category = categoryElement.value;
    if (category === 'category1') {
      pageTitleElement.textContent = 'Try not to Laugh';
    } else if (category === 'category2') {
      pageTitleElement.textContent = 'Game Videos';
    }
  }

// Function to update both main video and suggested videos
function updateVideoAndDescription() {
    currentVideoIndex = 0;
    updateMainVideo();
    updateSuggestedVideos();
    updatePageTitle(); // Add this line
  }

// Event listener for category change
categoryElement.addEventListener('change', updateVideoAndDescription);

// Set interval to check for autoplay and change video every 5 seconds
setInterval(playNextVideo, 5000);

// Initial update of video and description
updateVideoAndDescription();
