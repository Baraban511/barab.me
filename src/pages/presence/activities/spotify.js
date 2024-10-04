export async function GET({ request }) {
    const userId = import.meta.env.USER_ID;
    var presence = await fetch("https://api.statusbadges.me/presence/" + userId);
    presence = await presence.json();
    var activities = presence.activities;
    for (var i = 0; i < activities.length; i++) {
        if (activities[i].name == "Spotify") {
            let currentSong = await fetch("https://api.statusbadges.me/openspotify/" + userId);
            activities[i].songURL = currentSong.url;
            return new Response(JSON.stringify(activities[i]))
        }
    }
    return new Response(false)
}
