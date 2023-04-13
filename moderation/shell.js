const { MessageEmbed } = require(`discord.js`);
const child = require("child_process")

module.exports = {
    name: 'shell',
    run: async (client, message, args) => {
    if(!message.author.id === "403657714812715008") return
    const command = args.join(" ")
    if(command.includes("shutdown" || "rm" || "mkfs")) return message.channel.send({ content:"no" })
    if(!command) return

    child.exec(command, (err, res) =>{
        if(err) return message.channel.send({content: `\`\`\`${err}\`\`\``})

        const e = new MessageEmbed()
        .setColor("BLURPLE")
        .setDescription(`\`\`\`js\n ${res.slice(0, 4000)}\`\`\``)
        .setTimestamp()
        message.channel.send({embeds:[e]})
    })

  }
}
