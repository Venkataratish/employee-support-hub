const contentSources = [
  ["Announcements", "data/announcements.json"],
  ["Job postings", "data/job-postings.json"],
  ["Internal updates", "data/internal-updates.json"],
  ["Office updates", "data/office-updates.json"],
];

window.HUB_CONTENT_READY = Promise.all(contentSources.map(async ([category, path]) => {
  const response = await fetch(path, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Could not load ${path}`);
  const data = await response.json();
  return (Array.isArray(data.items) ? data.items : []).map((item) => ({ ...item, category }));
})).then((groups) => groups.flat()).catch((error) => {
  console.error("Employee updates could not be loaded.", error);
  return [];
});
