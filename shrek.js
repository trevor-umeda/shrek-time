const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

client.login(config.token);

client.on("ready", () => {
  console.log("I am ready!");
  client.user.setGame("All Star")
});

const trueAdminIds = [
  "188824710010765312", //FroggyP
  "227946560095256576" //Intelligent Malfestio
]

const shrekTimeInHours = 1.583
const shrekTimeInMinutes = 95

client.on("message", (message) => {
  // console.log("Test message for guild name " + message.guild.name);
  if (message.author.bot) return;

  if(message.content.startsWith("!convert")) {
    const args = message.content.split(/\s+/g).slice(1);
    if(message.content.indexOf("hour") >= 0) {
      var time =  (parseFloat(args[0]) / 95 ) * 60
      message.channel.send(time + " shreks!");
    }
    else if(message.content.indexOf("minute") >= 0) {
      var time =  (parseFloat(args[0]) / 95 )
      message.channel.send(time + " shreks!");
    }
    else if(message.content.indexOf("second") >= 0) {
      var time =  (parseFloat(args[0]) / 95 ) / 60
      message.channel.send(time + " shreks!");
    }
    else if(message.content.indexOf("day") >= 0) {
      var time =  (parseFloat(args[0]) / 95 ) * 60 * 24
      message.channel.send(time + " shreks!");
    }
    else if(message.content.indexOf("week") >= 0) {
      var time =  (parseFloat(args[0]) / 95 ) * 60 * 24 * 7
      message.channel.send(time + " shreks!");
    }
    else if(message.content.indexOf("year") >= 0) {
      var time =  (parseFloat(args[0]) / 95 ) * 60 * 24 * 365
      message.channel.send(time + " shreks!");
    }
  }

  if (message.content.startsWith("!mimic")) {
      let mainChannel = client.channels.find("name","test");
      console.log(message.content.substr(message.content.indexOf(" ") + 1))
      mainChannel.send(message.content.substr(message.content.indexOf(" ") + 1))
  }
});
