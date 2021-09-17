import listaBotones from '../Datos/botones.js'

export const inicializarMensaje = (client, canalSonidos) => {
  const guild = client.guilds.cache.find(guild => guild.id !== '885973625583304744')
  const canal = guild.channels.cache.find(channel => channel.name === canalSonidos)
  canal.messages.fetchPinned()
    .then(messages => {
      if (messages.size === 0) {
        listaBotones.forEach((value, index) => {
          const botones = value
          const embedFields = []
          botones.forEach((value, key) => {
            const insert = {
              name: `------------  ${key}  ------------`,
              value: value.description,
              inline: true
            }
            embedFields.push(insert)
          })
          canal.send({
            embed: {
              color: 3447003,
              title: `Botones ${index + 1}`,
              description: 'Apreta la reaccion chinchu',
              fields: embedFields
            }
          }).then(message => {
            message.pin()
            for (const key of botones.keys()) {
              message.react(key)
            }
          })
        })
      }
    })
    .catch(console.error)
}

export const reacciones = async (reaction, user, configuracion) => {
  const mensaje = reaction.message
  const emoji = reaction.emoji
  if (mensaje.channel.name !== configuracion.canalSonidos) return
  const botonera = Number(mensaje.embeds[0].title.replace('Botones ', ''))
  const botones = listaBotones[botonera - 1]

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
        value.task(mensaje, user, configuracion, value.parametros)
      }
    })
    reaction.users.remove(user.id)
  }
}
