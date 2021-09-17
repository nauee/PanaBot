import { mostrarPlan } from './Modulos/MostrarPlan.js'
import { mostrarParcial } from './Modulos/MostrarParcial.js'
import { definirTTS } from './Modulos/DefinirTTS.js'
import { listarComandos } from './Modulos/ListarComandos.js'
import { definirSaludo } from './Modulos/Saludo.js'
import { pelado } from './Modulos/Pelado.js'
import { preguntarAlBot } from './Modulos/Preguntas.js'
import { ruleta } from './Modulos/Ruleta.js'
import { play, skip, disconnect, queue, remove } from './Modulos/Musica.js'
import { mostrarCumpleaños } from './Modulos/FelizCumpleaños.js'
import { adminStatus, adminReset } from './Modulos/Admin.js'

const listaComandos = new Map()
listaComandos.set('&&status', adminStatus)
listaComandos.set('&&reset', adminReset)
listaComandos.set('&buenas', definirSaludo)
listaComandos.set('&plandeestudios', mostrarPlan)
listaComandos.set('&parcial', mostrarParcial)
listaComandos.set('&cumpleaños', mostrarCumpleaños)
listaComandos.set('&ruleta', ruleta)
listaComandos.set('&pregunta', preguntarAlBot)
listaComandos.set('&pelado', pelado)
listaComandos.set('&tts', definirTTS)
listaComandos.set('&comandos', listarComandos)
listaComandos.set('&play', play)
listaComandos.set('&p', play)
listaComandos.set('&skip', skip)
listaComandos.set('&s', skip)
listaComandos.set('&disconnect', disconnect)
listaComandos.set('&ds', disconnect)
listaComandos.set('&queue', queue)
listaComandos.set('&q', queue)
listaComandos.set('&remove', remove)
listaComandos.set('&rm', remove)

export const comandos = (message, client, configuracion) => {
  if (message.author.bot) return
  console.log(message.content.toLowerCase())
  const comando = listaComandos.get((message.content.toLowerCase().split(' '))[0])
  if (typeof comando !== 'undefined') comando({ message, client, configuracion })
}
