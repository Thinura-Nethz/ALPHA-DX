const axios = require("axios");
const figlet = require("figlet");

async function handler(sock, msg) {
  const sender = msg.key.remoteJid;
  const body = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

  // Simple Ping Command
  if (body.startsWith("/ping")) {
    await sock.sendMessage(sender, { text: "🏓 Pong! ALPHA DX is online." });
  }

  // ASCII Logo Generator
  if (body.startsWith("/logo ")) {
    const text = body.split("/logo ")[1];
    const logo = figlet.textSync(text, { font: 'Standard' });
    await sock.sendMessage(sender, { text: '```\n' + logo + '\n```' });
  }

  // 🔜 Add more commands in next files
}

module.exports = { handler };
