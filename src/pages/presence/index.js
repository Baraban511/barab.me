import { DISCORD_ID } from "astro:env/server";
export async function GET() {
  try {
    var presence = await fetch(
      "https://api.statusbadges.me/presence/" + DISCORD_ID,
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
    return new Response("offline", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
