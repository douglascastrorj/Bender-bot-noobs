const Discord = require("discord.js");

module.exports = { 
  run: async ({client, message, args}) => {

    // if (!client.isLocked() && message.content === 'Gotcha Bitch') {
    //   client.lock()
      const voiceChannel = message.member.voice.channel;
      voiceChannel.join().then(connection => {
          const dispatcher = connection.play('./audio/eu_sou_mal.mp3')
          dispatcher.on('end', end => voiceChannel.leave());
      }).catch(err => console.log(err))
      // client.unlock()
    },
  type: 'audio'
  // }
}