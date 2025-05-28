import { DISCORD_ID } from "astro:env/server";
export async function GET() {
  var presence = await fetch(
    "https://api.statusbadges.me/presence/" + DISCORD_ID,
  );
  presence = await presence.json();
  var activities = presence.activities;
  for (var i = 0; i < activities.length; i++) {
    if (activities[i].name == "Spotify") {
      let currentSong = await fetch(
        "https://api.statusbadges.me/openspotify/" + DISCORD_ID,
      );
      activities[i].songURL = currentSong.url;
      return new Response(JSON.stringify(activities[i]), {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }
  return new Response(false, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
