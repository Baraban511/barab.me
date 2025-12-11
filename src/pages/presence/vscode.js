export async function GET() {
  try {
    var presence = await fetch(
      "https://api.statusbadges.me/presence/" + import.meta.env.DISCORD_ID,
    );
    presence = await presence.json();
    var activities = presence.activities;
    for (var i = 0; i < activities.length; i++) {
      if (activities[i].name == "Visual Studio Code") {
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
  } catch (error) {
    console.error("Error fetching VS Code presence:", error);
    return new Response(false, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
