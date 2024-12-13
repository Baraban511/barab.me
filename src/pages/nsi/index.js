const owner = 'Baraban511';
const repo = 'NSI';
const path = ''; // Chemin racine
const token = import.meta.env.GITHUB_PAT; // Utilisation de la variable d'environnement
console.log(import.meta.env.GITHUB_PAT);
export async function GET({ request }) {
    fetchRepoContents(owner, repo, path, token);
    return new Response("Hello world", {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
    });
}

async function fetchRepoContents(owner, repo, path, token) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `token ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
    for (const item of data) {
        if (item.type === 'dir') {
            // Recursive fetch for directories
            await fetchRepoContents(owner, repo, item.path, token);
        } else {
            console.log(`File: ${item.path}`);
            // Vous pouvez télécharger ou traiter le fichier ici
        }
    }
}