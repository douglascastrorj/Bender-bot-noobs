const Discord = require("discord.js");

module.exports = { 
  run: async ({client, message, args}) => {

    message.delete().catch(O_o => {})
    message.channel.send("Uga buga", {files: ["./images/zejacare.png"]});
    const voiceChannel = message.member.voice.channel;
      voiceChannel.join().then(connection => {
          const dispatcher = connection.play('./audio/5elosvaicair.mp3')
          dispatcher.on('end', end => voiceChannel.leave());
      }).catch(err => console.log(err))
  },
  type: 'audio'
}