const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');

client.login('TOKEN');

let stream = null;

client.on('message', async message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content.startsWith('!play')) {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();

        const messageArgs = message.content.match(/(?:[^\s"]+|"[^"]*")+/g);
        console.log(messageArgs);

      stream = connection.play(ytdl(messageArgs[1], { filter: 'audioonly' }));
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }

  if (message.content.startsWith('!vol')) {
    const messageArgs = message.content.match(/(?:[^\s"]+|"[^"]*")+/g);

    stream.setVolume(messageArgs[1] / 100);
  }
});