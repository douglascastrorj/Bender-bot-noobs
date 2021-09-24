const Discord = require("discord.js");

module.exports = { 
  run: async ({client, message, args, queue}) => {

    const indexes = args.map( arg => Number(arg) - 1);
    console.log(indexes)

    const serverQueue = queue.get(message.guild.id);
    if(!serverQueue || !serverQueue.songs) return;
    

    serverQueue.songs = serverQueue.songs.filter( (song, index) => { 
      return indexes.includes(index) == false;
    });
        
  }
}