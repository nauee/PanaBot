import Discord from 'discord.js'
import ytdl from 'ytdl-core'
import empanada_de_polenta from '../Datos/empanada_de_polenta.js'

const ReproducirYoutube = (mensaje, user, timeoutID) => {
    clearTimeout(timeoutID);
    let canal = mensaje.channel.members.get(user.id).voice.channel;
    let video = empanada_de_polenta.videos[Math.floor(Math.random() * (empanada_de_polenta.videos.length))];
    if (!canal) {
        mensaje.channel.send("_Metete a un canal zapato_")
            .then(message => {
                setTimeout(() => {
                    message.delete();
                }, 15 * 1000);
            });
    } else if (!mensaje.guild.voiceConnection) {
        canal.join().then(connection => {
            mensaje.channel.send(video.titulo)
                .then(message => {
                    setTimeout(() => {
                        message.delete();
                    }, 15 * 1000);
                });
            const url = ytdl(video.url, { filter: 'audioonly' });
            const dispatcher = mensaje.guild.voice.connection.play(url, { volume: 0.5 });
            dispatcher.on("finish", () => {
                timeoutID = setTimeout(() => {
                    canal.leave();
                }, timeoutTime)
            });
        }).catch(error => console.log(error));
    }
}

const ReproducirAudio = (mensaje, user, ruta, timeoutID) => {
    clearTimeout(timeoutID);
    let canal = mensaje.channel.members.get(user.id).voice.channel;
    if (!canal) {
        mensaje.channel.send("_Metete a un canal zapato_")
            .then(message => {
                setTimeout(() => {
                    message.delete();
                }, 15 * 1000);
            })
    } else if (!mensaje.guild.voiceConnection) {
        canal.join().then(connection => {
            const dispatcher = mensaje.guild.voice.connection.play(ruta, { volume: 0.5 });
            dispatcher.on("finish", () => {
                timeoutID = setTimeout(() => {
                    canal.leave();
                }, 15 * 60 * 1000)
            });
        }).catch(error => console.log(error));
    }
}

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
        if (emoji.name == '🤬') {
            ReproducirAudio(mensaje, user, './src/Datos/Audios/NoGritesQueNoVendesNada.mp3', timeoutID);
        } else if (emoji.name == '😀') {
            ReproducirAudio(mensaje, user, './src/Datos/Audios/JaJaJa.mp3', timeoutID);
        } else if (emoji.name == '🥣') {
            ReproducirAudio(mensaje, user, './src/Datos/Audios/EnanoCajetudo.mp3', timeoutID);
        } else if (emoji.name == '🐵') {
            ReproducirAudio(mensaje, user, './src/Datos/Audios/BolasDeMono.mp3', timeoutID);
        } else if (emoji.name == '🧨') {
            ReproducirAudio(mensaje, user, './src/Datos/Audios/HolaVendesChaskibum.mp3', timeoutID);
        } else if (emoji.name == '👺') {
            ReproducirAudio(mensaje, user, './src/Datos/Audios/LaReChuchaDeTato.mp3', timeoutID);
        } else if (emoji.name == '❓') {
            ReproducirAudio(mensaje, user, './src/Datos/Audios/DondeEstaBraulio.mp3', timeoutID);
        } else if (emoji.name == '💩') {
            ReproducirAudio(mensaje, user, './src/Datos/Audios/Cacona.mp3', timeoutID);
        } else if (emoji.name == '💬') {
            ReproducirAudio(mensaje, user, './src/Datos/Audios/ContestameFlaco.mp3', timeoutID);
        } else if (emoji.name == '🧎‍♂️') {
            ReproducirAudio(mensaje, user, './src/Datos/Audios/AgachateYConocelo.mp3', timeoutID);
        } else if (emoji.name == '🤣') {
            ReproducirAudio(mensaje, user, './src/Datos/Audios/QueTeReisZapato.mp3', timeoutID);
        } else if (emoji.name == '⁉️') {
            ReproducirAudio(mensaje, user, './src/Datos/Audios/Watafak.mp3', timeoutID);
        } else if (emoji.name == '🦀') {
            ReproducirAudio(mensaje, user, './src/Datos/Audios/SiriFazendoBarra.mp3', timeoutID);
        } else if (emoji.name == '🤠') {
            ReproducirAudio(mensaje, user, './src/Datos/Audios/QueTipoRustico.mp3', timeoutID);
        } else if (emoji.name == '✋') {
            ReproducirAudio(mensaje, user, './src/Datos/Audios/Buenas.mp3');
        } else if (emoji.name == '😤') {
            ReproducirAudio(mensaje, user, './src/Datos/Audios/SosUnPelotudo.mp3', timeoutID);
        } else if (emoji.name == '🥚') {
            ReproducirAudio(mensaje, user, './src/Datos/Audios/MamaGuevo.mp3', timeoutID);
        } else if (emoji.name == '😰') {
            ReproducirAudio(mensaje, user, './src/Datos/Audios/ReDescansero.mp3', timeoutID);
        } else if (emoji.name == '🥟') {
            ReproducirYoutube(mensaje, user, timeoutID);
        } else if (emoji.name == '❌') {
            clearTimeout(timeoutID);
            let canal = mensaje.member.voice.channel;
            if (canal) {
                canal.leave();
            }
        }
        reaction.users.remove(user.id);
    }
}

export default reacciones;