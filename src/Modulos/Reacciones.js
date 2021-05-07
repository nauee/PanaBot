import listaBotones from '../Datos/botones.js'

const reacciones = async (reaction, user, timeoutID, canalSonidos) => {
  const mensaje = reaction.message
  const emoji = reaction.emoji
  const botonera = Number(mensaje.embeds[0].title.replace('Botones ', ''))
  const botones = listaBotones[botonera - 1]
  if (mensaje.channel.name !== canalSonidos) return

  if (!user.bot) {
    if (mensaje.partial) {
      try {
        await mensaje.fetch()
      } catch (error) {
        console.error('Algo salio mal: ', error)
      }
    }
    botones.forEach((value, key) => {
      if (emoji.name === key) {
        value.task(mensaje, user, timeoutID, value.parametros)
      }
    })
    reaction.users.remove(user.id)
  }
}

export default reacciones
