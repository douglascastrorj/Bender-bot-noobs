const Discord = require("discord.js");

const db = require('../db.js');

module.exports = { 
  run: async ({client, message, args}) => {
    console.log(message.author)
    if(message.author.username != `douglascastrorj`) {
      message.channel.send('Ta achando que manda em mim seu otario?');
      return;
    }

    await db.setAfinidade({username: message.author.id, valor: 1});
    // await db.setAfinidade({username:'ronnimartins', valor: 0.5});
    // await db.setAfinidade({username: 'bananinha', valor: 0.5});
    // await db.setAfinidade({username:'ronnimargins', valor: 0.5});
    // await db.setAfinidade({username: 'bananinha', valor: 0.5});
    // await db.setAfinidade({username:'ronnimargins', valor: 0.5});
    // await db.setAfinidade({username: 'bananinha', valor: 0.5});
    

    const afinidade = await db.getAfinidade(message.author.username);
    console.log('afinidade ',afinidade);
    
    const sayMessage = args.join(" ");
    message.delete().catch(O_o => {})
    message.channel.send(sayMessage);
  }
}