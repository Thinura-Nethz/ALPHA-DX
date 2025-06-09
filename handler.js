const figlet = require("figlet");

async function handler(sock, msg) {
  const sender = msg.key.remoteJid;
  const body = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

  if (body.startsWith("/ping")) {
    await sock.sendMessage(sender, { text: "🏓 Pong! ALPHA DX is online." });
  }

  if (body.startsWith("/logo ")) {
    const text = body.split("/logo ")[1];
    const logo = figlet.textSync(text, { font: 'Standard' });
    await sock.sendMessage(sender, { text: '```\n' + logo + '\n```' });
  }
}

module.exports = { handler };
