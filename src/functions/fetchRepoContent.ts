export default async function fetchRepoContent(
  owner: string,
  repo: string,
  path: string,
  token: string,
) {
  const cacheOptions = {
    cf: {
      cacheEverything: true,
      cacheTtlByStatus: { "200-299": 86400, 404: 1, "500-599": 0 },
    },
  };
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
      "User-Agent": "barabsite",
    },
  });
  const data: any[] = await response.json();

  var files = [];
  for (const item of data) {
    if (item.type === "dir") {
      const subFiles = await fetchRepoContent(owner, repo, item.path, token);
      files = files.concat(subFiles);
    } else if (item.name.endsWith(".py")) {
      const fileResponse = await fetch(item.download_url, {
        ...cacheOptions,
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const file = await fileResponse.text();
      files.push({ name: item.path, content: file });
    }
  }

  return files;
}
