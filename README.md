# my-editable-profile

A simple editable social profile page inspired by the reference design. It lets you:

- update your profile name
- add Instagram, YouTube, WhatsApp, Snapchat, Spotify, Discord, and X links
- save the profile in the browser using localStorage
- reopen the page later and the changes stay saved

## Run it locally

1. Open `index.html` in a browser, or
2. Serve the folder with a local web server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Files

- `index.html` — page layout
- `style.css` — styling to match the reference
- `script.js` — profile logic and localStorage saving

## Notes

This version stores profile data in the browser only. If you want, I can also update it to save to a server or database next.
