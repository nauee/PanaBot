import { reproducir } from './Musica.js'

export const definirSaludo = ({ message, configuracion }) => {
  if (configuracion.buenas) {
    message.channel.send('**Saludo desactivado**')
  } else {
    message.channel.send('**Saludo activado**')
  }
  configuracion.buenas = !configuracion.buenas
}

export const saludar = (oldState, newState, configuracion) => {
  const oldChannel = oldState.channel
  const newChannel = newState.channel
  if (!configuracion.buenas) {
    return
  }
  if (oldChannel !== newChannel) {
    if (newChannel !== null && oldChannel === null && !newState.member.user.bot) {
      const usersAmount = newChannel.members.filter(member => !member.user.bot).array().length
      if (usersAmount < 1) {
        return
      }
      if (!oldState.guild.voiceConnection) {
        newState.channel.join().then(connection => {
          const queue = configuracion.queue
          const serverQueue = queue.get(newChannel.guild.id)
          const dispatcher = serverQueue ? serverQueue.connection : connection
          dispatcher
            .play('./src/Datos/Audios/BotonesEmpanada/Buenas.mp3', { volume: 0.5 })
            .on('finish', () => {
              if (serverQueue) {
                reproducir(newChannel.guild, serverQueue.songs[0], configuracion)
              } else {
                configuracion.timeoutID = setTimeout(() => {
                  newChannel.leave()
                }, 15 * 60 * 1000)
              }
            })
        }).catch(error => console.log(error))
      }
    }
  }
}
