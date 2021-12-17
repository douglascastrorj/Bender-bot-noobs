const Discord = require("discord.js");

module.exports = { 
  run: async ({client, message, args}) => {

      const voiceChannel = message.member.voice.channel;
      
      voiceChannel.join().then(connection => {
          const dispatcher = connection.play('./audio/bonxibananinha.mp3')
          dispatcher.on('end', end => voiceChannel.leave());
      }).catch(err => console.log(err))
    },
  type: 'audio'
  // }
}