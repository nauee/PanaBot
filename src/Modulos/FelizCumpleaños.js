import data from '../Datos/cumpleañitos.js'

const buscarCumpleañero = () => {
  const fecha = new Date()
  let cumpleañero = ''
  data.cumpleaños.forEach((value) => {
    if (value.cumpleaños.getUTCDate() === fecha.getUTCDate() && value.cumpleaños.getUTCMonth() === fecha.getUTCMonth() && fecha.getHours() >= 3) {
      cumpleañero = value.nombre
    }
  })
  return cumpleañero
}

export const checkCumpleaños = (client, canalGeneral) => {
  const guild = client.guilds.cache.find(guild => guild.id !== '885973625583304744')
  const canal = guild.channels.cache.find(channel => channel.name === canalGeneral)
  let saludoCumpleaños = false
  setInterval(() => {
    const cumpleañero = buscarCumpleañero()
    if (cumpleañero !== '') {
      if (!saludoCumpleaños) {
        canal.send(`**Feliz cumpleaños ${cumpleañero}!.**`)
        saludoCumpleaños = true
      }
    } else {
      saludoCumpleaños = false
    }
  }, 5 * 60 * 1000)
}

export const mostrarCumpleaños = ({ message }) => {
  const embedFields = []
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  data.cumpleaños.forEach((value) => {
    const insert = {
      name: value.nombre,
      value: `${value.cumpleaños.getUTCDate()} de ${meses[value.cumpleaños.getUTCMonth()]}`,
      inline: true
    }
    embedFields.push(insert)
  })
  message.channel.send({
    embed: {
      color: 3447003,
      title: 'Cumpleañitos',
      fields: embedFields
    }
  })
}
