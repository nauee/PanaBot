const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const config = require("./config.json");
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const empanada_de_polenta = require("./src/empanada_de_polenta.json");

const timeoutTime = 15 * 60 * 1000;
const canal_sonidos = 'sonidos';
let timeoutID;
var reacciones = 0;
var buenas = true;
var usar_tts = false;

const respuestas = [
    "obvio pa",
    "si",
    "seee",
    "pero claro que si",
    "sin lugar a dudas",
    "y yo que se master",
    "hace falta que te lo diga?",
    "probablemente",
    "puede ser",
    "indefinido",
    "capaz",
    "confuso",
    "dudoso",
    "no",
    "ni ahi",
    "no chinchu",
    "no es por ahi",
    "y no capo",
];

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
    let canal = client.channels.cache.find(channel => channel.name === canal_sonidos);
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
                            name: "Vendes chaskibun",
                            value: "**----------------🧨----------------**"
                        },
                        {
                            name: "La re chucha de tato",
                            value: "**----------------👺----------------**"
                        },
                        {
                            name: "Donde esta Braulio",
                            value: "**----------------❓----------------**"
                        },
                        {
                            name: "Cacona",
                            value: "**----------------💩----------------**"
                        },
                        {
                            name: "Contestame flaco",
                            value: "**----------------💬----------------**"
                        },
                        {
                            name: "Agachate y conocelo",
                            value: "**----------------🧎‍♂️----------------**"
                        },
                        {
                            name: "Que te reis zapato",
                            value: "**----------------🤣----------------**"
                        },
                        {
                            name: "Watafak",
                            value: "**----------------⁉️----------------**"
                        },
                        {
                            name: "Um siri fazendo barra",
                            value: "**----------------🦀----------------**"
                        },
                        {
                            name: "Que tipo rustico",
                            value: "**----------------🤠----------------**"
                        },
                        {
                            name: "Bueeeenas",
                            value: "**----------------✋----------------**"
                        },
                        {
                            name: "Noooo sos un pelotudo",
                            value: "**----------------😤----------------**"
                        },
                        {
                            name: "Mama guevo",
                            value: "**----------------🥚----------------**"
                        },
                        {
                            name: "Re Descansero",
                            value: "**----------------😰----------------**"
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
                        message.react('🧨');
                        message.react('👺');
                        message.react('❓');
                        message.react('💩');
                        message.react('💬');
                        message.react('🧎‍♂️');
                        message.react('🤣');
                        message.react('⁉️');
                        message.react('🦀');
                        message.react('🤠');
                        message.react('✋');
                        message.react('😤');
                        message.react('🥚');
                        message.react('😰');
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

    let mensaje = message.content.toLowerCase();
    if (mensaje.startsWith('&pelado') || mensaje.startsWith('panabot pelado')) {
        var nombre = mensaje.split("pelado ", 2);
        let pelos = Math.floor(Math.random() * 101);
        if (!nombre[1])
            message.channel.send("**" + message.author.username + "**" + " está un " + pelos + "% pelado");
        else
            message.channel.send("**" + nombre[1] + "**" + " está un " + pelos + "% pelado");
    } 
    
    else if (mensaje.startsWith('&plandeestudios') || mensaje.startsWith('panabot plandeestudios')) {
        message.channel.send("Toma chinchu, cualquier cosa le decis al otro panabot\n https://fdelmazo.github.io/FIUBA-Map/");
    } 
    
    else if (mensaje.startsWith('&parcial') || mensaje.startsWith('panabot parcial')) {
        message.channel.send("**_Éxitos!._**");
    } 
    
    else if (mensaje.startsWith('&cumpleaños') || mensaje.startsWith('panabot cumpleaños')) {
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
    } 
    
    else if (mensaje.startsWith('&buenas') || mensaje.startsWith('panabot buenas')) {
        buenas = true;
        message.channel.send ("**Saludo activado**");
    } 
    
    else if (mensaje.startsWith('&malas') || mensaje.startsWith('panabot malas')) {
        buenas = false;
        message.channel.send ("**Saludo desactivado**");
    } 
    
    else if (mensaje.startsWith('&ruleta')) {
        let opciones = mensaje.replace('&ruleta', '');
        if (opciones.length == 0) {
            message.channel.send ("_Decime las opciones master_, es &ruleta opcion1,opcion2,opcion3,...");
            return;
        }
        opciones = opciones.split(',');
        let random = Math.floor(Math.random() * (opciones.length));
        message.channel.send ("**" + opciones[random] + "**", {
            tts: usar_tts 
        });
    } 
    
    else if (mensaje.startsWith('&pregunta')) {
        var pregunta = mensaje.split(" ", 2);
        if (!pregunta[1])
            message.channel.send("_Te olvidaste la pregunta master_");
        else if (pregunta[1].startsWith("sale")) {
            message.channel.send("**_sale._**", {
                tts: usar_tts   
            });
        } else {
            message.channel.send("**_" + respuestas[Math.floor(Math.random() * respuestas.length)] + "_**", {
                tts: usar_tts   
            });
        }
    }

    else if (mensaje.startsWith('&tts')) {
        if (usar_tts === true) {
            usar_tts = false;
            message.channel.send ("**Voz desactivada**");
        }
        else {
            usar_tts = true;
            message.channel.send ("**Voz activada**");
        }
    }

    else if (mensaje.startsWith('&comandos') || mensaje.startsWith('panabot comandos')) {
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
                    name: "Buenas / Malas",
                    value: "Activar / Desactivar bueeeeeenas"
                },
                {
                    name: "Ruleta",
                    value: "Elegi entre distintas opciones (separa las opciones con ,)"
                },
                {
                    name: "Pregunta",
                    value: "Haceme una pregunta de si o no"
                },
                {
                    name: "tts",
                    value: "Activar/desactivar tts en ruleta y pregunta"
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
            ReproducirAudio(mensaje, user, './src/NoGritesQueNoVendesNada.mp3');
        } else if (emoji.name == '😀') {
            ReproducirAudio(mensaje, user, './src/JaJaJa.mp3');
        } else if (emoji.name == '🥣') {
            ReproducirAudio(mensaje, user, './src/EnanoCajetudo.mp3')
        } else if (emoji.name == '🐵') {
            ReproducirAudio(mensaje, user, './src/BolasDeMono.mp3');
        } else if (emoji.name == '🧨') {
            ReproducirAudio(mensaje, user, './src/HolaVendesChaskibum.mp3');
        } else if (emoji.name == '👺') {
            ReproducirAudio(mensaje, user, './src/LaReChuchaDeTato.mp3');
        } else if (emoji.name == '❓') {
            ReproducirAudio(mensaje, user, './src/DondeEstaBraulio.mp3');
        } else if (emoji.name == '💩') {
            ReproducirAudio(mensaje, user, './src/Cacona.mp3');
        } else if (emoji.name == '💬') {
            ReproducirAudio(mensaje, user, './src/ContestameFlaco.mp3');
        } else if (emoji.name == '🧎‍♂️') {
            ReproducirAudio(mensaje, user, './src/AgachateYConocelo.mp3');
        } else if (emoji.name == '🤣') {
            ReproducirAudio(mensaje, user, './src/QueTeReisZapato.mp3');
        } else if (emoji.name == '⁉️') {
            ReproducirAudio(mensaje, user, './src/Watafak.mp3');
        } else if (emoji.name == '🦀') {
            ReproducirAudio(mensaje, user, './src/SiriFazendoBarra.mp3');
        } else if (emoji.name == '🤠') {
            ReproducirAudio(mensaje, user, './src/QueTipoRustico.mp3');
        } else if (emoji.name == '😤') {
            ReproducirAudio(mensaje, user ,'./src/SosUnPelotudo.mp3');
        } else if (emoji.name == '🥚') {
            ReproducirAudio(mensaje, user ,'./src/MamaGuevo.mp3');
        } else if (emoji.name == '😰') {
            ReproducirAudio(mensaje, user ,'./src/ReDescansero.mp3');
        } else if (emoji.name == '🥟') {
            ReproducirYoutube(mensaje, user);
        } else if (emoji.name == '❌') {
            clearTimeout(timeoutID);
            let canal = mensaje.member.voice.channel;
            if (canal) {
                canal.leave();
            }
        } else if (emoji.name == '✋') {
            ReproducirAudio(mensaje, user, './src/Buenas.mp3');
        }
        reaction.users.remove(user.id);
    }

});

client.on("voiceStateUpdate", (oldState, newState) => {
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
                    const dispatcher = connection.play('./src/Buenas.mp3', { volume: 0.5 });
                    dispatcher.on("finish", () => {
                        timeoutID = setTimeout(() => {
                            newState.leave();
                        }, timeoutTime)
                    });
                }).catch(error => console.log(error));
            }
        }
    }
});

client.login(config.BOT_TOKEN);