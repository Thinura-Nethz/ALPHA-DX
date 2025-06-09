const { default: makeWASocket, useSingleFileAuthState } = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const pino = require("pino");
const { handler } = require("./handler");

const { state, saveState } = useSingleFileAuthState('./session.json');

async function startBot() {
  const sock = makeWASocket({
    printQRInTerminal: true,
    auth: state,
    logger: pino({ level: 'silent' })
  });

  sock.ev.on('creds.update', saveState);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;
    await handler(sock, msg);
  });
}
