// Video data
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
};

let currentVideoIndex = 0;

// DOM Elements
const mainVideoContainer = document.getElementById('main-video-container');
const categoryElement = document.getElementById('category');
const autoplayCheckbox = document.getElementById('autoplay');
const descriptionElement = document.getElementById('video-description');
const videoTitleElement = document.getElementById('video-title');
const suggestedVideosContainer = document.getElementById('suggested-videos');
const pageTitleElement = document.getElementById('page-title');
const modal = document.getElementById("profileModal");
const createProfileBtn = document.getElementById("createProfileBtn");
const closeSpan = document.getElementsByClassName("close")[0];
const profileForm = document.getElementById("profileForm");
const profileLink = document.getElementById('profileLink');
const profileDisplayModal = document.getElementById('profileDisplayModal');
const profileInfo = document.getElementById('profileInfo');

// Functions
function createYouTubeEmbed(videoId) {
  return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
}

function playNextVideo() {
  if (autoplayCheckbox.checked) {
      currentVideoIndex = (currentVideoIndex + 1) % videos[categoryElement.value].urls.length;
      updateMainVideo();
  }
}

function updateMainVideo() {
  const category = categoryElement.value;
  const video = videos[category].urls[currentVideoIndex];
  mainVideoContainer.innerHTML = createYouTubeEmbed(video.id);
  videoTitleElement.textContent = video.title;
  descriptionElement.textContent = videos[category].description;
}

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

function updatePageTitle() {
  const category = categoryElement.value;
  pageTitleElement.textContent = category === 'category1' ? 'Try not to Laugh' : 'Game Videos';
}

function updateVideoAndDescription() {
  currentVideoIndex = 0;
  updateMainVideo();
  updateSuggestedVideos();
  updatePageTitle();
}

function applyTheme(theme) {
  document.body.className = theme + "-theme";
}

function loadSavedTheme() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData && userData.theme) {
      applyTheme(userData.theme);
  }
}

function displayProfile() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
      profileInfo.innerHTML = `
          <p><strong>Username:</strong> ${userData.username}</p>
          <p><strong>Email:</strong> ${userData.email}</p>
          <p><strong>Theme:</strong> ${userData.theme}</p>
      `;
      profileDisplayModal.style.display = "block";
  } else {
      alert("No profile found. Please create a profile first.");
  }
}

function initializeApp() {
  updateVideoAndDescription();
  loadSavedTheme();
}

// Event Listeners
categoryElement.addEventListener('change', updateVideoAndDescription);

createProfileBtn.onclick = function() {
  modal.style.display = "block";
}

closeSpan.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
  if (event.target == profileDisplayModal) {
      profileDisplayModal.style.display = "none";
  }
}

document.querySelectorAll('.close').forEach(closeButton => {
  closeButton.onclick = function() {
      modal.style.display = "none";
      profileDisplayModal.style.display = "none";
  }
});

profileLink.addEventListener('click', (e) => {
  e.preventDefault();
  displayProfile();
});

profileForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const theme = document.querySelector('input[name="theme"]:checked').value;

  if (username.length < 4) {
      alert('Username must be at least 4 characters long.');
      return;
  }

  const userData = { username, email, theme };
  localStorage.setItem('userData', JSON.stringify(userData));

  applyTheme(theme);
  alert('Profile created successfully!');
  profileForm.reset();
  modal.style.display = "none";
});

// Autoplay functionality
setInterval(playNextVideo, 5000);

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);