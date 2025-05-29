import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import sendEmail from "@functions/sendEmail";
import { env } from "cloudflare:workers";
export const server = {
  send: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email().nullable(),
      message: z.string(),
    }),
    handler: async (input) => {
      try {
        sendEmail(
          { recipient: await env.EMAIL_TO.get() },
          {
            title: "Contact",
            html: `<p>${input.message}</p>${
              input.email
                ? `<p>Reply to: <a href=https://barab.me/mail/${input.email}>${input.email}</a<</p>`
                : ""
            }`,
          },
        );

        return {
          success: true,
          message: {
            title: "Success",
            text: "Message received, thank you",
          },
        };
      } catch (error) {
        return {
          success: false,
          message: {
            title: "Error",
            text: "An error occurred while sending your message, please try again later.",
          },
        };
      }
    },
  }),
};
