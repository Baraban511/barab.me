import { Resend } from 'resend';
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
        const resend = new Resend(import.meta.env.RESEND_KEY);
        await resend.emails.send({
            from: 'barab.me',
            to: import.meta.env.EMAIL_TO,
            subject: 'Contact request on barab.me',
            html: `<p>${message}</p><p>From: ${email ? email : ""}</p>`,
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