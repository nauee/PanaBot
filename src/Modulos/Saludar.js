const saludar = (oldState, newState, buenas) => {
    let canalViejo = oldState.channel;
    let canalNuevo = newState.channel;
    if (!buenas) {
        return;
    }
    if (canalViejo != canalNuevo) {
        if (canalNuevo !== null && canalViejo === null && !newState.member.user.bot) {
            let cantidadUsuarios = canalNuevo.members.filter(member => !member.user.bot).array().length;
            if (cantidadUsuarios < 2) {
                return;
            }
            if (!oldState.guild.voiceConnection) {
                newState.channel.join().then(connection => {
                    const dispatcher = connection.play('./src/Datos/Audios/Buenas.mp3', { volume: 0.5 });
                    dispatcher.on("finish", () => {
                        timeoutID = setTimeout(() => {
                            newState.leave();
                        }, 15 * 60 * 1000)
                    });
                }).catch(error => console.log(error));
            }
        }
    }
}

export default saludar;