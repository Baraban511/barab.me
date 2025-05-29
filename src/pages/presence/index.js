import { env } from "cloudflare:workers";
export async function GET() {
  try {
    var presence = await fetch(
      "https://api.statusbadges.me/presence/" + (await env.DISCORD_ID.get()),
    );
    presence = await presence.json();
    var status = presence.status;
    return new Response(status, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error fetching presence status:", error);
    return new Response(false, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
