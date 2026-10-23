# Edit hub content from GitHub

The public Employee Support Hub is read-only. Only people who can sign in to the GitHub repository and commit changes can publish birthdays or employee updates.

## Edit from any computer

1. Sign in to GitHub and open `Venkataratish/employee-support-hub`.
2. Open the `docs/data` folder.
3. Choose the appropriate JSON file and click the pencil **Edit** button.
4. Make the change without removing commas, quotation marks, brackets, or braces.
5. Click **Commit changes**. GitHub Pages will publish the committed version automatically, usually within a few minutes.

## Birthday file

Edit `docs/data/birthdays.json`. Birthdays repeat every year, and the year of birth is not stored.

```json
{
  "version": 1,
  "birthdays": [
    { "id": "reddy-ratish", "name": "Reddy Ratish", "month": 10, "day": 2 }
  ]
}
```

Each `id` must be unique and contain only letters, numbers, hyphens, or underscores. To remove a birthday, delete that person’s complete `{ ... }` row. The greeting appears automatically on the matching month and day in Eastern time.

## Notification files

- `docs/data/announcements.json`
- `docs/data/job-postings.json`
- `docs/data/internal-updates.json`
- `docs/data/office-updates.json`

Add each notice inside the file’s `items` list:

```json
{
  "id": "unique-notice-id",
  "icon": "📌",
  "title": "Notice title",
  "message": "The message employees will see.",
  "posted": "2026-10-23",
  "publishAt": "2026-10-23",
  "expiresAt": "2026-11-30",
  "link": "https://example.com",
  "linkLabel": "Open details"
}
```

Use `"status": "draft"` to keep an item hidden. `publishAt` schedules its first visible day, and `expiresAt` removes it after the specified day. Dates use `YYYY-MM-DD`. The `link` and `linkLabel` fields may be omitted when no button is needed.

Run `npm test` before publishing when editing locally.
