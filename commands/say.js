const Discord = require("discord.js");

module.exports = { 
  run: async ({client, message, args}) => {
    if(message.author.username != `douglascastrorj`) {
      message.channel.send('Ta achando que manda em mim seu otario?');
      return;
    }
    console.log('say message', message);
    const sayMessage = args.join(" ");
    message.delete().catch(O_o => {})
    message.channel.send(sayMessage);
  }
}