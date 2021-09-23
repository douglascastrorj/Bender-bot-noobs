const Client = require("@replit/database");
const client = new Client();
// await Client.set("key", "value");

const AFINIDADE_KEY = `afinidade`;

//message.author.username
const getAfinidade = async (username) => {
  const json = await client.get(AFINIDADE_KEY)
  if(!json) return 0;

  let afinidade = JSON.parse(json);
  if(!afinidade) return 0;

  const userAfinidade = afinidade[username];
  return userAfinidade ? userAfinidade : 0;
}

const setAfinidade = async ({username, valor}) => {
  let json = await client.get(AFINIDADE_KEY);
  if(!json) json = "{}";
  const afinidade = JSON.parse(json);

  console.log('afinidade do set ', afinidade)
  afinidade[username] = valor;

  console.log('afinidade depois de setada ', afinidade)
  await client.set(AFINIDADE_KEY, JSON.stringify(afinidade) );
}


module.exports = { 
  client: client,
  set: client.set,
  get: client.get,
  getAfinidade: getAfinidade,
  setAfinidade: setAfinidade
}