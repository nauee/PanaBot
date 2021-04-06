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

const botones = new Map()
botones.set('🤬', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/NoGritesQueNoVendesNada.mp3',
  description: 'No grites que no vendes nada'
})
botones.set('😀', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/JaJaJa.mp3',
  description: 'Ja Ja Ja'
})
botones.set('🥣', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/EnanoCajetudo.mp3',
  description: 'Enano cajetudo'
})
botones.set('🐵', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/BolasDeMono.mp3',
  description: 'Bolas de mono'
})
botones.set('🧨', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/HolaVendesChaskibum.mp3',
  description: 'Vendes chaskibun'
})
botones.set('👺', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/LaReChuchaDeTato.mp3',
  description: 'La re chucha de tato'
})
botones.set('❓', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/DondeEstaBraulio.mp3',
  description: 'Donde esta Braulio'
})
botones.set('💩', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/Cacona.mp3',
  description: 'Cacona'
})
botones.set('💬', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/ContestameFlaco.mp3',
  description: 'Contestame flaco'
})
botones.set('🧎‍♂️', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/AgachateYConocelo.mp3',
  description: 'Agachate y conocelo'
})
botones.set('🤣', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/QueTeReisZapato.mp3',
  description: 'Que te reis zapato'
})
botones.set('⁉️', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/Watafak.mp3',
  description: 'Watafak'
})
botones.set('🦀', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/SiriFazendoBarra.mp3',
  description: 'Um siri fazendo barra'
})
botones.set('🤠', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/QueTipoRustico.mp3',
  description: 'Que tipo rustico'
})
botones.set('✋', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/Buenas.mp3',
  description: 'Bueeeenas'
})
botones.set('😤', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/SosUnPelotudo.mp3',
  description: 'Noooo sos un pelotudo'
})
botones.set('🥚', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/MamaGuevo.mp3',
  description: 'Mama guevo'
})
botones.set('😰', {
  task: PlayAudio,
  parametros: './src/Datos/Audios/ReDescansero.mp3',
  description: 'Re Descansero'
})
botones.set('🥟', {
  task: PlayYoutube,
  parametros: undefined,
  description: 'El sueno de FerB'
})
botones.set('❌', {
  task: DisconnectBot,
  parametros: undefined,
  description: 'Desconectar'
})

export default botones
