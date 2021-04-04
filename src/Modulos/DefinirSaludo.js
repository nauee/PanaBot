const definirSaludo = (message, buenas) => {
    if (buenas) {
        message.channel.send("**Saludo desactivado**");
    } else {
        message.channel.send("**Saludo activado**");
    }
    return !buenas;
}

export default definirSaludo;