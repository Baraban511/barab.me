import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from 'resend';
export const server = {
  send: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email().nullable(),
      message: z.string(),
    }),
    handler: async (input) => {
      const resend = new Resend(import.meta.env.RESEND_KEY);
      const { data, error } = await resend.emails.send({
        from: 'contact@mail.barab.me',
        to: import.meta.env.EMAIL_TO,
        subject: 'Contact',
        html: `<p>${input.message}</p>${input.email
          ? `<p>Reply to: <a href=https://barab.me/mail/${input.email}>${input.email}</a<</p>`
          : ""}`
      });

      if (error) {
        console.error(error);
        throw new ActionError({
          code: "SERVICE_UNAVAILABLE",
          message: "Error while sending the mail",
        });
      }
      console.log(data)
      return {
        message: {
          title: "Success",
          text: "Message received, thank you",
        },
      };
    }
  }),
};
