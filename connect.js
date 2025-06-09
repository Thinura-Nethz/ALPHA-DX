const { default: makeWASocket, useSingleFileAuthState } = require("@whiskeysockets/baileys");
const pino = require("pino");
const { handler } = require("./handler");

// Replit fix for logger (use pino-pretty instead of default pino logger)
const logger = pino({
  level: 'silent',
  transport: {
    target: 'pino-pretty'
  }
});

const { state, saveState } = useSingleFileAuthState('./session.json');

async function startBot() {
  const sock = makeWASocket({
    printQRInTerminal: true,
    auth: state,
    logger
  });

  sock.ev.on('creds.update', saveState);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;
    await handler(sock, msg);
  });
}

startBot();
