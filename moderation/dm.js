const { MessageEmbed } = require(`discord.js`);

module.exports = {
    name: 'dm',
    run: async (client, message, args, er) => {

        if (!message.member.permissions.has("MANAGE_MESSAGES"))return 
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send({content: `You did not mention a user, or you gave an invalid id`});
      if (!args.slice(1).join(" "))
        return message.channel.send({content: "You did not specify your message"});
      user.user
        .send(args.slice(1).join(" "))
        .catch(() => message.channel.send({content: "That user could not be DMed!"}))
        .then(() => message.channel.send({content: `Sent a message to ${user.user.tag}`}));
    }
}
