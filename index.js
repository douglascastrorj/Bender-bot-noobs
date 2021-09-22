const express = require('express');
const config = require("./config.json");
const Discord = require("discord.js");
const speech = require('./speech.js');
// const { DiscordSR } = require('discord-speech-recognition');


// console.log(annyang.addComands);

const db = require('./db.js');

const app = express();

app.get("/", (request, response) => {
  const ping = new Date();
  console.log(`Ping recebido às ${ping}`);
  
  response.sendStatus(200);
});

app.listen(process.env.PORT);


const client = new Discord.Client();
// const discordSR = new DiscordSR(client);

// client.on('speech', msg => {
//   // msg.author.send(msg.content);
//   console.log("speech", msg.content);

//   // if(msg.content.starts)
// })

// speech.registerSpeechRecognition(client);

const queue = new Map();
client.on("message", async message => {

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
    // const afinidade = await db.getAfinidade(message.author.username);
    // manageAfinidade(message);

    // if(afinidade < 0.5) {
    //   const rand = getRandomIntInclusive(0, 100);

    //   if(rand < 30) {

    //     return message.channel.send(
    //       "Não to afim agora não meu consagrado, pode ser mais tarde ?"
    //     );
    //   }
    // }

    const commandFile = require(`./commands/${command}.js`);
    
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



client.login(process.env['TOKEN']);


function isQueueEmpty(guild) {
  const serverQueue = queue.get(guild.id);
  if(!serverQueue) return true;
  if(serverQueue.songs.length == 0 ) return true;

  return false;
}

const manageAfinidade = async (message) => {
    const alpha = 0.005;
    const afinidade = await db.getAfinidade(message.author.username);
    await db.setAfinidade({username: message.author.username, valor: Math.max(afinidade + alpha, 1)});
    // console.log('afinidade ',afinidade);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}