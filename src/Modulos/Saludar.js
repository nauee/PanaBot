const saludar = (oldState, newState, timeoutID, buenas) => {
  const oldChannel = oldState.channel
  const newChannel = newState.channel
  if (!buenas) {
    return
  }
  if (oldChannel !== newChannel) {
    if (newChannel !== null && oldChannel === null && !newState.member.user.bot) {
      const usersAmount = newChannel.members.filter(member => !member.user.bot).array().length
      if (usersAmount < 2) {
        return
      }
      if (!oldState.guild.voiceConnection) {
        newState.channel.join().then(connection => {
          const dispatcher = connection.play('./src/Datos/Audios/Buenas.mp3', { volume: 0.5 })
          dispatcher.on('finish', () => {
            timeoutID = setTimeout(() => {
              newState.leave()
            }, 15 * 60 * 1000)
          })
        }).catch(error => console.log(error))
      }
    }
  }
}

export default saludar
