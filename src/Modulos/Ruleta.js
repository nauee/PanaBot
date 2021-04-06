const ruleta = (message, useTTS) => {
  let options = message.content.toLowerCase().replace('&ruleta', '')
  if (options.length === 0) {
    message.channel.send('_Decime las options master_, es &ruleta opcion1,opcion2,opcion3,...')
    return
  }
  options = options.split(',')
  const random = Math.floor(Math.random() * (options.length))
  message.channel.send('**' + options[random] + '**', {
    tts: useTTS
  })
}

export default ruleta
