import botones from '../Datos/botones.js'

const reacciones = async (reaction, user, timeoutID, canal_sonidos) => {
    let mensaje = reaction.message;
    let emoji = reaction.emoji;
    if (mensaje.channel.name != canal_sonidos) return;

    if (!user.bot) {
        if (mensaje.partial) {
            try {
                await mensaje.fetch();
            } catch (error) {
                console.error('Algo salio mal: ', error);
            }
        }
        botones.forEach((value, key) => {
            if (emoji.name == key) {
                value.task(mensaje, user, timeoutID, value.parametros);
            }
        })
        reaction.users.remove(user.id);
    }
}

export default reacciones;