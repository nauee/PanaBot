import ytdl from 'ytdl-core'
import empanadaDePolenta from '../Datos/empanadaDePolenta.js'
import { reproducir } from '../Modulos/Musica.js'

const PlayYoutube = (mensaje, user, configuracion) => {
  clearTimeout(configuracion.timeoutID)
  const canal = mensaje.channel.members.get(user.id).voice.channel
  const video = empanadaDePolenta.videos[Math.floor(Math.random() * (empanadaDePolenta.videos.length))]
  if (!canal) {
    mensaje.channel.send('_Metete a un canal zapato_"')
      .then(message => {
        setTimeout(() => {
          message.delete()
        }, 15 * 1000)
      })
  } else if (!mensaje.guild.voiceConnection) {
    canal.join().then(connection => {
      mensaje.channel.send(video.titulo)
        .then(message => {
          setTimeout(() => {
            message.delete()
          }, 15 * 1000)
        })
      const url = ytdl(video.url, { filter: 'audioonly' })
      const queue = configuracion.queue
      const serverQueue = queue.get(mensaje.guild.id)
      const dispatcher = serverQueue ? serverQueue.connection : mensaje.guild.voice.connection
      dispatcher
        .play(url, { volume: 0.5 })
        .on('finish', () => {
          if (serverQueue) {
            reproducir(mensaje.guild, serverQueue.songs[0], configuracion)
          } else {
            configuracion.timeoutID = setTimeout(() => {
              canal.leave()
            }, 15 * 60 * 1000)
          }
        })
    }).catch(error => console.log(error))
  }
  reproducir(mensaje.guild, configuracion.queue.get(mensaje.guild.id).songs[0], configuracion)
}

const PlayAudio = (mensaje, user, configuracion, ruta) => {
  clearTimeout(configuracion.timeoutID)
  const canal = mensaje.channel.members.get(user.id).voice.channel
  if (!canal) {
    mensaje.channel.send('_Metete a un canal zapato_')
      .then(message => {
        setTimeout(() => {
          message.delete()
        }, 15 * 1000)
      })
  } else if (!mensaje.guild.voiceConnection) {
    canal.join().then((connection) => {
      const queue = configuracion.queue
      const serverQueue = queue.get(mensaje.guild.id)
      const dispatcher = serverQueue ? serverQueue.connection : mensaje.guild.voice.connection
      dispatcher
        .play(ruta, { volume: 0.5 })
        .on('finish', () => {
          if (serverQueue) {
            reproducir(mensaje.guild, serverQueue.songs[0], configuracion)
          } else {
            configuracion.timeoutID = setTimeout(() => {
              canal.leave()
            }, 15 * 60 * 1000)
          }
        })
    }).catch(error => console.log(error))
  }
}

const DisconnectBot = (mensaje, user, configuracion) => {
  clearTimeout(configuracion.timeoutID)
  const canal = mensaje.member.voice.channel
  const queue = configuracion.queue
  const serverQueue = queue.get(mensaje.guild.id)
  if (serverQueue) {
    serverQueue.songs = []
    serverQueue.connection.dispatcher.end()
  } else if (canal) {
    canal.leave()
  }
}

const botonesEmpanada = new Map()
botonesEmpanada.set('🤬', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/NoGritesQueNoVendesNada.mp3',
  description: 'No grites que no vendes nada'
})
botonesEmpanada.set('😀', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/JaJaJa.mp3',
  description: 'Ja Ja Ja'
})
botonesEmpanada.set('🥣', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/EnanoCajetudo.mp3',
  description: 'Enano cajetudo'
})
botonesEmpanada.set('🐵', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/BolasDeMono.mp3',
  description: 'Bolas de mono'
})
botonesEmpanada.set('🧨', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/HolaVendesChaskibum.mp3',
  description: 'Vendes chaskibun'
})
botonesEmpanada.set('👺', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/LaReChuchaDeTato.mp3',
  description: 'La re chucha de tato'
})
botonesEmpanada.set('❓', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/DondeEstaBraulio.mp3',
  description: 'Donde esta Braulio'
})
botonesEmpanada.set('💩', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/Cacona.mp3',
  description: 'Cacona'
})
botonesEmpanada.set('💬', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/ContestameFlaco.mp3',
  description: 'Contestame flaco'
})
botonesEmpanada.set('🧎‍♂️', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/AgachateYConocelo.mp3',
  description: 'Agachate y conocelo'
})
botonesEmpanada.set('🤣', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/QueTeReisZapato.mp3',
  description: 'Que te reis zapato'
})
botonesEmpanada.set('⁉️', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/Watafak.mp3',
  description: 'Watafak'
})
botonesEmpanada.set('🦀', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/SiriFazendoBarra.mp3',
  description: 'Um siri fazendo barra'
})
botonesEmpanada.set('🤠', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/QueTipoRustico.mp3',
  description: 'Que tipo rustico'
})
botonesEmpanada.set('✋', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/Buenas.mp3',
  description: 'Bueeeenas'
})
botonesEmpanada.set('😤', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/SosUnPelotudo.mp3',
  description: 'Noooo sos un pelotudo'
})
botonesEmpanada.set('🥚', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/MamaGuevo.mp3',
  description: 'Mama guevo'
})
botonesEmpanada.set('😰', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/ReDescansero.mp3',
  description: 'Re Descansero'
})
botonesEmpanada.set('🥟', {
  task: PlayYoutube,
  parametros: undefined,
  description: 'El sueno de FerB'
})
botonesEmpanada.set('❌', {
  task: DisconnectBot,
  parametros: undefined,
  description: 'Desconectar'
})

