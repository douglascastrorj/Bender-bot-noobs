const Discord = require("discord.js");

const db = require('../db.js');

module.exports = { 
  run: async ({client, message, args}) => {
    console.log(message.author)
    await db.setAfinidade({username: message.author.id, valor: 1});    
    const afinidade = await db.getAfinidade(message.author.username);
    console.log('afinidade ',afinidade);
    

    message.delete().catch(O_o => {})
    
  }
}