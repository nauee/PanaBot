import Discord from 'discord.js'
import config from './config.js'
import { inicializarMensaje, reacciones } from './src/Modulos/Reacciones.js'
import { saludar } from './src/Modulos/Saludo.js'
import { checkCumpleaños } from './src/Modulos/FelizCumpleaños.js'
import { comandos } from './src/Comandos.js'

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const configuracion = {
  canalSonidos: 'sonidos',
  canalGeneral: 'la-filita',
  timeoutID: undefined,
  buenas: true,
  usarTTS: false,
  queue: new Map()
}

client.on('ready', () => {
  inicializarMensaje(client, configuracion.canalSonidos)
  checkCumpleaños(client, configuracion.canalGeneral)
})

client.on('message', message => {
  comandos(message, client, configuracion)
})

client.on('messageReactionAdd', async (reaction, user) => {
  reacciones(reaction, user, configuracion)
})

client.on('voiceStateUpdate', (oldState, newState) => {
  saludar(oldState, newState, configuracion)
})

client.login(config.BOT_TOKEN)
