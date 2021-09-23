const db = require('./db.js')

const MAX_AFINIDADE = 1;

const NAO_TO_AFIM_FRASES = [
 "Não to afim agora não meu consagrado, pode ser mais tarde ?",
 "To ocupado agora cara vai arrumar alguma coisa pra fazer, pode ser?",
 "Mermão agora não dá !",
 "Deixa de ser chato cara !",
 "PORRA CARA, AGORA NÃO !",
 "Ta de sacanagem? me acordou pra isso?",
 "Tava desenrolando com uma bot gostosa aqui mas sempre tem um mané empata foda pra perturbar...",
 "Que isso cara não cansa não?"
]

const  manageAfinidade = async ({message, command}) => {
  const afinidade = await db.getAfinidade(message.author.username);
  addAfinidade({message, command});

  const rand = getRandomIntInclusive(0, 100);
  console.log(rand);
  if(afinidade <= 0.3) {
    if(rand > 30) {
      const index = getRandomIntInclusive(0, NAO_TO_AFIM_FRASES.length - 1);
      message.channel.send(
       NAO_TO_AFIM_FRASES[index]
      );

      return false;
    }
  }
  
  return true;
}

const addAfinidade = async ({message, command}) => {
  // await db.setAfinidade({username: message.author.username, valor: 1});
  // const afinidade = await db.getAfinidade(message.author.username);
  // console.log('afinidade ',afinidade);

  const alpha = 0.001;
  const afinidade = await db.getAfinidade(message.author.username);
  let newValue = afinidade + alpha;
  if(newValue > MAX_AFINIDADE) newValue = MAX_AFINIDADE;
  await db.setAfinidade({username: message.author.username, valor: newValue});
  // console.log('afinidade ',afinidade);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


module.exports = {
  manageAfinidade
}