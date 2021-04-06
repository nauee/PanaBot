import botones from '../Datos/botones.js'

const inicializarMensaje = (client, canalSonidos) => {
  const canal = client.channels.cache.find(channel => channel.name === canalSonidos)
  canal.messages.fetchPinned()
    .then(messages => {
      if (messages.size === 0) {
        const embedFields = []
        botones.forEach((value, key) => {
          const insert = {
            name: value.description,
            value: '**----------------' + key + '----------------**'
          }
          embedFields.push(insert)
        })
        canal.send({
          embed: {
            color: 3447003,
            title: 'Comandos',
            description: 'Apreta la reaccion chinchu',
            fields: embedFields
          }
        }).then(message => {
          message.pin()
          for (const key of botones.keys()) {
            message.react(key)
          }
        })
      }
    })
    .catch(console.error)
}

export default inicializarMensaje
