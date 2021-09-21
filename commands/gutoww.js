const Discord = require("discord.js");

module.exports = { 
  run: async ({client, message, args}) => {

    message.delete().catch(O_o => {})
    message.channel.send("au au ", {files: ["./images/gutoww.png"]});
    const voiceChannel = message.member.voice.channel;
      console.log(voiceChannel)
      voiceChannel.join().then(connection => {
          const dispatcher = connection.play('./audio/warwick.mp3')
          dispatcher.on('end', end => voiceChannel.leave());
      }).catch(err => console.log(err))
  },
  type: 'audio'
}