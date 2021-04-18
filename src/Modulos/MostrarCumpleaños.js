import data from '../Datos/cumpleañitos.js'

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

const mostrarCumpleaños = (message) => {
  const embedFields = []
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

export default mostrarCumpleaños
