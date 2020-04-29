const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const bot = new discord.Client();
bot.command = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

        if (err) console.log(err);
        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) {
                console.log("Geen files beschikbaar");
                return;
        }

        jsFiles.forEach((f, i) => {

                var fileGet = require(`./commands/${f}`);
                console.log(`De File ${f} is geladen`);

                bot.command.set(fileGet.help.name, fileGet);
        })

});



// bot status (NL : Community is online!)
bot.on("ready", async () => {
        console.log(`RaceTopia bot is online!`);
        bot.user.setActivity("test.ip", { type: "PLAYING" });
});


// !hallo
bot.on('message', async message => {

        if (message.author.bot) return;
        if (message.channel.type === 'dm') return;
        var prefix = botConfig.prefix;
        var messageArray = message.content.split(' ');
        var command = messageArray[0];
        var arguments = messageArray.slice(1);
        var commands = bot.command.get(command.slice(prefix.length));
        if (commands) commands.run(bot, message, arguments);




}






);





        bot.on("guildMemberAdd", member => {
    
            const channel = member.guild.channels.cache.find(c => c.name == "👋welkom");
            if (!channel) console.log("Kan het kanaal niet vinden.");
    
            var joinEmbed = new discord.MessageEmbed()
                    .setAuthor(`Welkom ${member.user.tag}`)
                    .setDescription(`${member} Je kan op deze server van alles vinden! \n Wil je op onze MinecraftServer spelen? \n doe dan **__!ip__** in <#705028751477571625> \n Doe **__!help__** voor nog meer botcommand's \n Wil je gewoon gezellig chatten ga dan naar <#705028751477571626> \n\n heb je nog vragen? stel ze gerust in <#705028751687155738>`)
                    .setThumbnail(`https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/face-with-party-horn-and-party-hat_1f973.png`)
                    .setColor("RANDOM")
                    .setTimestamp()
                    .setFooter('Gemaakt door: Dani van Bussel', 'https://lh3.googleusercontent.com/-JubvaieWRSc/XoeJgjnRh8I/AAAAAAAAF_E/0zQNDI2_1AEYjdrYXBegO_IAcd_G-LE2QCEwYBhgL/w140-h139-p/20180712_091048.jpg');
    
            channel.send(joinEmbed);
    
    });




    bot.on("guildMemberRemove", member => {

        const channel = member.guild.channels.cache.find(c => c.name == "👋welkom");
        if (!channel) console.log("Kan het kanaal niet vinden.");

        var joinEmbed = new discord.MessageEmbed()
                .setAuthor(`${member.user.tag} Heeft ons verlaten!`)
                .setDescription(`We zullen ${member} missen!`)
                .setThumbnail(`https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/google/241/pleading-face_1f97a.png`)
                .setColor("#ff0000")
                .setTimestamp()
                .setFooter(`Gemaakt door: Dani van Bussel | Aantal server leden:`, message.guild.memberCount, 'https://lh3.googleusercontent.com/-JubvaieWRSc/XoeJgjnRh8I/AAAAAAAAF_E/0zQNDI2_1AEYjdrYXBegO_IAcd_G-LE2QCEwYBhgL/w140-h139-p/20180712_091048.jpg');

        channel.send(joinEmbed);

});



 




















bot.login(process.env.token);
