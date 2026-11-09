# Academic Desk

Academic Desk is an offline-first academic opportunity and deadline manager. It stores all core records in the browser's IndexedDB and caches the application shell with a service worker.

## Run locally

Serve this folder over `http://localhost` rather than opening `index.html` directly, because service workers require a secure context or localhost.

```powershell
python -m http.server 4173
```

Open `http://localhost:4173`. Use your browser's install option to add it as a desktop-style PWA. After the first successful load, the cached application and locally stored records remain available offline.

After updating source files while the PWA is already open, refresh the page once with `Ctrl+Shift+R`. The service worker now uses a network-first update policy, so later reloads receive updated files when you are online and retain the last cached version when you are offline.

## Implemented offline features

- Event CRUD, duplication, multiple important dates, priorities, tags, notes, and demo records.
- Deadline tracker with urgency colours and date filters.
- Month calendar, click-to-add dates, ICS export, and ICS import with duplicate detection.
- Submission workflow tracker.
- Global and list search, type-specific navigation, browser reminders permission, printable weekly report.
- JSON backup/restore and demo-data removal.

## Online and offline data

Academic Desk stores events, deadlines, and submissions in IndexedDB on each device, so core functionality continues without a network connection. When a network is available, you can optionally configure Google Drive in **Settings** and use **Data backup & sync** to upload the current database or restore it on another device.

Google Drive holds a private JSON backup in its application-data folder. It is used only when you explicitly press upload or restore. While offline, the same dashboard, calendar, searches, reports, JSON backup/restore, and ICS import/export remain available locally.

## Verification

Run:

```powershell
node --check app.js
node --check db.js
node --check service-worker.js
```

Manual checks: create, edit, duplicate, delete, and search an event; add multiple deadlines; download a JSON backup and restore it; export ICS; reload while offline after the application has been cached.

## Known integration boundary

The project deliberately does not include real login credentials, email delivery, or a database endpoint. Those require your chosen identity provider, hosting location, mail provider, and PostgreSQL credentials. No credential is exposed in the client.
