const Discord = require("discord.js");
const ytdl = require('ytdl-core');
var youtubesearchapi = require('youtube-search-api');

async function searchYouTubeAsync(args) {
   var video = await youtube.searchVideos(args.toString().replace(/,/g,' '));
   console.log(video.url);
   console.log(typeof String(video.url));
   return String(video.url);
}


module.exports.run = async ({client, message, args, queue}) => {

  const serverQueue = queue.get(message.guild.id);

  // const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
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

  let song = {};

  if(args[0].startsWith("https://www.youtube") || args[0].startsWith("http://www.youtube")) {
    const songInfo = await ytdl.getInfo(args[0]);
    song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
    };
  } else {
    const videos = await youtubesearchapi.GetListByKeyword(args.join(" "))
    if(videos.items && videos.items.length > 0) {
      const firstVideo = videos.items[0];
      song = {
        title: firstVideo.title,
        url: `https://www.youtube.com/watch?v=${firstVideo.id}`
      }

    } else {
      return message.channel.send(`Nenhum resultado encontrado `);
    }
    // let url = await searchYouTubeAsync(args);
    // console.log(url);
    // let stream = ytdl(url, { filter: 'audioonly' });
    // let dispatcher = connection.playStream(stream);
  }

  

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0], queue);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    if(serverQueue.songs.length > 0) play(message.guild, serverQueue.songs[0], queue);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }

}


function play(guild, song, queue) {
  if(!queue) return;
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

