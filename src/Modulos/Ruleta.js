const ruleta = (message, use_tts) => {
    let options = message.content.toLowerCase().replace('&ruleta', '');
    if (options.length == 0) {
        message.channel.send("_Decime las options master_, es &ruleta opcion1,opcion2,opcion3,...");
        return;
    }
    options = options.split(',');
    let random = Math.floor(Math.random() * (options.length));
    message.channel.send("**" + options[random] + "**", {
        tts: use_tts
    });
}

export default ruleta;

