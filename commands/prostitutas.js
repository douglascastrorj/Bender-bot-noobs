

const Discord = require("discord.js");

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { 
  run: async (client, message, args) => {

    const files = ['bender_parque_tematico', 'bender_desembarque_lunar']

    // if (!client.isLocked() && message.content === 'Gotcha Bitch') {
    //   client.lock()
    const index = getRandomIntInclusive(0, 1);
      const voiceChannel = message.member.voice.channel;
      console.log(voiceChannel)
      voiceChannel.join().then(connection => {
          const dispatcher = connection.play(`./audio/${files[index]}.mp3`);
          dispatcher.on('end', end => voiceChannel.leave());
      }).catch(err => console.log(err))
      // client.unlock()
    }
  // }
}