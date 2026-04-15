# LittleLink Interactive - A Dynamic Social Media Linktree App

A modern, interactive portfolio link-sharing app that allows users to customize their profile, upload images, and dynamically add/manage social media links.

## Features ✨

- **Profile Customization**
  - Upload custom profile picture (stores as base64 in localStorage)
  - Edit name and bio
  - Changes persist across sessions

- **Dynamic Social Media Links**
  - Add unlimited social media links
  - 15+ platforms supported (GitHub, LinkedIn, Twitter, Instagram, Discord, Twitch, YouTube, Facebook, TikTok, etc.)
  - Edit existing links
  - Delete links with confirmation
  - All data saved locally in browser

- **Responsive Design**
  - Mobile-friendly interface
  - Dark/light theme support
  - Beautiful gradient buttons for each platform

- **Data Persistence**
  - All data saved in browser's localStorage
  - No server required
  - Each user's data is private and local

## Getting Started

### Installation

1. Clone or download this repository
2. No build process needed - it's a pure static site

### Usage

1. **Open the app**: Open `index.html` in your web browser
2. **Edit Profile**:
   - Click the "Edit Profile" button below the profile picture
   - Upload a new profile image
   - Update your name and bio
   - Click "Save Profile"

3. **Add Social Media Links**:
   - Click the "+ Add New App" button
   - Select a platform from the dropdown
   - Enter your profile URL
   - Click "Add Link"

4. **Manage Links**:
   - Click "Edit" to modify a link
   - Click "Delete" to remove a link

### Supported Platforms

- GitHub
- LinkedIn
- Twitter / X
- Instagram
- Behance
- Bluesky
- Goodreads
- Substack
- TikTok
- YouTube
- Facebook
- Discord
- Twitch
- Email
- Portfolio Website

(Easy to add more - see the `PLATFORMS` object in `js/app.js`)

## File Structure

```
linktreeapp/
├── index.html           # Main HTML file
├── css/
│   ├── reset.css        # CSS reset
│   ├── style.css        # Main styles
│   ├── brands.css       # Brand-specific button colors
│   └── app.css          # Interactive features styles
├── js/
│   └── app.js           # Main JavaScript app logic
├── images/
│   ├── profile.png      # Default profile picture
│   └── icons/           # Social media icons (SVG)
├── fonts/               # Custom fonts
└── docker/
    ├── Dockerfile       # Docker configuration
    └── compose.yaml     # Docker compose setup
```

## Data Storage

- **Local Storage Key**: `littlelink_profile`
- **Stored Data**:
  ```json
  {
    "name": "Your Name",
    "bio": "Your bio here",
    "profileImage": "data:image/png;base64,...",
    "links": [
      {
        "id": 1681234567890,
        "platform": "github",
        "url": "https://github.com/yourprofile",
        "name": "GitHub"
      }
    ]
  }
  ```

## Deployment

### Local Testing
```bash
# Just open index.html in a browser - no server needed!
open index.html
```

### Docker Deployment
```bash
# Build and run with Docker
docker-compose up -d

# App will be available at http://localhost
```

### Static Hosting
Deploy to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Cloudflare Pages

## Sharing Your Profile

Once deployed, share the URL with others. Your profile will be fully functional and they can see all your links!

## Customization

### Add New Platforms

Edit `js/app.js` and add to the `PLATFORMS` object:

```javascript
yourplatform: { 
  name: 'Your Platform', 
  icon: 'yourplatform', 
  color: 'button-yourplatform' 
},
```

Then add a button style in `css/brands.css`:

```css
.button-yourplatform {
  background: #yourcolor;
  border-radius: 8px;
}
```

### Themes

The app supports automatic dark/dark mode detection. Adjust by changing the `theme-` class on the `<html>` tag:
- `theme-auto`: Auto-detect based on system preferences
- `theme-light`: Force light theme
- `theme-dark`: Force dark theme

### Styling

All styles can be customized in the CSS files:
- `css/style.css`: Main layout and typography
- `css/app.css`: Interactive UI (forms, buttons, modals)
- `css/brands.css`: Platform-specific button colors

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technical Details

- **No Backend Required**: All data is stored locally in the browser
- **No Dependencies**: Pure HTML, CSS, and JavaScript
- **Lightweight**: ~15KB total (minified)
- **Fast**: Instant loading, no API calls
- **Privacy**: All user data stays on their device

## Privacy & Data

- User data is stored exclusively in browser localStorage
- No data is sent to any server
- No cookies are tracking users
- Users can clear data by clearing browser storage

## Troubleshooting

### Images not uploading?
- Ensure your browser allows localStorage (not private/incognito mode)
- Check browser console for errors (F12)

### Links not saving?
- Verify localStorage is enabled
- Try a different browser
- Clear browser cache and retry

### Styling issues?
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check that all CSS files are loading
- Verify no browser extensions are interfering

## Future Enhancements

Possible improvements:
- Export/import data as JSON
- QR code generation
- Analytics tracking
- Social sharing features
- Backup to cloud storage
- Custom themes and colors
- Profile templates
- Analytics dashboard

## License

MIT License - Feel free to use and modify!

## Credits

Based on [LittleLink](https://littlelink.io) - A lightweight link aggregator.

Enhanced with interactive features for easy profile management.

---

**Questions?** This is a simple, self-contained web app. Open `index.html` in any browser and start customizing!
