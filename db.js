const Client = require("@replit/database");
const client = new Client();
// await Client.set("key", "value");

const AFINIDADE_KEY = `afinidade`;

//message.author.username
const getAfinidade = async (username) => {
  const afinidade = JSON.pasrse(client.get(AFINIDADE_KEY));
  const userAfinidade = afinidade[username];
  return userAfinidade;
}

const setAfinidade = async ({username, valor}) => {
  const afinidade = JSON.pasrse(client.get(AFINIDADE_KEY));
  afinidade[username] = valor;
  await Client.set(AFINIDADE_KEY, JSON.stringify(afinidade) );
}


module.exports = { 
  client: client,
  set: Client.set,
  get: async (key) => { return await Client.get(key) },
  getAfinidade: getAfinidade,
  setAfinidade: setAfinidade
}