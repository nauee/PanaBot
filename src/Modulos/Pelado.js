export const pelado = ({ message }) => {
  const nombre = message.content.toLowerCase().split('pelado ', 2)
  const pelos = Math.floor(Math.random() * 101)
  !nombre[1]
    ? message.channel.send('**' + message.author.username + '**' + ' está un ' + pelos + '% pelado')
    : message.channel.send('**' + nombre[1] + '**' + ' está un ' + pelos + '% pelado')
}
