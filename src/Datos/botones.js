import ytdl from 'ytdl-core'
import empanadaDePolenta from '../Datos/empanadaDePolenta.js'

const PlayYoutube = (mensaje, user, timeoutID) => {
  clearTimeout(timeoutID)
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
      const dispatcher = mensaje.guild.voice.connection.play(url, { volume: 0.5 })
      dispatcher.on('finish', () => {
        timeoutID = setTimeout(() => {
          canal.leave()
        }, 15 * 60 * 1000)
      })
    }).catch(error => console.log(error))
  }
}

const PlayAudio = (mensaje, user, timeoutID, ruta) => {
  clearTimeout(timeoutID)
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
      const dispatcher = mensaje.guild.voice.connection.play(ruta, { volume: 0.5 })
      dispatcher.on('finish', () => {
        timeoutID = setTimeout(() => {
          canal.leave()
        }, 15 * 60 * 1000)
      })
    }).catch(error => console.log(error))
  }
}

const DisconnectBot = (mensaje, user, timeoutID) => {
  clearTimeout(timeoutID)
  const canal = mensaje.member.voice.channel
  if (canal) {
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
botonesEmpanada.set('👋', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/BuenasGaspi.mp3',
  description: 'Buenas Gaspi'
})
botonesEmpanada.set('🤢', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/Nefashto.mp3',
  description: 'Nefashto'
})
botonesEmpanada.set('🤪', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/EshIncreible.mp3',
  description: 'Esh Increible'
})
botonesEmpanada.set('🥴', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/Asahsahssjajsdmaba.mp3',
  description: 'Asahsahssjajsdmaba'
})
botonesEmpanada.set('😅', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BotonesEmpanada/Fernanfloooo.mp3',
  description: 'Fernanfloo'
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

export default [botonesEmpanada]
