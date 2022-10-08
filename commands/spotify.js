const Discord = require("discord.js");



module.exports.run = async ({client, message, args, queue}) => {

  // const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  voiceChannel.isVoice = true;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }


  const { Player } = require("discord-music-player");
  let player = null;
  if(client.spotifyPlayer) {
    player = client.spotifyPlayer;
  } else {
    player = new Player(client, {
        leaveOnEmpty: false, // This options are optional.
    });
    client.player = player;
  }

  await player.createQueue(message.guild.id, {
    data: {
        queueInitMessage: message,
        myObject: 'this will stay with the queue :)',
        more: 'add more... there are no limitations...'
    }
  });

  let squeue = player.getQueue(message.guild.id);
  await squeue.join(message.member.voice.channel);
  // Play the song
  let song = await squeue.play('Born in the USA!');

  console.log(song);


}

