const Discord = require("discord.js");

module.exports = { 
  run: async (client, message, args) => {

    message.delete().catch(O_o => {})
    message.channel.send("Ta aqui sua medalha ó ", {files: ["https://www.lojaodosesportes.com.br/product_images/1500x1500/n/177/mini-ouro-1__65572.jpg"]});
    
  }
}