const definirTTS = (message, usarTTS) => {
  if (usarTTS) {
    message.channel.send('**Voz desactivada**')
  } else {
    message.channel.send('**Voz activada**')
  }
  return !usarTTS
}

export default definirTTS
