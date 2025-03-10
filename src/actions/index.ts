import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";
const resend = new Resend(import.meta.env.RESEND_KEY);

export const server = {
  send: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email().nullable(),
      message: z.string(),
    }),
    handler: async (input) => {
      const { error } = await resend.emails.send({
        from: "contact@mail.barab.me",
        to: import.meta.env.EMAIL_TO,
        subject: "Contact",
        html: `<p>${input.message}</p>${
          input.email
            ? `<p>Reply to: <a href=https://barab.me/mail/${input.email}>${input.email}</a<</p>`
            : ""
        }`,
      });

      if (error) {
        console.error(error);
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error.message,
        });
      }

      return {
        success: true,
        message: {
          title: "Success",
          text: "Message received, thank you",
        },
      };
    },
  }),
};
