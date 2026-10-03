const STORAGE_KEY = 'tapwithnivo-profile-data';

const defaultProfile = {
  profileName: 'TapWithNivo',
  instagram: 'https://instagram.com/tapwithnivo',
  youtube: 'https://youtube.com/@tapwithnivo',
  whatsapp: 'https://wa.me/tapwithnivo',
  snapchat: 'https://snapchat.com/add/tapwithnivo',
  spotify: 'https://open.spotify.com/artist/tapwithnivo',
  discord: 'https://discord.gg/tapwithnivo',
  x: 'https://x.com/tapwithnivo'
};

const profileForm = document.getElementById('profileForm');
const profileModal = document.getElementById('profileModal');
const editProfileBtn = document.getElementById('editProfileBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelBtn = document.getElementById('cancelBtn');

const brandName = document.getElementById('brandName');
const featuredTitle = document.getElementById('featuredTitle');
const featuredHandle = document.getElementById('featuredHandle');
const featuredLink = document.getElementById('featuredLink');

const socialFields = {
  youtube: {
    handle: document.getElementById('youtubeHandle'),
    link: document.getElementById('youtubeLink')
  },
  whatsapp: {
    handle: document.getElementById('whatsappHandle'),
    link: document.getElementById('whatsappLink')
  },
  snapchat: {
    handle: document.getElementById('snapchatHandle'),
    link: document.getElementById('snapchatLink')
  },
  spotify: {
    handle: document.getElementById('spotifyHandle'),
    link: document.getElementById('spotifyLink')
  },
  discord: {
    handle: document.getElementById('discordHandle'),
    link: document.getElementById('discordLink')
  },
  x: {
    handle: document.getElementById('xHandle'),
    link: document.getElementById('xLink')
  }
};

function safeUrl(value) {
  if (!value) return '#';
  const trimmed = value.trim();
  if (!trimmed) return '#';

  try {
    new URL(trimmed);
    return trimmed;
  } catch {
    if (trimmed.startsWith('http')) return '#';
    return `https://${trimmed}`;
  }
}

function formatHandle(displayValue, socialName) {
  if (!displayValue || !displayValue.trim()) {
    return socialName === 'instagram' ? '@tapwithnivo' : '@tapwithnivo';
  }

  const value = displayValue.trim();
  return value.startsWith('@') ? value : `@${value}`;
}

function getStoredProfile() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { ...defaultProfile };

  try {
    const parsed = JSON.parse(raw);
    return { ...defaultProfile, ...parsed };
  } catch {
    return { ...defaultProfile };
  }
}

function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function renderProfile() {
  const profile = getStoredProfile();
  const instagramUrl = safeUrl(profile.instagram);
  const youtubeUrl = safeUrl(profile.youtube);
  const whatsappUrl = safeUrl(profile.whatsapp);
  const snapchatUrl = safeUrl(profile.snapchat);
  const spotifyUrl = safeUrl(profile.spotify);
  const discordUrl = safeUrl(profile.discord);
  const xUrl = safeUrl(profile.x);

  const brandText = profile.profileName || 'TapWithNivo';
  brandName.textContent = brandText;
  featuredTitle.textContent = 'Instagram';
  featuredHandle.textContent = `@${brandText.replace(/\s+/g, '').toLowerCase()}`;
  featuredLink.href = instagramUrl;

  socialFields.youtube.handle.textContent = 'YouTube';
  socialFields.youtube.link.href = youtubeUrl;

  socialFields.whatsapp.handle.textContent = 'WA.ME/' + brandText.replace(/\s+/g, '').toUpperCase();
  socialFields.whatsapp.link.href = whatsappUrl;

  socialFields.snapchat.handle.textContent = '@' + brandText.replace(/\s+/g, '').toLowerCase();
  socialFields.snapchat.link.href = snapchatUrl;

  socialFields.spotify.handle.textContent = 'ARTIST/' + brandText.replace(/\s+/g, '').toUpperCase();
  socialFields.spotify.link.href = spotifyUrl;

  socialFields.discord.handle.textContent = 'GG/' + brandText.replace(/\s+/g, '').toUpperCase();
  socialFields.discord.link.href = discordUrl;

  socialFields.x.handle.textContent = '@' + brandText.replace(/\s+/g, '').toLowerCase();
  socialFields.x.link.href = xUrl;

  document.getElementById('profileNameInput').value = brandText;
  document.getElementById('instagramInput').value = profile.instagram || '';
  document.getElementById('youtubeInput').value = profile.youtube || '';
  document.getElementById('whatsappInput').value = profile.whatsapp || '';
  document.getElementById('snapchatInput').value = profile.snapchat || '';
  document.getElementById('spotifyInput').value = profile.spotify || '';
  document.getElementById('discordInput').value = profile.discord || '';
  document.getElementById('xInput').value = profile.x || '';
}

function openModal() {
  profileModal.classList.remove('hidden');
  profileModal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  profileModal.classList.add('hidden');
  profileModal.setAttribute('aria-hidden', 'true');
}

profileForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const updatedProfile = {
    profileName: document.getElementById('profileNameInput').value.trim() || 'TapWithNivo',
    instagram: document.getElementById('instagramInput').value.trim(),
    youtube: document.getElementById('youtubeInput').value.trim(),
    whatsapp: document.getElementById('whatsappInput').value.trim(),
    snapchat: document.getElementById('snapchatInput').value.trim(),
    spotify: document.getElementById('spotifyInput').value.trim(),
    discord: document.getElementById('discordInput').value.trim(),
    x: document.getElementById('xInput').value.trim()
  };

  saveProfile(updatedProfile);
  renderProfile();
  closeModal();
});

editProfileBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);
profileModal.addEventListener('click', (event) => {
  if (event.target === profileModal) closeModal();
});

renderProfile();
