# YouTube Focus Viewer

## Overview
YouTube Focus Viewer is a web application designed to enhance focus time when watching YouTube videos by removing distractions and providing a cleaner viewing experience. The application now includes user profiles and expanded theme customization options.

## Features
- Embed YouTube videos without navigating to YouTube.com
- Distraction-free viewing interface
- CSS grid layout for improved user experience
- Main video section with a placeholder for 4-5 related videos
- Enhanced theme customization with user preference tracking
- User profiles with local storage support
- Navigation menu for easy access to Home and Profile pages

## Problem Statements and Solutions

### Initial Problem
Users wanted a way to watch YouTube videos with reduced distractions.

**Solution:** Created an HTML webpage that embeds a YouTube Video viewer using HTML5 elements for videos and links.

### User Experience Improvement
The initial layout provided limitations and a suboptimal user experience.

**Solution:** Implemented a CSS grid layout with a main video section and a placeholder for related videos, improving overall usability and increasing site traffic.

### Theme Customization Tracking
67% of users requested expanded theme customization features.

**Solution:** Implemented a comprehensive theme customization option with user profiles. Users can now select from at least 3 additional themes using radio buttons or a toggle switch. Theme preferences are stored in local storage and applied across sessions.

### User Profile Creation
Users needed a way to personalize their experience and save preferences.

**Solution:** Added a profile creation form that collects user name, email, password, and theme preference. The form includes validation to ensure the user name is at least 4 characters long.

## Technical Implementation
- HTML5 video elements
- CSS grid for layout
- Local Storage for saving user profiles and preferences
- Form validation for user profile creation
- Expanded theme options with at least 3 new themes
- Centered navigation menu with Home and Profile links
- Radio buttons or toggle switch for theme selection

## Usage
1. Open the web application.
2. Use the navigation menu to access Home or Profile pages.
3. Create a profile by filling out the form on the Profile page.
4. Select a theme preference.
5. Watch videos on the Home page with your personalized settings.
6. Your profile and theme preference will be saved and applied on future visits.

## Future Enhancements
- Analytics integration for better understanding of feature usage.
- User accounts for cross-device preference syncing.
- Additional customization options beyond themes.

## Contributing
Contributions to improve the YouTube Focus Viewer are welcome. Please submit pull requests or open issues to discuss proposed changes.

## License
[None yet]

## Personal notes
I placed lots of comments in the code because I'm bad at explaining things so I wrote a lot to help me and others understand easier, and hopefully those with no coding experience can follow along.