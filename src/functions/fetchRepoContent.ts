export default async function fetchRepoContent(
  owner: string,
  repo: string,
  path: string,
  token: string
) {
  const cache = caches.default;
  const cacheKey = new Request(`https://github.com/${owner}/${repo}/${path}`);
  let cachedResponse = await cache.match(cacheKey);

  if (cachedResponse) {
    return await cachedResponse.json();
  }

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
    } else {
      if (item.name.endsWith(".py")) {
        const fileCacheKey = new Request(
          `https://github.com/${owner}/${repo}/${item.path}`
        );
        let cachedFile = await cache.match(fileCacheKey);

        if (cachedFile) {
          console.log(`✅ Cache hit for file: ${item.path}`);
          const fileContent = await cachedFile.text();
          files.push({ name: item.path, content: fileContent });
        } else {
          console.log(`❌ Cache miss for file: ${item.path}`);
          const response = await fetch(item.download_url, {
            headers: {
              Authorization: `token ${token}`,
            },
          });
          const file = await response.text();
          files.push({ name: item.path, content: file });

          const fileResponse = new Response(file, {
            headers: { "Content-Type": "text/plain" },
          });

          await cache.put(fileCacheKey, fileResponse.clone());
        }
      }
    }
  }

  const jsonResponse = new Response(JSON.stringify(files), {
    headers: { "Content-Type": "application/json" },
  });

  await cache.put(cacheKey, jsonResponse.clone());
  return files;
}
