const definirSaludo = (message, valor) => {
    if (valor) message.channel.send("**Saludo activado**");
    else message.channel.send("**Saludo desactivado**");
    return valor;
}

export default definirSaludo;