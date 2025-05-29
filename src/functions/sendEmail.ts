import { createMimeMessage } from "mimetext";
import { EmailMessage } from "cloudflare:email";
import { env } from "cloudflare:workers";
export default async function sendEmail(
  params: { recipient: string },
  message: { title: string; html: string },
) {
  const msg = createMimeMessage();
  msg.setSender({ name: "barab.", addr: "contact@barab.me" });
  msg.setRecipient(params.recipient);
  msg.setSubject(message.title);
  msg.addMessage({
    contentType: "text/html",
    data: message.html,
  });

  var mail = new EmailMessage(
    "contact@barab.me",
    params.recipient,
    msg.asRaw(),
  );
  try {
    await env.MAIL_CONTACT.send(mail);
  } catch (e) {
    throw new Error(e);
  }
  return;
}
