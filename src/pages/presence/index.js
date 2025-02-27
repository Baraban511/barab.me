export async function GET() {
  const userId = import.meta.env.USER_ID;
  var presence = await fetch("https://api.statusbadges.me/presence/" + userId);
  presence = await presence.json();
  var status = presence.status;
  return new Response(status, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
