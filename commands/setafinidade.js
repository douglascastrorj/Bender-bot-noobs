const Discord = require("discord.js");

const db = require('../db.js');
const _afinidade = require('../afubudade.js');

module.exports = { 
  run: async ({client, message, args}) => {

    if(message.author.username != `douglascastrorj`) {
      message.channel.send('Ta achando que manda em mim seu otario?');
      return;
    }

    const discriminators = _afinidade.discriminators;

    // for( discriminator in discriminators) {
      console.log(message.author)
      await db.setAfinidade({username: message.author.id, valor: 1});    
      const afinidade = await db.getAfinidade(message.author.username);
      console.log('afinidade ',afinidade);
    // }
    
    message.delete().catch(O_o => {})
    
  }
}