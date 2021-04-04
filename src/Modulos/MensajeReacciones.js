import botones from '../Datos/botones.js'

const inicializarMensaje = (client, canal_sonidos) => {
    let canal = client.channels.cache.find(channel => channel.name === canal_sonidos);
    canal.messages.fetchPinned()
        .then(messages => {
            if (messages.size == 0) {
                let embedFields = [];
                botones.forEach((value, key) => {
                    let insert = {
                        name: value.description,
                        value: "**----------------" + key + "----------------**"
                    }
                    embedFields.push(insert);
                })
                canal.send({
                    embed: {
                        color: 3447003,
                        title: "Comandos",
                        description: "Apreta la reaccion chinchu",
                        fields: embedFields,
                    }
                }).then(message => {
                    message.pin()
                    for (let key of botones.keys()) {
                        message.react(key)
                    }
                });
            }
        })
        .catch(console.error);
}

export default inicializarMensaje;