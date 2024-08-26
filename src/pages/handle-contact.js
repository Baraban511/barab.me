export async function POST({ request }) {
    try {
        const data = await request.formData();
        const email = data.get("email");
        const message = data.get("message");
        console.log(email, message);

        if (!email || !message) {
            return new Response(
                JSON.stringify({
                    message: "Missing required fields",
                }),
                { status: 400 }
            );
        }

        await fetch('https://api.useplunk.com/v1/send', {

            method: 'POST',

            body: JSON.stringify({
                to: import.meta.env.EMAIL_TO,
                subject: "Contact on barab.me",
                body: "Hey this is contact",
                reply: "<string>",
            }),

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.PLUNK_KEY}`,
            },
        });
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