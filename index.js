const express = require('express');
const config = require("./config.json");
const Discord = require("discord.js");

const app = express();

app.get("/", (request, response) => {
  const ping = new Date();
  console.log(`Ping recebido às ${ping}`);
  
  response.sendStatus(200);
});

app.listen(process.env.PORT);


const client = new Discord.Client();

const queue = new Map();
client.on("message", message => {

  // console.log(message.content.startsWith(`<@!${client.user.id}>`));
  // console.log(message.content.startsWith(`<@${client.user.id}>`));

  if(message.author.bot) return;
  if(message.channel.type == "dm") return;
  if(!message.content.toLowerCase().startsWith(config.prefix)) return;
  if(message.content.startsWith(`<@!${client.user.id}>`)) return;
  if(message.content.startsWith(`<@${client.user.id}>`)) return;

  const args = message.content.trim().slice(config.prefix.length).split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./commands/${command}.js`);
    console.log(commandFile);
    if(isQueueEmpty(message.guild) == false && commandFile.type == 'audio') {
      return message.channel.send(
        "To ocupado agora seu mane!"
      );
    }
    commandFile.run({client, message, args, queue});
  } catch(err) {
    console.error("Erro "+ err);
  }

})

function isQueueEmpty(guild) {
  const serverQueue = queue.get(guild.id);
  if(!serverQueue) return true;
  if(serverQueue.songs.length == 0 ) return true;

  return false;
}


client.login(process.env['TOKEN']);