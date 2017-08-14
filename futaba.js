const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.login(config.token);

client.on("ready", () => {
  console.log("I am ready!");
});

const excludeFrom = [
  "188824710010765312", //FroggyP
  "227946560095256576" //Intelligent Malfestio
]

client.on("message", (message) => {

  if (message.author.bot) return;

  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }

  if(message.content.match(/^(?=.*?ben)(?=.*?love live)(?=.*?church).*$/)) {
    let role = message.guild.roles.find("name", "Idol Thief");

    if(!message.member.roles.has(role.id)) {
      console.log(`Yay, the author of the message has the role!`);
      let palaceChannel = client.channels.find("name","palace");
      message.member.addRole(role).catch(console.error);
      palaceChannel.send("You finally made it "+message.member+"!")
    }
  }

  if (message.content.startsWith("!logInfo")) {
    let role = message.guild.roles.find("name", "Stagehand");

    if(role && message.member.roles.has(role.id)) {
      console.log(`Yay, the author of the message has the role!`);

    }
  }
});
