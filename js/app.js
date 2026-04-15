// LittleLink Interactive App
// Manages profile customization and dynamic social media links

const APP = (() => {
  const STORAGE_KEY = 'littlelink_profile';
  const PLATFORMS = {
    github: { name: 'GitHub', icon: 'github', color: 'button-github' },
    linkedin: { name: 'LinkedIn', icon: 'linkedin', color: 'button-linked' },
    twitter: { name: 'Twitter', icon: 'twitter', color: 'button-twitter' },
    instagram: { name: 'Instagram', icon: 'instagram', color: 'button-instagram' },
    behance: { name: 'Behance', icon: 'behance', color: 'button-behance' },
    bluesky: { name: 'Bluesky', icon: 'bluesky', color: 'button-bluesky' },
    goodreads: { name: 'Goodreads', icon: 'goodreads', color: 'button-goodreads' },
    substack: { name: 'Substack', icon: 'substack', color: 'button-substack' },
    tiktok: { name: 'TikTok', icon: 'tiktok', color: 'button-tiktok' },
    youtube: { name: 'YouTube', icon: 'youtube', color: 'button-youtube' },
    facebook: { name: 'Facebook', icon: 'facebook', color: 'button-faceb' },
    discord: { name: 'Discord', icon: 'discord', color: 'button-discord' },
    twitch: { name: 'Twitch', icon: 'twitch', color: 'button-twitch' },
    email: { name: 'Email', icon: 'generic-email-alt', color: 'button-default' },
    portfolio: { name: 'Portfolio', icon: 'generic-website', color: 'button-default' },
  };

  let profile = {
    name: 'Your Name',
    bio: 'Your bio here',
    profileImage: null, // No default image
    links: [],
  };

  // Determine if we're in edit mode
  const isEditMode = () => {
    return new URLSearchParams(window.location.search).get('edit') === 'true';
  };

  // Initialize app
  const init = () => {
    loadProfile();
    setupEventListeners();
    renderLinks();
    updateProfileDisplay();
    updateUIForMode();
  };

  // Update UI based on edit/view mode
  const updateUIForMode = () => {
    const addLinkBtn = document.getElementById('addLinkBtn');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const doneBtn = document.getElementById('doneBtn');

    if (isEditMode()) {
      // Edit mode: show buttons
      if (addLinkBtn) addLinkBtn.style.display = 'block';
      if (editProfileBtn) editProfileBtn.style.display = 'block';
      if (doneBtn) doneBtn.style.display = 'block';
    } else {
      // View mode: hide edit buttons
      if (addLinkBtn) addLinkBtn.style.display = 'none';
      if (editProfileBtn) editProfileBtn.style.display = 'none';
      if (doneBtn) doneBtn.style.display = 'none';
    }
  };

  // Load profile from localStorage
  const loadProfile = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        profile = JSON.parse(saved);
        updateProfileDisplay();
      } catch (e) {
        console.error('Failed to load profile:', e);
      }
    }
  };

  // Save profile to localStorage
  const saveProfile = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  };

  // Setup event listeners
  const setupEventListeners = () => {
    // Profile edit button
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
      editProfileBtn.addEventListener('click', toggleProfileForm);
    }

    // Profile form submission
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', handleProfileSubmit);
    }

    // Image upload
    const imageUpload = document.getElementById('imageUpload');
    if (imageUpload) {
      imageUpload.addEventListener('change', handleImageUpload);
    }

    // Platform search
    const platformSearch = document.getElementById('platformSearch');
    if (platformSearch) {
      platformSearch.addEventListener('input', handlePlatformSearch);
    }

    // Add link button
    const addLinkBtn = document.getElementById('addLinkBtn');
    if (addLinkBtn) {
      addLinkBtn.addEventListener('click', toggleLinkForm);
    }

    // Done button (for switching to view mode)
    const doneBtn = document.getElementById('doneBtn');
    if (doneBtn) {
      doneBtn.addEventListener('click', handleDoneClick);
    }

    // Link form submission
    const linkForm = document.getElementById('linkForm');
    if (linkForm) {
      linkForm.addEventListener('submit', handleLinkSubmit);
    }

    // Close buttons
    document.querySelectorAll('.close-form').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.target.closest('.form-overlay').style.display = 'none';
      });
    });
  };

  // Toggle profile edit form
  const toggleProfileForm = () => {
    const overlay = document.getElementById('profileFormOverlay');
    if (overlay) {
      overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
      document.getElementById('profileName').value = profile.name;
      document.getElementById('profileBio').value = profile.bio;
    }
  };

  // Toggle link form
  const toggleLinkForm = () => {
    const overlay = document.getElementById('linkFormOverlay');
    if (overlay) {
      overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
      // Clear form fields when opening
      if (overlay.style.display === 'block') {
        document.getElementById('platformSearch').value = '';
        document.getElementById('platformSelect').value = '';
        document.getElementById('selectedPlatformDisplay').innerHTML = '';
        document.getElementById('platformSuggestions').innerHTML = '';
        document.getElementById('linkUrl').value = '';
      }
    }
  };

  // Handle Done button - generate shareable link
  const handleDoneClick = () => {
    // Generate the view-only link (without the ?edit=true parameter)
    const shareableLink = window.location.origin + window.location.pathname;
    
    // Show the share modal
    const shareModal = document.getElementById('shareModal');
    const shareLinkDisplay = document.getElementById('shareLinkDisplay');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    
    if (shareModal && shareLinkDisplay && copyLinkBtn) {
      shareLinkDisplay.textContent = shareableLink;
      shareLinkDisplay.dataset.link = shareableLink;
      shareModal.style.display = 'flex';
      
      // Copy button click handler
      copyLinkBtn.onclick = () => {
        navigator.clipboard.writeText(shareableLink).then(() => {
          copyLinkBtn.textContent = '✅ Copied!';
          copyLinkBtn.style.backgroundColor = '#27ae60';
          setTimeout(() => {
            copyLinkBtn.textContent = '📋 Copy Link';
            copyLinkBtn.style.backgroundColor = '#3498db';
          }, 2000);
        }).catch(err => {
          // Fallback for browsers that don't support clipboard API
          const textArea = document.createElement('textarea');
          textArea.value = shareableLink;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          copyLinkBtn.textContent = '✅ Copied!';
          copyLinkBtn.style.backgroundColor = '#27ae60';
          setTimeout(() => {
            copyLinkBtn.textContent = '📋 Copy Link';
            copyLinkBtn.style.backgroundColor = '#3498db';
          }, 2000);
        });
      };
    }
  };

  // Handle profile form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    profile.name = document.getElementById('profileName').value || 'Your Name';
    profile.bio = document.getElementById('profileBio').value || '';
    saveProfile();
    updateProfileDisplay();
    document.getElementById('profileFormOverlay').style.display = 'none';
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        profile.profileImage = event.target.result;
        saveProfile();
        updateProfileDisplay();
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle link form submission
  const handleLinkSubmit = (e) => {
    e.preventDefault();
    const platform = document.getElementById('platformSelect').value;
    const url = document.getElementById('linkUrl').value;

    if (!platform || !url) {
      alert('Please select a platform and enter a URL');
      return;
    }

    const link = {
      id: Date.now(),
      platform,
      url,
      name: PLATFORMS[platform].name,
    };

    profile.links.push(link);
    saveProfile();
    renderLinks();

    // Clear form and close modal
    e.target.reset();
    document.getElementById('selectedPlatformDisplay').innerHTML = '';
    document.getElementById('platformSelect').value = '';
    document.getElementById('platformSearch').value = '';
    document.getElementById('platformSuggestions').style.display = 'none';
    toggleLinkForm();
  };

  // Render links on page
  const renderLinks = () => {
    const container = document.getElementById('linksList');
    if (!container) return;

    container.innerHTML = '';

    if (profile.links.length === 0) {
      if (isEditMode()) {
        container.innerHTML = '<p class="no-links">No links added yet. Click "Add New App" to get started!</p>';
      }
      return;
    }

    profile.links.forEach(link => {
      const platformInfo = PLATFORMS[link.platform];
      if (!platformInfo) return;

      const button = document.createElement('div');
      button.className = 'link-item';
      let buttonHTML = `
        <a class="button ${platformInfo.color}" href="${link.url}" target="_blank" rel="noopener" role="button">
          <img class="icon" aria-hidden="true" src="images/icons/${platformInfo.icon}.svg" alt="${platformInfo.name} Logo">
          ${platformInfo.name}
        </a>
      `;

      // Only show edit/delete buttons in edit mode
      if (isEditMode()) {
        buttonHTML += `
        <button class="edit-link" data-id="${link.id}">Edit</button>
        <button class="delete-link" data-id="${link.id}">Delete</button>
      `;
      }

      button.innerHTML = buttonHTML;
      container.appendChild(button);
    });

    // Add event listeners to edit/delete buttons (only in edit mode)
    if (isEditMode()) {
      document.querySelectorAll('.edit-link').forEach(btn => {
        btn.addEventListener('click', (e) => editLink(e.target.dataset.id));
      });

      document.querySelectorAll('.delete-link').forEach(btn => {
        btn.addEventListener('click', (e) => deleteLink(e.target.dataset.id));
      });
    }
  };

  // Edit link
  const editLink = (id) => {
    const link = profile.links.find(l => l.id == id);
    if (!link) return;

    document.getElementById('platformSelect').value = link.platform;
    document.getElementById('linkUrl').value = link.url;
    document.getElementById('linkForm').dataset.editId = id;
    toggleLinkForm();
  };

  // Delete link
  const deleteLink = (id) => {
    if (confirm('Are you sure you want to delete this link?')) {
      profile.links = profile.links.filter(l => l.id != id);
      saveProfile();
      renderLinks();
    }
  };

  // Update profile display
  const updateProfileDisplay = () => {
    const avatar = document.getElementById('userProfileImage');
    if (avatar && profile.profileImage) {
      avatar.src = profile.profileImage;
      avatar.style.display = 'block';
    } else if (avatar) {
      avatar.style.display = 'none'; // Hide if no image
    }

    const h1 = document.querySelector('h1 div');
    if (h1) {
      h1.textContent = profile.name;
    }

    const bio = document.querySelector('.container > p');
    if (bio && profile.bio) {
      bio.textContent = profile.bio;
    }
  };
  const handlePlatformSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const suggest = document.getElementById('platformSuggestions');
    if (!suggest) return;

    suggest.innerHTML = '';

    if (searchTerm.length === 0) {
      suggest.style.display = 'none';
      return;
    }

    const matches = Object.entries(PLATFORMS).filter(([key, data]) =>
      key.toLowerCase().includes(searchTerm) ||
      data.name.toLowerCase().includes(searchTerm)
    );

    if (matches.length === 0) {
      suggest.innerHTML = '<div class="suggestion-item">No platforms found</div>';
      suggest.style.display = 'block';
      return;
    }

    matches.forEach(([key, data]) => {
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.innerHTML = `
        <img src="images/icons/${data.icon}.svg" alt="${data.name}" class="suggestion-icon">
        <span>${data.name}</span>
      `;
      item.addEventListener('click', () => selectPlatform(key));
      suggest.appendChild(item);
    });

    suggest.style.display = 'block';
  };

  // Select a platform from search
  const selectPlatform = (platformKey) => {
    const displayEl = document.getElementById('selectedPlatformDisplay');
    const platformData = PLATFORMS[platformKey];
    if (displayEl && platformData) {
      displayEl.innerHTML = `
        <div class="selected-platform">
          <img src="images/icons/${platformData.icon}.svg" alt="${platformData.name}" class="suggestion-icon">
          <strong>${platformData.name}</strong>
          <button type="button" class="clear-selection" onclick="document.getElementById('platformSelect').value=''; document.getElementById('selectedPlatformDisplay').innerHTML=''; document.getElementById('platformSearch').value=''; document.getElementById('platformSuggestions').style.display='none';">✕</button>
        </div>
      `;
    }
    document.getElementById('platformSelect').value = platformKey;
    document.getElementById('platformSearch').value = '';
    document.getElementById('platformSuggestions').style.display = 'none'
    Object.entries(PLATFORMS).forEach(([key, data]) => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = data.name;
      select.appendChild(option);
    });
  };

  // Public API
  return {
    init,
    selectPlatform, // Expose for inline onclick
  };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  APP.init();
});
