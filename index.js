require('events').EventEmitter.defaultMaxListeners = 15;
const config = require("./config.json");
const Discord = require("discord.js");
const bot = new Discord.Client({partials: ['MESSAGE', 'REACTION'] });
const Enmap = require('enmap');
const sha256 = require('js-sha256');
const sha512 = require('js-sha512');
const crypto = require('crypto');
const prefix = "!";
let serverseed = "293d5d2ddd365f54759283a8097ab2640cbe6f8864adc2b1b31e65c14c999f04";
let hashedseed = sha256(serverseed);
let clientseed = "ClientSeedForDiceSites.com";
let nonce = 0;
const hmac = crypto.createHmac('sha512', serverseed)
                   .update(String(clientseed-nonce))
                   .digest('hex');
console.log(
`Server Seed: ${serverseed}
Hashed Seed: ${hashedseed}
Client Seed: ${clientseed}
Hmac Value: ${hmac}
Nonce: ${nonce}`
)
bot.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
})
bot.userData = new Enmap({
  name: "userData",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
})
const userInfo = {
  osbal: 100000,
  rs3bal: 0,
  seed: "flame",
  private: false,
  anonchat: false
}

bot.on('messageReactionAdd', async (reaction, user) => {
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	// Now the message has been cached and is fully available
	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});

bot.on("ready" ,ready => {
  console.log('Bot is now Online.')
  let actions = [
    {type:2, mess: "Master Skem!"},
    {type:3, mess: "You gamble."}
  ];
  let number=0;
  setInterval(() => {
    let action = actions[number % 2]
    bot.user.setActivity(action.mess, { type: action.type })
    number++
  }, 5000)

  const puppeteer = require('puppeteer');
  const $ = require('cheerio');
  const url = 'https://www.sythe.org/threads/6rde-vouch-thread/';
  
  puppeteer
    .launch()
    .then(function(browser) {
      return browser.newPage();
    })
    .then(function(page) {
      return page.goto(url).then(function() {
        return page.content();
      });
    })
    .then(function(html) {
      const msgArr = [];
      $('.message', html).each(function() {
        msgArr.push({
          author: $(this).find('h3').text(),
          message: $(this).find('article').text()
        })
      });
      //bot.channels.get('697585832004944043').send(msgArr.message.replace('\n','') + msgArr.author.replace('\n',''))
      /*for(i=0;i<msgArr.length;i++){
      console.log(msgArr[i].author.replace('\n','') + msgArr[i].message.replace('\n',''))
      }*/
    })
    .catch(function(err) {
      console.log(err)
    });
});

bot.on("guildMemberAdd", member => {
  let welcomeMessages = [
    `${member} has joined the server.`,
    `${member}, welcome to Hell, where the Flames are real.`,
    `${member}, welcome to Flame Bets where we turn Frost into vapor.`,
    `Welcome ${member}, we only burn a little!`,
    `Welcome ${member}, enjoy the campfire at flame bets.`,
    `Welcome ${member}, time to defrost and warm up to flames!`
  ]
  bot.userData.ensure(member.user.id, userInfo);
  bot.channels.get("679912795621687332").send(welcomeMessages[Math.floor(Math.random()*welcomeMessages.length)]);
  member.send(`welcome to **Flame Bets**. If you have any questions please DM Skemicle#1604`);
  })

  

