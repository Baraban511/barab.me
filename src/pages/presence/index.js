import { DISCORD_ID } from "astro:env/server";
export async function GET() {
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
}
