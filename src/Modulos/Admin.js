import { inicializarMensaje } from './Reacciones.js'

export const adminReset = ({ message, client, configuracion }) => {
  inicializarMensaje(client, configuracion.canalSonidos)
  message.channel.send('**Reseteando bot...**')
}

export const adminStatus = ({ message, configuracion }) => {
  console.log(configuracion)
  message.channel.send({
    embed: {
      color: 3447003,
      title: 'Status',
      description: 'Estado del bot',
      fields: [{
        name: 'Buenas',
        value: configuracion.buenas ? 'Buenas' : 'Malas'
      },
      {
        name: 'UsarTTS',
        value: configuracion.usarTTS ? 'Activado' : 'Desactivado'
      }
      ]
    }
  })
}
