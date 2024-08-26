import { Client, EmbedBuilder, Events, GatewayIntentBits, } from "discord.js";
const token = import.meta.env.DISCORD_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, () => {
    console.log(`Sending message...`);
});

export async function POST({ request }) {
    try {
        const data = await request.formData();
        const email = data.get("email");
        const message = data.get("message");
        if (!message) {
            const headers = new Headers();
            headers.set("location", "/contact");
            return new Response(null, {
                status: 303, // See Other
                headers,
            });
        }
        const contactEmbed = new EmbedBuilder()
            .setColor("#008080")
            .setTitle("Contact request on barab.me")
            .setAuthor({
                name: "barab",
                iconURL: "https://barab.me/barab_logo_fox.png",
                url: "https://barab.me",
            })
            .addFields(
                { name: "Message", value: `${message} \n` },
                { name: "\u200B", value: "\u200B" },)
            .setTimestamp()
            .setFooter({
                text: request.url,
            });
        if (email) {
            contactEmbed.addFields(
                {
                    name: "Mail",
                    value:
                        `${email} \n \n [**Répondre**](https://barab.me/mail/${email}) \n`,
                },
            );
        }
        client.login(token);
		const user = await client.users.fetch(import.meta.env.USER_ID);
        user.send({ embeds: [contactEmbed] });

        const headers = new Headers();
        headers.set("location", "/thanks-for-contact");
        return new Response(null, {
            status: 303, // See Other
            headers,
        });
    }
    catch (error) {
        console.error(error);
    }
}