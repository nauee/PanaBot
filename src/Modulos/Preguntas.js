const respuestas = [
  'obvio pa',
  'si',
  'seee',
  'pero claro que si',
  'sin lugar a dudas',
  'y yo que se master',
  'hace falta que te lo diga?',
  'probablemente',
  'puede ser',
  'indefinido',
  'capaz',
  'confuso',
  'dudoso',
  'no',
  'ni ahi',
  'no chinchu',
  'no es por ahi',
  'y no capo'
]

const preguntarAlBot = (message, usarTTS) => {
  const pregunta = message.content.split(' ', 2)
  if (!pregunta[1]) {
    message.channel.send('_Te olvidaste la pregunta master_')
  } else if (pregunta[1].startsWith('sale')) {
    message.channel.send('**_sale._**', {
      tts: usarTTS
    })
  } else {
    message.channel.send('**_' + respuestas[Math.floor(Math.random() * respuestas.length)] + '_**', {
      tts: usarTTS
    })
  }
}

export default preguntarAlBot
