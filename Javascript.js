// This object stores information about different videos
const videos = {
  category1: {
      urls: [
          {id: "nFpoZGSEVx0", title: "Funny Video 1"},
          {id: "3L_olCnKckw", title: "Funny Video 2"},
          {id: "EBaz1bmibGY", title: "Funny Video 3"},
          {id: "3z0U4zSsQGc", title: "Funny Video 4"}
      ],
      description: "A collection of funny videos to make you laugh"
  },
  category2: {
      urls: [
          {id: "6g2vk8Gudqs", title: "Game Video 1"},
          {id: "bg8i4CvE74M", title: "Game Video 2"},
          {id: "T4DFKOlrXCQ", title: "Game Video 3"},
          {id: "wNfZ8vJi4L8", title: "Game Video 4"}
      ],
      description: "Exciting gameplay videos from various popular games"
  }
}
// This is like a catalog of videos. It organizes videos into categories (funny videos and game videos),
// and stores their YouTube IDs, titles, and descriptions.


let currentVideoIndex = 0;
// This keeps track of which video is currently playing.


// These lines find specific elements on the webpage so we can interact with them
const mainVideoContainer = document.getElementById('main-video-container');
const categoryElement = document.getElementById('category');
const autoplayCheckbox = document.getElementById('autoplay');
const descriptionElement = document.getElementById('video-description');
const videoTitleElement = document.getElementById('video-title');
const suggestedVideosContainer = document.getElementById('suggested-videos');
const pageTitleElement = document.getElementById('page-title');

// This function creates the YouTube video player
function createYouTubeEmbed(videoId) {
  return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
}
// It takes a YouTube video ID and returns the HTML code to embed that video on the page.

// This function plays the next video if autoplay is turned on
function playNextVideo() {
  if (autoplayCheckbox.checked) {
      currentVideoIndex = (currentVideoIndex + 1) % videos[categoryElement.value].urls.length;
      updateMainVideo();
  }
}
// It checks if autoplay is on, then moves to the next video in the list and updates the main video.

// This function updates the main video player
function updateMainVideo() {
  const category = categoryElement.value;
  const video = videos[category].urls[currentVideoIndex];
  mainVideoContainer.innerHTML = createYouTubeEmbed(video.id);
  videoTitleElement.textContent = video.title;
  descriptionElement.textContent = videos[category].description;
}
// It gets the current category and video, creates the YouTube player, and updates the title and description.

// This function updates the list of suggested videos
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
// It creates a list of other videos in the same category, showing their thumbnails and titles.
// When you click on a suggested video, it becomes the main video.

// This function updates the page title based on the selected category
function updatePageTitle() {
  const category = categoryElement.value;
  if (category === 'category1') {
    pageTitleElement.textContent = 'Try not to Laugh';
  } else if (category === 'category2') {
    pageTitleElement.textContent = 'Game Videos';
  }
}

// This function updates everything when you change the category
function updateVideoAndDescription() {
  currentVideoIndex = 0;
  updateMainVideo();
  updateSuggestedVideos();
  updatePageTitle();
}

// This listens for when you change the category and updates everything
categoryElement.addEventListener('change', updateVideoAndDescription);

// This checks every 5 seconds if it should play the next video
setInterval(playNextVideo, 5000);

// The following code handles the theme selection feature

// These find the elements for the theme selection pop-up
const modal = document.getElementById("themeModal");
const btn = document.getElementById("themeBtn");
const span = document.getElementsByClassName("close")[0];
const form = document.getElementById("themeForm");

// This opens the theme selection pop-up when you click the button
btn.onclick = function() {
  modal.style.display = "block";
}

// This closes the pop-up when you click the 'x'
span.onclick = function() {
  modal.style.display = "none";
}

// This closes the pop-up if you click outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// This handles what happens when you submit the theme form
form.onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const theme = document.getElementById("theme").value;

  // It saves your preferences
  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userTheme", theme);

  // It applies the theme you chose
  applyTheme(theme);

  // It closes the pop-up
  modal.style.display = "none";
}

// This function applies the theme you chose
function applyTheme(theme) {
  document.body.className = theme + "-theme";
}

// This loads your saved theme when you open the page
function loadSavedTheme() {
  const savedTheme = localStorage.getItem("userTheme");
  if (savedTheme) {
    applyTheme(savedTheme);
  }
}

// This function sets everything up when the page loads
function initializeApp() {
  updateVideoAndDescription();
  loadSavedTheme();
}

// This makes sure everything is set up when the page is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);