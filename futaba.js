const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

client.login(config.token);

client.on("ready", () => {
  console.log("I am ready!");
});

const trueAdminIds = [
  "188824710010765312", //FroggyP
  "227946560095256576" //Intelligent Malfestio
]

const welcomeLines = [
  "You finally made it {}!",
  "Glad you could show up {}.",
  "{} on the scene!",
  "Looks like {} is here everybody!"
]

let palaceState = JSON.parse(fs.readFileSync("./palaceState.json", "utf8"));

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
      palaceChannel.send(welcomeLines[Math.floor(Math.random() * (welcomeLines.length - 0 + 1)) + 0].replace("{}",message.member))
      if(!palaceState["playerList"]) {
          palaceState["playerList"] = [];
      }
      if(!palaceState["players"]) {
        palaceState["players"] = {};
      }
      if(palaceState["playerList"].indexOf(message.member.id) < 0) {
        palaceState["playerList"].push(message.member.id);
        palaceState["players"][message.member.id] = {}
        fs.writeFile("./palaceState.json", JSON.stringify(palaceState), (err) => {
          if (err) console.error(err)
        });
      }
    }
  }

  if(message.content.startsWith("!palace")) {
    if(trueAdminIds.indexOf(message.member.id) >= 0) {
      console.log("This is a super admin, goodjob");

    }
  }

  if (message.content.startsWith("!logInfo")) {
    let role = message.guild.roles.find("name", "Stagehand");

    if(role && message.member.roles.has(role.id)) {
      console.log(palaceState)

    }
  }
});