bot.on("message", async (message) => {
  var amount, disc, addAmnt, result, onoff, role; 
  if(message.author.bot) return;
  const args = message.content.split(/\s+/g);
  const command = args.shift().slice(prefix.length).toLowerCase();
  let member = getMember(message);
  let user = getUser(message);
  let key = user.id;
  let usercolor = member.displayHexColor;
  const embed = new Discord.RichEmbed();
  let adminRole = message.guild.roles.find(r => r.name === "Admin");
  var sendanon = [""];
  let modRole = message.guild.roles.find(r => r.name === "Manager");
  if (message.content.includes('discord.gg/'||'discordapp.com/invite/')){
    message.delete()
           .then(message.channel.send(`${message.author.username}, your link has been deleted:\n**Invite links are not permitted on this server**`))
  }
  if(message.channel.id === "692116922564870234"){
    message.delete();
    message.channel.send(message.content);
    bot.users.get("668177447358955553").send(`${message.author.username} sent: ${message.content}`)
  }
  if(message.content.indexOf(config.prefix) !== 0) return;
  switch(command){
    case "8ball":
    var responses = [
      {response: 'Absolutely.',
      color: "GREEN"},
      {response: 'Absolutely not.',
      color: "RED"},
      {response: 'It is true.',
      color: "GREEN"},
      {response: 'Impossible.',
      color: "RED"},
    'Of course.',
    'I do not think so.',
    'I dont know.',
    'It is not true.',
    'I am very undoubtful of that.',
    'I am very doubtful of that.',
    'Sources point to no.',
    'Theories prove it.',
    'Reply hazy try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'You may rely on it. ',
    'Yes. ',
    'No. ',
    'Could be.',
    'Ask a different question.',
    'I dont have an answer for that.',
    'Maybe you should ask others, not me.',
    'Of course no.',
    'I dont have an answer for that.',
    'Im not a big-brained maniac to answer that question.',
    'Probably.',
    'Im sure its Yes.',
    'Im sure its No.',
    'Ask again tomorrow.',
    'Ask that again next month.',
    'Ask that again next year.',
    'Go ask that question to your parents.',
    'Maybe.',
    'My reply is no.',
    'I cant tell you',
    'Its a secret'
  ][Math.floor(Math.random()*4)]
    embed.setTitle("8 Ball Answers")
    .setThumbnail('https://cdn.discordapp.com/emojis/650937581030342706.png?v=1')
    .addField(message.content.substring(6), responses.response)
    .setColor(responses.color)
    message.channel.send(embed);
    

    break;
    case "trivia":
      message.delete();
      var qmess;
      var cont = message.content.slice(8)
      var parts = cont.split("? ");
      let question = parts[0];
      let answer = parts[1].toLowerCase();
      if(parts.length>2){
      let reward = parts[2].split(" ");
      let prize = extended(reward[0].substring(0,reward[0].length-1));
      version = reward[1];
      if(version ==="07"){version = "osbal"}
      else{if(version === "rs3"){version = "rs3"}}
        bot.userData.math(message.author.id, '-', extended(reward[0]), version);
        qmess = `For a reward of ${reward[0]}:\n${question}?`;
      }else{qmess = `${question}?`;}
      message.channel.send(`${message.author.username} asks:\n${qmess}`);
      bot.users.get("229069137194909696").send(`${question}: ${answer}`)


      
        const collector = new Discord.MessageCollector(message.channel, m => m.content === answer, {max:1});
        console.log(collector)
        collector.on('collect', message => {
          if (message.content.toLowerCase() === answer){
              message.channel.send(`Correct answer by ${message.author.username}`);
              return;
          }
        })


      break;
    
    case "anon":
      if(args.length != 1){
      embed.setTitle("Syntax Error")
           .setColor("RED")
           .setDescription("Please use the syntax:\n`!anon <on/off>`");
      message.channel.send(embed);
      return}
      message.channel.send('this command is not quite ready atm.') 
      break;
    case "private":
      if(bot.userData.get(key, "private") === true){
        bot.userData.set(key, false, "private");
        onoff = "off";
      }else{
        bot.userData.set(key, true, "private");
        onoff = "on";
      }embed.setDescription(`${message.author.username} has turned their private setting to: \`${onoff}\``)
            .setColor(usercolor);
      message.channel.send(embed);
      break;
    case "roleall":
      role = message.mentions.roles.first();
      message.guild.members.forEach(member => {
        member.addRole(role);
      })
    break;
    case "w":
      bot.userData.ensure(key, userInfo);
      if(bot.userData.get(key, "private") === false){
        embed.setTitle(`${user.username}'s Wallet`)
             .setColor(usercolor)
             .addField("07", abrev(bot.userData.get(key, "osbal")), true)
             .addField("RS3", abrev(bot.userData.get(key, "rs3bal")), true)
             .setFooter(`Current client seed: ${bot.userData.get(key, "seed")}`);
        message.channel.send(embed);
      }else if(message.author.id === key){
        embed.setTitle(`${user.username}'s Wallet`)
             .setColor(usercolor)
             .addField("07", abrev(bot.userData.get(key, "osbal")), true)
             .addField("RS3", abrev(bot.userData.get(key, "rs3bal")), true)
             .setFooter(`Current client seed: ${bot.userData.get(key, "seed")}`);
        message.author.send(embed);
        message.react("📬");
      }else{
        embed.setColor(usercolor)
             .setDescription(`${user.username}'s wallet is set to private.`)
        message.channel.send(embed)
      }
      break;
    case "give":
        



      amount = parseInt(args[1].substring(0,args[1].length-1));
      disc = args[1].substring(args[1].length-1).toLowerCase();
      if(disc != "k" && disc != "m" && disc != "b"){
        amount = args[1];
        disc = "";
      }addAmnt = parseInt(extended(amount,disc));
      var version, game;
      if(args[2] === "07"){
        version = "osbal";
        game = "Old School"
      }if(args[2].toLowerCase() === "rs3"){
        version = "rs3bal"
        game = "Runescape"
      }if(addAmnt > bot.userData.get(message.author.id, version)){
        embed.setTitle("Insufficient Funds")
             .setDescription(`${message.author.username}, you cannot give more money than the you have.`)
             .setColor("RED");
            return message.channel.send(embed);
      }
      bot.userData.math(message.author.id, '-', addAmnt, version)
      bot.userData.math(key, '+', addAmnt, version);
      if(addAmnt <= 0){
          return message.channel.send(`You sent absoluteley nothing to ${message.mentions.users.first().username}.`)
      }embed.setTitle(`Money sent successfully.`)
            .setColor(usercolor)
            .setDescription(`${message.author.username} has sent the amount of ${abrev(addAmnt)} to ${user.username}'s ${game} wallet.`)
      message.channel.send(embed);



      break
    case "add":
      if (!message.member.roles.has(modRole.id)){
        embed.setColor("RED")
             .setTitle("Command Blocked")
             .setDescription(`${message.author.username}, You do not have the required role to use this command.`);
        return message.channel.send(embed)
      }
      bot.userData.ensure(key, userInfo);
      try{
      amount = parseInt(args[1].substring(0,args[1].length-1));
      disc = args[1].substring(args[1].length-1).toLowerCase();
      if(disc != "k" && disc != "m" && disc != "b"){
        amount = args[1];
        disc = "";
      }addAmnt = parseInt(extended(amount,disc));
      var version, game;
      if(args[2] === "07"){
        version = "osbal";
        game = "Old School"
      }if(args[2].toLowerCase() === "rs3"){
        version = "rs3bal"
        game = "Runescape"
      }if(addAmnt < 0 && Math.abs(addAmnt) > bot.userData.get(key, version)){
        embed.setTitle("Insufficient Funds")
             .setDescription(`${message.author.username}, you cannot remove more money than the user has.`)
             .setColor("RED");
            return message.channel.send(embed);
      }
      bot.userData.math(key, '+', addAmnt, version);
      if(addAmnt>0){
        var embedColor = "GREEN";
        var addremove = "added";
        var tofrom = "to";
      }if(addAmnt<0){
        var embedColor = "RED";
        var addremove = "removed";
        var tofrom = "from";
      }if(addAmnt == 0){
          return message.channel.send("You cannot add nothing to a wallet.")
      }embed.setTitle(`Money ${addremove}.`)
            .setColor(embedColor)
            .setDescription(`${message.author.username} has ${addremove} the amount of ${abrev(Math.abs(addAmnt))} ${tofrom} ${user.username}'s ${game} wallet.`)
      message.channel.send(embed);
    }catch (error){
      embed.setTitle("Something went wrong.")
           .setDescription("Please use the syntax:\n\`!add <@user> <amount> <version>\`")
           .setColor("RED")
      message.channel.send(embed)}
      break;
    case "seed":
      key = message.author.id;
      bot.userData.set(key, args.join(""), "seed");
      embed.setTitle("Seed Changed")
           .setDescription(`${message.author.username}, you have set your seed to ${bot.userData.get(key, "seed")}`)
           .setColor(usercolor);
      message.channel.send(embed);
      break;
    case "pfp":
      embed.setTitle(`${user.username}'s profile image:`)
           .setImage(user.avatarURL)
           .setColor(usercolor);
      message.channel.send(embed);
      break;
    case "reset":
      if (!message.member.roles.has(modRole.id) && message.author.id !== key){
        embed.setColor("RED")
             .setTitle("Command Blocked")
             .setDescription(`${message.author.username}, You do not have the required role to use this command.`);
        return message.channel.send(embed)
      }
      bot.userData.set(key, 10000000, "osbal")
      bot.userData.set(key, 50000000, "rs3bal")
      embed.setTitle("Wallet Reset")
      .setDescription(`${user.username}'s wallet has been reset`)
      .setColor(usercolor);
      message.channel.send(embed)
      break;
    case "ss":
      /*let init = message.author.username;
      if(!message.mentions.users.first()){var opponent = "Flame Bets"}else{opponent = user.username}
      let userPID = Math.floor(Math.random()*100)+1;
      let opponentPID = Math.floor(Math.random()*100)+1;
      embed.setTitle(`Simulated Stake between ${init} (PID:${userPID}) and ${opponent} (PID:${opponentPID}):`)
           .setColor(usercolor);
      message.channel.send(embed).then(async msg => {
        setInterval(async function() {

          embed.setDescription(`${init} has hit for: ${Math.floor(Math.random()*12)+1} and ${opponent} has hit for: ${Math.floor(Math.random()*12)+1}`)
          await msg.edit(embed);
          embed.setDescription(`${init} has hit for: ${Math.floor(Math.random()*12)+1} and ${opponent} has hit for: ${Math.floor(Math.random()*12)+1}`)
          await msg.edit(embed);
          embed.setDescription(`${init} has hit for: ${Math.floor(Math.random()*12)+1} and ${opponent} has hit for: ${Math.floor(Math.random()*12)+1}`)
          await msg.edit(embed);

        })})
      */
     message.channel.send("Sorry, but this command is not quite ready just yet.")

      break;
      
    case "suggest":
      let suggestID = randomString(6).toLowerCase();
      let suggestion = message.content.slice(9);
      message.guild.createChannel(`suggestion-debate-${suggestID}`, "text").then(async chan =>{
      embed.setColor(usercolor)
           .setTitle(`Suggestion ID: ${suggestID}`)
           .setDescription(`${suggestion}\n\nThis suggestion can be discussed in ${chan}`)
           .setFooter(`Suggestion submitted by ${message.author.username}.`);
      bot.channels.get("680296180864909342").send(embed).then(async embedMessage => {
        await embedMessage.react('👍');
        await embedMessage.react('👎');
        await chan.send(`${message.author.username} has suggested ${suggestion}. Please discuss only this topic in this channel.\nYou may vote on this suggestion at http://discordapp.com/channels/667584467132481567/680296180864909342/${embedMessage.id}`);
        await message.channel.send(`${message.author.username}, Your suggestion has been submitted succesfully at http://discordapp.com/channels/667584467132481567/680296180864909342/${embedMessage.id}\nYou may discuss this suggestion at: ${chan}.`);
  })});
      
      break;
    case "embed":
      var cont = message.content.slice(7)
      var parts = cont.split(", ");
      if(parts.length != 2){
        embed.setColor("RED")
             .setTitle("Syntax Error")
             .setDescription(`${message.author.username}, please use the syntax:\n\`!embed <embed title>, <embed description>.`);
        return message.channel.send(embed)
      }
      embed.setTitle(parts[0])
           .setColor(usercolor)
           .setDescription(parts[1])
           .setFooter(`Embed created by ${message.author.username}.`)
           .setTimestamp()
      message.delete();
      message.channel.send(embed);
      break;
    case "roll":
      roll(100,message);
      embed.setColor(usercolor)
           .setTitle("100 sided dice roll:")
           .setDescription(`${message.author.username}, You have rolled a ${abrev(result)}.`);
           message.channel.send(embed);
      break;
    case "dd":
      result = roll(12, message);
      embed.setColor(usercolor)
           .setTitle("12 sided dice roll:")
           .setDescription(`${message.author.username}, You have rolled a ${result}.`);
           message.channel.send(embed);
      break;
    case "delete":
      if(message.channel.id === "692116922564870234") return;
      if (!message.member.roles.has(adminRole.id)){
        embed.setColor("RED")
             .setTitle("Command Blocked")
             .setDescription(`${message.author.username}, You do not have the required role to use this command.`);
        return message.channel.send(embed)
      }var amnt;
      var deleted;
      var plural;
      if(!args[0]){
        amnnt = 2;
        plural = "message";
      }else{
        amnt = parseInt(args[0]) +1;
        plural = "messages";
      }
      deleted = amnt - 1;
      try{
        message.channel.bulkDelete(amnt).then(() => {
        message.channel.send(`Deleted ${deleted} ${plural}.`).then(msg => msg.delete(3000));
      })}catch(error){
        embed.setDescription("Please use a number between 1 and 100")
             .setColor(message.member.displayHexColor);
        message.channel.send(embed);
      }
      break;
      case "55":
        try{
          amount = args[0].slice(0,args[0].length-1);
          multiplier = args[0].slice(args[0].length-1);if(isFinite(multiplier)){
            amount = args[0];
          }
          bid = parseInt(extended(amount, multiplier));
          if(args[1] === "07"){version = 'osbal'}
          else if(args[1].toLowerCase() === "rs3"){version = 'rs3bal'}
          if(bid > bot.userData.get(message.author.id, version)){
            embed.setTitle("Insufficient balance:")
                 .setColor("RED")
                 .setDescription(`${message.author.username}, you cannot bid more than you have.`)
                 .setFooter("Please check your wallet and try again.")
            message.channel.send(embed);
            return;
          }
          result = roll(100)
          if(result >= 55){
            bot.userData.math(message.author.id, '+', bid, version);
            wonlost = "won";
            gratsGL = "Congratulations!";
            embedColor = "GREEN";
          }else{
            bot.userData.math(message.author.id, '-', bid, version);
            wonlost = "lost";
            gratsGL = "Better luck next time.";
            embedColor = "RED"
          }
          embed.setTitle(`${message.author.username}'s Roll:`)
               .setColor(embedColor)
               .setDescription(`You have rolled a ${result} and have ${wonlost} ${abrev(bid)}!`)
               .setFooter(gratsGL)
          message.channel.send(embed);
          }catch{
            embed.setColor("RED")
                 .setTitle("Incorrect syntax:")
                 .setDescription("Please use the syntax:\n`!55 <amount> <version>`")
            message.channel.send(embed);
          }
      break;
    case "45":
      try{
        amount = args[0].slice(0,args[0].length-1);
        multiplier = args[0].slice(args[0].length-1);if(isFinite(multiplier)){
          amount = args[0];
        }
        bid = parseInt(extended(amount, multiplier));
        if(args[1] === "07"){version = 'osbal'}
        else if(args[1].toLowerCase() === "rs3"){version = 'rs3bal'}
        if(bid > bot.userData.get(message.author.id, version)){
          embed.setTitle("Insufficient balance:")
               .setColor("RED")
               .setDescription(`${message.author.username}, you cannot bid more than you have.`)
               .setFooter("Please check your wallet and try again.")
          message.channel.send(embed);
          return;
        }
        result = roll(100)
        if(result <= 45){
          bot.userData.math(message.author.id, '+', bid, version);
          wonlost = "won";
          gratsGL = "Congratulations!";
          embedColor = "GREEN";
        }else{
          bot.userData.math(message.author.id, '-', bid, version);
          wonlost = "lost";
          gratsGL = "Better luck next time.";
          embedColor = "RED"
        }
        embed.setTitle(`${message.author.username}'s Roll:`)
             .setColor(embedColor)
             .setDescription(`You have rolled a ${result} and have ${wonlost} ${abrev(bid)}!`)
             .setFooter(gratsGL)
        message.channel.send(embed);
        }catch{
          embed.setColor("RED")
               .setTitle("Incorrect syntax:")
               .setDescription("Please use the syntax:\n`!45 <amount> <version>`")
          message.channel.send(embed);
        }
    break;
    case "25":
      try{
        amount = args[0].slice(0,args[0].length-1);
        multiplier = args[0].slice(args[0].length-1);if(isFinite(multiplier)){
          amount = args[0];
        }
        bid = parseInt(extended(amount, multiplier));
        if(args[1] === "07"){version = 'osbal'}
        else if(args[1].toLowerCase() === "rs3"){version = 'rs3bal'}
        if(bid > bot.userData.get(message.author.id, version)){
          embed.setTitle("Insufficient balance:")
               .setColor("RED")
               .setDescription(`${message.author.username}, you cannot bid more than you have.`)
               .setFooter("Please check your wallet and try again.")
          message.channel.send(embed);
          return;
        }
        result = roll(100)
        if(result <= 25){
          bid = bid * 2;
          bot.userData.math(message.author.id, '+', bid, version);
          wonlost = "won";
          gratsGL = "Congratulations!";
          embedColor = "GREEN";
        }else{
          bot.userData.math(message.author.id, '-', bid, version);
          wonlost = "lost";
          gratsGL = "Better luck next time.";
          embedColor = "RED"
        }
        embed.setTitle(`${message.author.username}'s Roll:`)
             .setColor(embedColor)
             .setDescription(`You have rolled a ${result} and have ${wonlost} ${abrev(bid)}!`)
             .setFooter(gratsGL)
        message.channel.send(embed);
        }catch{
          embed.setColor("RED")
               .setTitle("Incorrect syntax:")
               .setDescription("Please use the syntax:\n`!25 <amount> <version>`")
          message.channel.send(embed);
        }
    break;
    case "75":
      try{
        amount = args[0].slice(0,args[0].length-1);
        multiplier = args[0].slice(args[0].length-1);if(isFinite(multiplier)){
          amount = args[0];
        }
        bid = parseInt(extended(amount, multiplier));
        if(args[1] === "07"){version = 'osbal'}
        else if(args[1].toLowerCase() === "rs3"){version = 'rs3bal'}
        if(bid > bot.userData.get(message.author.id, version)){
          embed.setTitle("Insufficient balance:")
               .setColor("RED")
               .setDescription(`${message.author.username}, you cannot bid more than you have.`)
               .setFooter("Please check your wallet and try again.")
          message.channel.send(embed);
          return;
        }
        result = roll(100)
        if(result >= 75){
          bid = bid * 2;
          bot.userData.math(message.author.id, '+', bid, version);
          wonlost = "won";
          gratsGL = "Congratulations!";
          embedColor = "GREEN";
        }else{
          bot.userData.math(message.author.id, '-', bid, version);
          wonlost = "lost";
          gratsGL = "Better luck next time.";
          embedColor = "RED"
        }
        embed.setTitle(`${message.author.username}'s Roll:`)
             .setColor(embedColor)
             .setDescription(`You have rolled a ${result} and have ${wonlost} ${abrev(bid)}!`)
             .setFooter(gratsGL)
        message.channel.send(embed);
        }catch{
          embed.setColor("RED")
               .setTitle("Incorrect syntax:")
               .setDescription("Please use the syntax:\n`!75 <amount> <version>`")
          message.channel.send(embed);
        }
    break;
    case "cmds":
      message.channel.send("***List of commands:***\ntrivia, anon, w, add, seed, pfp, reset, ss, suggest, embed, roll, dd, delete, 45, 25, 55, 75, shutdown, ban, kick")
      break;
    case "shutdown":
      if (!message.member.roles.has(adminRole.id)){
        embed.setColor("RED")
             .setTitle("Command Blocked")
             .setDescription(`${message.author.username}, You do not have the required role to use this command.`);
        return message.channel.send(embed)
      }
      break;
    case "showsettings":
      break;
    case "ban":
      if (!message.member.roles.has(modRole.id)){
        embed.setColor("RED")
             .setTitle("Command Blocked")
             .setDescription(`${message.author.username}, You do not have the required role to use this command.`);
        return message.channel.send(embed)
      }
      message.delete();
      var reason = args.join(" ").substring(args[0].length);
      if(!reason){reason = " no reason."}
      user.send(`${message.author.username} has banned you for${reason}`).then(async function f1() {
       await message.mentions.members.first().ban();
      })
      break;
      case "softban":
        if (!message.member.roles.has(modRole.id)){
          embed.setColor("RED")
               .setTitle("Command Blocked")
               .setDescription(`${message.author.username}, You do not have the required role to use this command.`);
          return message.channel.send(embed)
        }
        message.delete();
        var reason = args.join(" ").substring(args[0].length);
        if(!reason){reason = " no reason."}
        user.send(`${message.author.username} has soft-banned you for${reason}`).then(async function () {
          let unbanid = message.mentions.members.first().id
         await message.mentions.members.first().ban(7).then((member) => {
           message.guild.unban(unbanid)
         });
        })

      break;

    case "kick":
      if (!message.member.roles.has(modRole.id)){
        embed.setColor("RED")
             .setTitle("Command Blocked")
             .setDescription(`${message.author.username}, You do not have the required role to use this command.`);
        return message.channel.send(embed)
      }
      message.delete();
      reason = args.join(" ").substring(args[0].length);
      if(!user.bot){
        user.send(`${message.author.username} has kicked you for:${reason} please reread our ToS if you decide to rejoin.`).then(async function f1() {
        await message.mentions.members.first().kick(reason);
      })}else{
        message.mentions.members.first().kick(reason);
      }
        break;
  }
});
function randomString(length) {
  const availableChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = '';
  for(let i = 0; i < length; i++) {
    randomString += availableChars[Math.floor(Math.random() * availableChars.length)];
  }
  return randomString;
}
function roll(max){
  result = Math.floor(Math.random()*max) +1;
      return result;
}
function getUser(msg){
  if(!msg.mentions.users.first()){
    user = msg.author;
    return user
  }else{
    user = msg.mentions.users.first();
    return user
  };
}
function getMember(msg){
  if(!msg.mentions.members.first()){
    member = msg.member;
    return member
  }else{
    member = msg.mentions.members.first();
    return member
  };
}
function extended(amount,disc){
  switch(disc){
    case "b":
      amount = amount*1000000000;
      break;
    case "m":
      amount = amount*1000000;
      break;
    case "k":
      amount = amount*1000;
      break;
  }return amount;
}
function abrev(amount){
  var disc;
  if(amount >= 1000000000){
    amount = amount/1000000000;
    disc = "b";
  }else{
    if(amount >= 1000000){
      amount = amount/1000000;
      disc = "m";
    }else{
      if(amount >= 1000){
        amount = amount/1000;
        disc = "k";
      }else{
        disc = "";
      }
    }
  }
return Math.floor(amount) + disc}

bot.login(config.token)