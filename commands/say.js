const Discord = require("discord.js");

module.exports = { 
  run: async (client, message, args) => {
    console.log('say message', message);
    const sayMessage = args.join(" ");
    message.delete().catch(O_o => {})
    message.channel.send(sayMessage);
  }
}