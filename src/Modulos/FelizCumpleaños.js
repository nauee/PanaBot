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

const checkCumpleaños = (client, canalGeneral) => {
  const canal = client.channels.cache.find(channel => channel.name === canalGeneral)
  let saludoCumpleaños = false
  setInterval(() => {
    const cumpleañero = buscarCumpleañero()
    console.log(cumpleañero)
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

export default checkCumpleaños
