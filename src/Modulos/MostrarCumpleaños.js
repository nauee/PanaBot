const mostrarCumpleaños = (message) => {
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
                name: "Filita",
                value: "4 de agosto",
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

export default mostrarCumpleaños;