const botonesGaspi = new Map()
botonesGaspi.set('👋', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesGaspi/BuenasGaspi.mp3',
  description: 'Buenas Gaspi'
})
botonesGaspi.set('🤪', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesGaspi/EshIncreible.mp3',
  description: 'Esh Increible'
})
botonesGaspi.set('🥴', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesGaspi/Asahsahssjajsdmaba.mp3',
  description: 'Asahsahssjajsdmaba'
})
botonesGaspi.set('🤢', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesGaspi/Nefashto.mp3',
  description: 'Nefashto'
})
botonesGaspi.set('🤮', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesGaspi/Nefashto2.mp3',
  description: 'Nefashto 2'
})
botonesGaspi.set('😷', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesGaspi/Nefashto3.mp3',
  description: 'Nefashto 3'
})
botonesGaspi.set('😅', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesGaspi/Fernanfloooo.mp3',
  description: 'Fernanfloo'
})
botonesGaspi.set('😵', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesGaspi/MagnusMefisto.mp3',
  description: 'Magnus Mefishto'
})
botonesGaspi.set('☕', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesGaspi/QueresCafe.mp3',
  description: 'Queres cafe nefashto?'
})
botonesGaspi.set('💁‍♂️', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesGaspi/TeGusta.mp3',
  description: 'Te gusta?'
})
botonesGaspi.set('🦍', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesGaspi/ayayayay.mp3',
  description: 'Ayayayayay'
})
botonesGaspi.set('🐗', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesGaspi/Fiumba.mp3',
  description: 'Fiumba'
})
botonesGaspi.set('🤓', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesGaspi/ExplicoElChiste.mp3',
  description: 'Explico el chiste'
})
botonesGaspi.set('✂', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesGaspi/Corte.mp3',
  description: 'Corte'
})
botonesGaspi.set('🎹', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesGaspi/TIIII.mp3',
  description: 'Tiiin'
})
botonesGaspi.set('🥟', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesGaspi/Empanadas.mp3',
  description: 'Empanadas'
})
botonesGaspi.set('🦒', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesGaspi/CMelman.mp3',
  description: 'C MELMAN'
})
botonesGaspi.set('❌', {
  task: DisconnectBot,
  parametros: undefined,
  description: 'Desconectar'
})

const botonesMomo = new Map()
botonesMomo.set('🕺', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesMomo/Caravana.mp3',
  description: 'Caravana'
})
botonesMomo.set('☎️', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesMomo/MeLlama.mp3',
  description: 'Ella me llama'
})
botonesMomo.set('😡', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesMomo/MomoFortnite.mp3',
  description: 'NOO MOMO FT'
})
botonesMomo.set('😤', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesMomo/MomoLOL.mp3',
  description: 'NOO MOMO LOL'
})
botonesMomo.set('💃🏾', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesMomo/BailaMorena.mp3',
  description: 'NOO MOMO LOL'
})
botonesMomo.set('🍻', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesMomo/YoTomoLicor.mp3',
  description: 'NOO MOMO LOL'
})
botonesMomo.set('❌', {
  task: DisconnectBot,
  parametros: undefined,
  description: 'Desconectar'
})

export default [botonesEmpanada, botonesGaspi, botonesMomo]
