const definirTTS = (message, usar_tts) => {
    if (usar_tts) {
        message.channel.send("**Voz desactivada**");
    } else {
        message.channel.send("**Voz activada**");
    }
    return !usar_tts;
}

export default definirTTS;