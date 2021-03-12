const listarComandos = (message) => {
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

export default listarComandos