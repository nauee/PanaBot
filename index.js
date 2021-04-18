import Discord from 'discord.js'
import config from './config.js'
import preguntarAlBot from './src/Modulos/Preguntas.js'
import definirTTS from './src/Modulos/DefinirTTS.js'
import ruleta from './src/Modulos/Ruleta.js'
import listarComandos from './src/Modulos/ListarComandos.js'
import definirSaludo from './src/Modulos/DefinirSaludo.js'
import mostrarCumpleaños from './src/Modulos/MostrarCumpleaños.js'
import pelado from './src/Modulos/Pelado.js'
import reacciones from './src/Modulos/Reacciones.js'
import inicializarMensaje from './src/Modulos/MensajeReacciones.js'
import saludar from './src/Modulos/Saludar.js'
import checkCumpleaños from './src/Modulos/FelizCumpleaños.js'

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const canalSonidos = 'sonidos'
const canalGeneral = 'la-filita'
let timeoutID
let buenas = true
let usarTTS = false

client.on('ready', () => {
  inicializarMensaje(client, canalSonidos)
  checkCumpleaños(client, canalGeneral)
})

client.on('message', message => {
  if (message.author.username === client.user.username) {
    return
  }
  const mensaje = message.content.toLowerCase()
  if (mensaje.startsWith('&pelado') || mensaje.startsWith('panabot pelado')) {
    pelado(message)
  } else if (mensaje.startsWith('&plandeestudios') || mensaje.startsWith('panabot plandeestudios')) {
    message.channel.send('Toma chinchu, cualquier cosa le decis al otro panabot\n https://fdelmazo.github.io/FIUBA-Map/')
  } else if (mensaje.startsWith('&parcial') || mensaje.startsWith('panabot parcial')) {
    message.channel.send('**_Éxitos!._**')
  } else if (mensaje.startsWith('&cumpleaños') || mensaje.startsWith('panabot cumpleaños')) {
    mostrarCumpleaños(message)
  } else if (mensaje.startsWith('&buenas') || mensaje.startsWith('panabot buenas')) {
    buenas = definirSaludo(message, buenas)
  } else if (mensaje.startsWith('&ruleta')) {
    ruleta(message, usarTTS)
  } else if (mensaje.startsWith('&pregunta')) {
    preguntarAlBot(message, usarTTS)
  } else if (mensaje.startsWith('&tts')) {
    usarTTS = definirTTS(message, usarTTS)
  } else if (mensaje.startsWith('&comandos') || mensaje.startsWith('panabot comandos')) {
    listarComandos(message)
  }
})

client.on('messageReactionAdd', async (reaction, user) => {
  reacciones(reaction, user, timeoutID, canalSonidos)
})

client.on('voiceStateUpdate', (oldState, newState) => {
  saludar(oldState, newState, timeoutID, buenas)
})

client.login(config.BOT_TOKEN)
