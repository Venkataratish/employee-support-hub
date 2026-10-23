# Administrator-managed birthday celebrations

The public website is read-only. Birthday names and month/day values are stored in `docs/data/birthdays.json`, which the repository owner can edit from GitHub on any computer. The site never stores a birth year.

On a matching date in Eastern time, the hub automatically displays the employee names, appreciation message, gold background, and ribbons. The standard welcome returns the next day. February 29 is celebrated February 28 in non-leap years.

See `CONTENT_EDITING.md` for GitHub editing instructions. Run `node scripts/sync-birthday-assets.mjs` after changing the canonical docs birthday files, then run `npm test` and `npm run build`.
