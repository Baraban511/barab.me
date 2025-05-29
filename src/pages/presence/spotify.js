import { env } from "cloudflare:workers";
export async function GET() {
  try {
    var presence = await fetch(
      "https://api.statusbadges.me/presence/" + (await env.DISCORD_ID.get()),
    );
    presence = await presence.json();
    var activities = presence.activities;
    for (var i = 0; i < activities.length; i++) {
      if (activities[i].name == "Spotify") {
        let currentSong = await fetch(
          "https://api.statusbadges.me/openspotify/" +
            (await env.DISCORD_ID.get()),
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
  } catch (error) {
    console.error("Error fetching Spotify presence:", error);
  }
  return new Response(false, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
