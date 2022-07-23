const { MessageEmbed, PermissionsBitField } = require(`discord.js`);

module.exports = {
    name: 'troll',
    run: async (client, message, args) => {
if (!member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return

		let channel = message.mentions.channels.first();
        let announcement = args.slice(1).join(" ");

        if(!channel)return message.channel.send('Provide a channel dumbass')
        if(!announcement)return message.channel.send('Provide something to say dumbass')

		message.delete();

        channel.send({
            content: announcement
        });

    }
}
