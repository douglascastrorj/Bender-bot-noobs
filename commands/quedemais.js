

const Discord = require("discord.js");

module.exports = { 
  run: async ({client, message, args}) => {

    const fileName = './audio/eu_tambem.mp3';

    // if (!client.isLocked() && message.content === 'Gotcha Bitch') {
    //   client.lock()
      const voiceChannel = message.member.voice.channel;
      voiceChannel.join().then(connection => {
          const dispatcher = connection.play('./audio/quedemais.mp3')
          dispatcher.on('end', end => voiceChannel.leave());
      }).catch(err => console.log(err))
      // client.unlock()
    },
  type: 'audio'
  // }
}