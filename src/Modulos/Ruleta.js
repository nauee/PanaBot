const ruleta = (message, usar_tts) => {
    let opciones = message.content.toLowerCase().replace('&ruleta', '');
    if (opciones.length == 0) {
        message.channel.send("_Decime las opciones master_, es &ruleta opcion1,opcion2,opcion3,...");
        return;
    }
    opciones = opciones.split(',');
    let random = Math.floor(Math.random() * (opciones.length));
    message.channel.send("**" + opciones[random] + "**", {
        tts: usar_tts
    });
}

export default ruleta;

