const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

client.login(config.token);

client.on("ready", () => {
  console.log("I am ready!");
  client.user.setGame("In the Metaverse")
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

const battleStartLines = [
  "A shadow has appeared!",
  "Incoming shadow. Be careful",
  "Enemy engaged"
]

const allOutGif = "http://i.giphy.com/3xz2BCSe49b6zJQSdO.gif"

let palaceState = JSON.parse(fs.readFileSync("./palaceState.json", "utf8"));

var postAllOutGif = function() {
  let palaceChannel = client.channels.find("name","palace");
  palaceChannel.send(allOutGif)
}

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
      palaceChannel.send(welcomeLines[Math.floor(Math.random() * (welcomeLines.length))].replace("{}",message.member))
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
      const args = message.content.split(/\s+/g).slice(1);
      if(args[0] && args[0] == "startFight") {
        let palaceChannel = client.channels.find("name","palace");
        // palaceChannel.send(battleStartLines[Math.floor(Math.random() * (welcomeLines.length))].replace("{}",message.member))
        console.log(battleStartLines[Math.floor(Math.random() * (battleStartLines.length))]);
        if(!palaceState["currentPlayerIndex"]) {
          palaceState["currentPlayerIndex"] = 0;
        }
        let currentPlayer = palaceState["currentPlayerIndex"];
        let currentPlayerId = palaceState["playerList"][currentPlayer];
        console.log("player " + currentPlayerId + " is up to bat");
        let currentPlayerUser = client.users.get(currentPlayerId)
        console.log(currentPlayerUser + " you are up");
        currentPlayer++;
        if(currentPlayer == palaceState["playerList"].length) {
          currentPlayer = 0;
        }
        palaceState["currentPlayerIndex"] = currentPlayer;
        fs.writeFile("./palaceState.json", JSON.stringify(palaceState), (err) => {
          if (err) console.error(err)
        });
      }
    }
  }

  if (message.content.startsWith("!logInfo")) {
    let role = message.guild.roles.find("name", "Stagehand");

    if(role && message.member.roles.has(role.id)) {
      console.log(palaceState)

    }
  }
});
