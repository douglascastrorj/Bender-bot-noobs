const Discord = require("discord.js");

const db = require('../db.js');

module.exports = { 
  run: async ({client, message, args}) => {
    if(message.author.username != `douglascastrorj`) {
      message.channel.send('Ta achando que manda em mim seu otario?');
      return;
    }

    // await db.setAfinidade({username: message.author.username, valor: 1});
    // const afinidade = await db.getAfinidade(message.author.username);
    // console.log('afinidade ',afinidade);
    
    const sayMessage = args.join(" ");
    message.delete().catch(O_o => {})
    message.channel.send(sayMessage);
  }
}