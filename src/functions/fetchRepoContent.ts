export default async function fetchRepoContent(
  owner: string,
  repo: string,
  path: string,
  token: string
) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
      "User-Agent": "barabsite",
    },
  });
  const data: any[] = await response.json();
  // var total = data.filter(
  //   (file) => file.type === "file" && file.name.endsWith(".py"),
  // ).length;
  console.log(data);
  var files = [];
  for (const item of data) {
    if (item.type === "dir") {
      const subFiles = await fetchRepoContent(owner, repo, item.path, token);
      files = files.concat(subFiles);
    } else {
      if (item.name.endsWith(".py")) {
        const response = await fetch(item.download_url, {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        const file = await response.text();
        files.push({ name: item.path, content: file });
      }
    }
  }
  return files;
}
