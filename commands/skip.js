const Discord = require("discord.js");
const ytdl = require('ytdl-core');

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Você deve estar em um canal de voz para usar este comando"
    );
  if (!serverQueue)
    return message.channel.send("Não existem musicas na playlist!");
  if(serverQueue.connection.dispatcher) serverQueue.connection.dispatcher.end();
}


module.exports.run = async ({client, message, args, queue}) => {
  const serverQueue = queue.get(message.guild.id);
  skip(message, serverQueue);
}