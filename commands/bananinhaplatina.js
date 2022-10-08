const Discord = require("discord.js");

module.exports = {
  run: async ({ client, message, args }) => {

    message.delete().catch(O_o => { })
    message.channel.send("Banninha no platina é como um elefante em cima de uma arvore. A gente não sabe como ele subiu mas uma hora ele cai.", { files: ["./images/bananinhaplatina.png"] });
    const voiceChannel = message.member.voice.channel;
    voiceChannel.join().then(connection => {
      const dispatcher = connection.play('./audio/bananinhaplatina.mp3')
      dispatcher.on('end', end => voiceChannel.leave());
    }).catch(err => console.log(err))
  },
  type: 'audio'
}