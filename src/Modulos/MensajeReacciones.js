import listaBotones from '../Datos/botones.js'

const inicializarMensaje = (client, canalSonidos) => {
  const canal = client.channels.cache.find(channel => channel.name === canalSonidos)
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

export default inicializarMensaje
