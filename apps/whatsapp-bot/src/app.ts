import express from 'express';
import { WhatsAppWebhookBody } from './types/whatsapp';
import { handleInteractive, handleMessage } from './handlers/message.handler';

export const app = express();
app.use(express.json());

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', async (req, res) => {
  const body = req.body as WhatsAppWebhookBody;
  if (body.object !== 'whatsapp_business_account') return res.sendStatus(404);

  res.sendStatus(200); // acknowledge immediately per Meta requirement

  for (const entry of body.entry) {
    for (const change of entry.changes) {
      for (const message of change.value.messages ?? []) {
        if (message.type === 'text') await handleMessage(message);
        if (message.type === 'interactive') await handleInteractive(message);
      }
    }
  }
});

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
