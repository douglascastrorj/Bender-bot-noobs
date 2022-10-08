const express = require('express');
const config = require("./config.json");
const Discord = require("discord.js");
const speech = require('./speech.js');
const afinidade = require('./afinidade.js');
const { DiscordSR } = require('discord-speech-recognition');

///home/runner/Bender-bot-noobs/views
// console.log(annyang.addComands);

const db = require('./db.js');

const app = express();
app.set('view engine', 'pug');

app.get("/", (request, response) => {
  const ping = new Date();
  console.log(`Ping recebido às ${ping}`);

  response.sendStatus(200);
});

app.get("/about", (request, response) => {
  response.sendFile('views/about.html', { root: __dirname })
})


app.listen(process.env.PORT);


const queue = new Map();

const client = new Discord.Client();
// const discordSR = speech.registerSpeechRecognition({client, queue});
client.on("message", async message => {

  // console.log(message.content.startsWith(`<@!${client.user.id}>`));
  // console.log(message.content.startsWith(`<@${client.user.id}>`));

  if (message.author.bot) return;
  if (message.channel.type == "dm") return;
  if (!message.content.toLowerCase().startsWith(config.prefix)) return;
  if (message.content.startsWith(`<@!${client.user.id}>`)) return;
  if (message.content.startsWith(`<@${client.user.id}>`)) return;

  console.log(message);
  console.log(config['comandos-do-bot'])

  if (message.channel.name != config['canal-comandos']) {
    message.channel.send(`Só respondo no canal ${config['canal-comandos']}.\nCaso ele não exista crie um canal com este nome.`);
    return;
  }

  const args = message.content.trim().slice(config.prefix.length).split(/ +/g);
  const command = args.shift().toLowerCase();

  try {

    // const canRunCommand = await afinidade.manageAfinidade({message, command});
    const canRunCommand = true;

    if (canRunCommand) {
      const commandFile = require(`./commands/${command}.js`);

      if (isQueueEmpty(message.guild) == false && commandFile.type == 'audio') {
        return message.channel.send(
          "To ocupado agora seu mane!"
        );
      }
      commandFile.run({ client, message, args, queue });
    }
  } catch (err) {
    console.error("Erro " + err);
  }

})



client.login(process.env['TOKEN']);


function isQueueEmpty(guild) {
  const serverQueue = queue.get(guild.id);
  if (!serverQueue) return true;
  if (serverQueue.songs.length == 0) return true;

  return false;
}
