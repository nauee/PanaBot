const definirTTS = (message, usar_tts) => {
    if (usar_tts === true) {
        usar_tts = false;
        message.channel.send("**Voz desactivada**");
    }
    else {
        usar_tts = true;
        message.channel.send("**Voz activada**");
    }
}

export default definirTTS;