import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
import { Resend } from "resend";
import { RESEND_KEY, EMAIL_TO, TURNSTILE_SERVER } from "astro:env/server";
export const server = {
  send: defineAction({
    accept: "form",
    input: z.object({
      email: z.email().nullable(),
      message: z.string(),
      "cf-turnstile-response": z.string(),
    }),
    handler: async (input, context) => {
      const token = input["cf-turnstile-response"];
      const ip =
        context.request.headers.get("CF-Connecting-IP") ||
        context.request.headers.get("X-Forwarded-For") ||
        "unknown";
      const resend = new Resend(RESEND_KEY);
      const turnstile: any = await validateTurnstile(token, ip)
      if (turnstile.success) {
        const { error } = await resend.emails.send({
          from: "contact@mail.barab.me",
          to: EMAIL_TO,
          subject: "Contact",
          html: `<p>${input.message}</p>${input.email
            ? `<p>Reply to: <a href=https://barab.me/mail/${input.email}>${input.email}</a<</p>`
            : ""
            }`,
        });
        if (error) {
          console.error(error);
          throw new ActionError({
            code: "SERVICE_UNAVAILABLE",
            message: "Error while sending the mail",
          });
        }
        return {
          message: {
            title: "Success",
            text: "Message received, thank you",
          },
        };
      }
      else {
        console.error(turnstile.messages);
        throw new ActionError({
          code: "SERVICE_UNAVAILABLE",
          message: "Challenge not met",
        });
      }

    },
  }),
};

async function validateTurnstile(token: string, remoteip: string | null) {
  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: TURNSTILE_SERVER,
          response: token,
          remoteip: remoteip,
        }),
      },
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Turnstile validation error:", error);
    return { success: false, "error-codes": ["internal-error"] };
  }
}