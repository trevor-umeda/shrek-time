const Discord = require("discord.js");
const client = new Discord.Client();

client.login("MzQyOTE3MzE5OTIxNjMxMjMy.DGWn6g.c-3WIigiosUno2w-RkeFkVyHw4w");

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }
});
