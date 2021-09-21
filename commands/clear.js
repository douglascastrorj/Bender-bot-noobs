const Discord = require("discord.js");

module.exports = { 
  run: async ({client, message, args, queue}) => {
    message.channel.send('Limpando playlist...');
    const serverQueue = queue.get(message.guild.id);
    if(!serverQueue) return;
    serverQueue.songs = [];
    if(serverQueue.connection.dispatcher) serverQueue.connection.dispatcher.end();
  }
}