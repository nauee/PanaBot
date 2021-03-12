const pelado = () => {
    let nombre = mensaje.split("pelado ", 2);
    let pelos = Math.floor(Math.random() * 101);
    if (!nombre[1])
        message.channel.send("**" + message.author.username + "**" + " está un " + pelos + "% pelado");
    else
        message.channel.send("**" + nombre[1] + "**" + " está un " + pelos + "% pelado");
}

export default pelado;