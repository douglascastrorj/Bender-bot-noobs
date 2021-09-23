const config = require("./config.json");
const afinidade = require('./afinidade.js');
const { DiscordSR } = require('discord-speech-recognition');

const registerSpeechRecognition = ({client, queue}) => {
  const discordSR = new DiscordSR(client);
  discordSR.speechOptions.lang = 'pt-BR'

  client.on('voiceStateUpdate', async (oldPresence, newPresence) => {
    client.on('speech', msg => {
      if(!msg || !msg.content) return;

      msg.content = msg.content.toLowerCase();
      console.log(msg.content);

      // console.log(msg.author.username);
      // msg.author.send(msg.content);
      // console.log("speech", msg.content);
      // console.log('\n');

      try {
        
        if(msg.content.startsWith(config.voice.prefix) == false) return;

        const [_, ...ask] = msg.content.split(config.voice.prefix)[1].split(' ');
        // console.log("ask ",ask)
        // const [command, ...args] = ask;
        // console.log('command ', command)
        // console.log('args ', args)
        const commands = config.voice.commands;
        const solicitacao = ask.join(' ');

        let command = '';
        let args = [];
        for( c in commands) {
          if(solicitacao.startsWith(c)) {
            command = c;
            try {
              args = solicitacao.split(c)[1].split(' ');
            } catch (e) {}
            break;
          }
        }

        console.log('command ', command)
        console.log('args ', args)

        if(!commands[command]) return;
        const commandFile = require(`./commands/${commands[command]}.js`);

        const message = {
         ...msg,
         guild: msg.guild ,
         member: {
           voice: {
             channel: msg.channel
           }
         }
        }
        commandFile.run({client, message, args, queue});

      } catch (err) {
        console.error(err);
      }

      // if(msg.content.starts)
    })
  })


  return discordSR;
}


module.exports = { 
  registerSpeechRecognition: ({client, queue}) => registerSpeechRecognition({client, queue})
}