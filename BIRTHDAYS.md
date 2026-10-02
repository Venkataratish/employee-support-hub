# Personal birthday celebrations

Birthday celebrations now run entirely in the visitor's browser. There is no birthday backend, approval inbox, Cloudflare requirement, or GitHub birthday database.

Open resource on the birthday card opens a native dialog. Enter a name, month, and day, then Submit. If it is that birthday in Eastern time, the hub immediately displays the name, appreciation message, gold background, and ribbons. The standard welcome returns after midnight (checked every minute and when returning to the tab). February 29 is celebrated February 28 in non-leap years.

The entry is saved only in this browser's local storage for the current birthday day. It survives refreshes but is not visible to other visitors or devices. If storage is blocked, the current page still celebrates until closed. No personal details are sent to a server.

The birthday card keeps its Open resource action but hides its HR category label. The Jamie contact section uses dark readable text and a gold button only during birthdays.

Run `node scripts/sync-birthday-assets.mjs` after changing the canonical docs birthday files. Run `npm test` and `npm run build` to check the project. Use `node scripts/preview-birthdays.mjs` for the local static preview; enter today's date through the form to try the celebration. The live site is unchanged until deployment.
