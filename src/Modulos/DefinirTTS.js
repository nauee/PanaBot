export const definirTTS = ({ message, configuracion }) => {
  if (configuracion.usarTTS) {
    message.channel.send('**Voz desactivada**')
  } else {
    message.channel.send('**Voz activada**')
  }
  configuracion.usarTTS = !configuracion.usarTTS
}
