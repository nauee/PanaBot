import Discord from 'discord.js'

const inicializarMensaje = (client, canal_sonidos) => {
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
                    });
            }
        })
        .catch(console.error);
}

export default inicializarMensaje;