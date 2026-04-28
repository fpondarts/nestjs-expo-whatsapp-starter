import axios from 'axios';

const client = axios.create({
  baseURL: `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}`,
  headers: { Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}` },
});

export async function sendText(to: string, body: string) {
  await client.post('/messages', {
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body },
  });
}

export async function sendList(
  to: string,
  body: string,
  sections: Array<{
    title: string;
    rows: Array<{ id: string; title: string; description?: string }>;
  }>,
) {
  await client.post('/messages', {
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
      type: 'list',
      body: { text: body },
      action: { button: 'Choose', sections },
    },
  });
}
