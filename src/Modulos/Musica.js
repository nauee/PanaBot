import ytdl from 'ytdl-core'
import ytSearch from 'yt-search'

export const reproducir = (guild, song, configuracion) => {
  const queue = configuracion.queue
  const serverQueue = queue.get(guild.id)
  if (!song) {
    serverQueue.voiceChannel.leave()
    queue.delete(guild.id)
    return
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on('finish', () => {
      serverQueue.songs.shift()
      reproducir(guild, serverQueue.songs[0], configuracion)
    })
    .on('error', error => console.error(error))
  dispatcher.setVolumeLogarithmic(serverQueue.volume)
  serverQueue.textChannel.send(`Reproduciendo **${song.title}**`)
}

const obtenerCancion = async (valor) => {
  console.log(valor)
  if (valor === null) return null
  let song = null
  if (ytdl.validateURL(valor)) {
    console.log('es url')
    const songInfo = await ytdl.getInfo(valor)
    song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url }
  } else {
    console.log('es nombre')
    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query)
      return videoResult.videos[0]
    }

    const video = await videoFinder(valor)
    if (video !== null) song = { title: video.title, url: video.url }
  }
  return song
}

export const play = async ({ message, configuracion }) => {
  clearTimeout(configuracion.timeoutID)
  const queue = configuracion.queue
  const serverQueue = queue.get(message.guild.id)
  const args = message.content.split(' ')
  args.shift()
  const voiceChannel = message.member.voice.channel
  if (!voiceChannel) return message.channel.send('_Metete a un canal zapato_"')
  const song = await obtenerCancion(args.join(' '))
  if (!song) return message.channel.send('No se pudo encontrar esa canción')
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 0.5,
      playing: true
    }

    queue.set(message.guild.id, queueConstruct)
    queueConstruct.songs.push(song)

    try {
      queueConstruct.connection = await voiceChannel.join()
      reproducir(message.guild, queueConstruct.songs[0], configuracion)
    } catch (err) {
      console.log(err)
      queue.delete(message.guild.id)
      return message.channel.send(err)
    }
  } else {
    serverQueue.songs.push(song)
    return message.channel.send(`**${song.title}** se agregó a la playlist`)
  }
}

export const skip = ({ message, configuracion }) => {
  if (!message.member.voice.channel) return message.channel.send('_Metete a un canal zapato_"')
  const queue = configuracion.queue
  const serverQueue = queue.get(message.guild.id)
  if (!serverQueue) return message.channel.send('_Que queres skipear capo?_')
  serverQueue.connection.dispatcher.end()
}

export const disconnect = ({ message, configuracion }) => {
  if (!message.member.voice.channel) return message.channel.send('_Metete a un canal zapato_"')
  const queue = configuracion.queue
  const serverQueue = queue.get(message.guild.id)
  if (!serverQueue) return message.channel.send('_Que queres desconectar capo?_')
  serverQueue.songs = []
  serverQueue.connection.dispatcher.end()
}

export const queue = ({ message, configuracion }) => {
  const queue = configuracion.queue
  const serverQueue = queue.get(message.guild.id)
  if (!serverQueue) return message.channel.send('_No hay ningun tema master_')
  const canciones = []
  serverQueue.songs.forEach((value, index) => {
    const cancion = {
      name: `Nº${index}`,
      value: value.title,
      inline: false
    }
    canciones.push(cancion)
  })
  canciones.shift()
  serverQueue.textChannel.send({
    embed: {
      color: 3447003,
      title: 'Canciones:',
      description: `Reproduciendo actualmente:\n**${serverQueue.songs[0].title}**\n\n**__Siguientes canciones:__**`,
      fields: canciones
    }
  })
}

export const remove = ({ message, configuracion }) => {
  const queue = configuracion.queue
  const serverQueue = queue.get(message.guild.id)
  const songs = serverQueue.songs
  if (!serverQueue) return message.channel.send('_Que queres borrar flaco?_')
  const valor = (message.content.split(' ', 2))[1]
  const index = parseInt(valor)
  if (isNaN(index)) return message.channel.send('_Eso no es un numero pibbbe_')
  if (index >= songs.length) return message.channel.send('_No existe esa canción pibbbbe_')
  if (index === 0) skip({ message, configuracion })
  else songs.splice(index, 1)
}
