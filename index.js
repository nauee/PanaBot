const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const config = require("./config.json");
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const empanada_de_polenta = require("./src/empanada_de_polenta.json");

const timeoutTime = 15 * 60 * 1000;
let timeoutID;
var reacciones = 0;

function CopiarValorReacciones(id) {
    reacciones = id;
}

function ReproducirAudio(mensaje, user, ruta) {
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
                }, timeoutTime)
            });
        }).catch(error => console.log(error));
    }
}

function ReproducirYoutube(mensaje, user) {
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

client.on('ready', () => {
    let canal = client.channels.cache.find(channel => channel.name === 'sonidos');
    canal.messages.fetchPinned()
        .then(messages => {
            if (messages.size == 0) {
                canal.send({
                    embed: {
                        color: 3447003,
                        title: "Comandos",
                        description: "Apreta la reaccion chinchu",
                        fields: [{
                            name: "No grites que no vendes nada",
                            value: "**----------------🤬----------------**"
                        },
                        {
                            name: "Ja Ja Ja",
                            value: "**----------------😀----------------**"
                        },
                        {
                            name: "Enano cajetudo",
                            value: "**----------------🥣----------------**"
                        },
                        {
                            name: "Bolas de mono",
                            value: "**----------------🐵----------------**"
                        },
                        {
                            name: "El sueno de FerB",
                            value: "**----------------🥟----------------**"
                        },
                        {
                            name: "Desconectar",
                            value: "**----------------❌----------------**"
                        }
                        ],
                    }
                })
                    .then(message => {
                        message.pin();
                        message.react('🤬');
                        message.react('😀');
                        message.react('🥣');
                        message.react('🐵');
                        message.react('🥟');
                        message.react('❌');
                        CopiarValorReacciones(message.id);
                    });
            } else {
                CopiarValorReacciones(messages.first().id);
            }
        })
        .catch(console.error);
})

client.on('message', message => {
    if (message.author == client.user) {
        return
    }
    console.log(reacciones);
    let mensaje = message.content.toLowerCase();
    if (mensaje.startsWith('&pelado') || mensaje.startsWith('panabot pelado')) {
        let pelos = Math.floor(Math.random() * 101);
        message.channel.send("**" + message.author.username + "**" + " está un " + pelos + "% pelado");
    } else if (mensaje.startsWith('&plandeestudios') || mensaje.startsWith('panabot plandeestudios')) {
        message.channel.send("Toma chinchu, cualquier cosa le decis al otro panabot\n https://fdelmazo.github.io/FIUBA-Map/");
    } else if (mensaje.startsWith('&parcial') || mensaje.startsWith('panabot parcial')) {
        message.channel.send("**_Éxitos!._**");
    } else if (mensaje.startsWith('&cumpleaños') || mensaje.startsWith('panabot cumpleaños')) {
        message.channel.send({
            embed: {
                color: 3447003,
                title: "Cumpleañitos",
                fields: [{
                    name: "MotoMelzr",
                    value: "8 de Febrero",
                    inline: true
                },
                {
                    name: "ferbalmaceda23",
                    value: "20 de marzo",
                    inline: true
                },
                {
                    name: "NicoPhyton",
                    value: "27 de abril",
                    inline: true
                },
                {
                    name: "Naue",
                    value: "13 de mayo",
                    inline: true
                },
                {
                    name: "Mate",
                    value: "14 de agosto",
                    inline: true
                },
                {
                    name: "JoacoBot",
                    value: "10 de noviembre",
                    inline: true
                },
                {
                    name: "AgusBro",
                    value: "27 de diciembre",
                    inline: true
                }
                ],
            }
        })
    } else if (mensaje.startsWith('&comandos') || mensaje.startsWith('panabot comandos')) {
        message.channel.send({
            embed: {
                color: 3447003,
                title: "Comandos",
                description: "Pueden poner &comando o panabot comando",
                fields: [{
                    name: "Pelado",
                    value: "Muy pelado"
                },
                {
                    name: "PlanDeEstudios",
                    value: "El proposito de PanaBot"
                },
                {
                    name: "Parcial",
                    value: "Éxitos!."
                },
                {
                    name: "Cumpleaños",
                    value: "Parabens"
                },
                {
                    name: "Comandos",
                    value: "Es lo que acabas de escribir zapato"
                }
                ],
            }
        })
    }
});

client.on('messageReactionAdd', async (reaction, user) => {

    let mensaje = reaction.message;
    let emoji = reaction.emoji;

    if (!user.bot) {
        if (mensaje.partial) {
            try {
                await mensaje.fetch();
            } catch (error) {
                console.error('Algo salio mal: ', error);
            }
        }
        if (emoji.name == '🤬') {
            ReproducirAudio(mensaje, user, './src/NoGritesQueNoVendesNada.mp3');
        } else if (emoji.name == '😀') {
            ReproducirAudio(mensaje, user, './src/JaJaJa.mp3');
        } else if (emoji.name == '🥣') {
            ReproducirAudio(mensaje, user, './src/EnanoCajetudo.mp3')
        } else if (emoji.name == '🐵') {
            ReproducirAudio(mensaje, user, './src/BolasDeMono.mp3');
        } else if (emoji.name == '🥟') {
            ReproducirYoutube(mensaje, user);
        } else if (emoji.name == '❌') {
            clearTimeout(timeoutID);
            let canal = mensaje.member.voice.channel;
            if (canal) {
                canal.leave();
            }
        }
        reaction.users.remove(user.id);
    }

});

client.login(config.BOT_TOKEN);