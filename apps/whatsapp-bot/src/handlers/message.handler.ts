import { WhatsAppMessage } from '../types/whatsapp';
import { sendText } from '../whatsapp-client';

// Stateless keyword router — store conversation state in Redis for production
export async function handleMessage(message: WhatsAppMessage) {
  const from = message.from;
  const text = message.text?.body?.trim().toLowerCase() ?? '';

  if (text === 'hi' || text === 'hello' || text === 'start') {
    await sendText(from, 'Welcome! How can I help you today?');
    return;
  }

  await sendText(from, "I didn't understand that. Reply with *hi* to get started.");
}

export async function handleInteractive(message: WhatsAppMessage) {
  const from = message.from;
  const reply = message.interactive?.button_reply ?? message.interactive?.list_reply;
  if (!reply) return;

  await sendText(from, `You selected: ${reply.title}`);
  // TODO: handle selection
}
