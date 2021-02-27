const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.WHEELBOT_TOKEN;

const bot_data = {};

function randInt(max) {
	return Math.floor(Math.random() * max);
}

function checkGuild(guild_id) {
	if (!(bot_data[guild_id])) {
		bot_data[guild_id] = [];
	}
}

function getItems(guild_id) {
	checkGuild(guild_id);
	return bot_data[guild_id];
}

function addItem(guild_id, arg) {
	checkGuild(guild_id);
	bot_data[guild_id].push(arg);
	return true;
}

function delItem(guild_id, n) {
	checkGuild(guild_id);
	if (bot_data[guild_id].length <= n) {
		return bot_data[guild_id].splice(n - 1, 1);
	} else {
		return false;
	}
}

function spin(guild_id) {
	checkGuild(guild_id);
	if (bot_data[guild_id].length > 0) {
		const i = randInt(bot_data[guild_id].length);
		return bot_data[guild_id][i];
	}
	return false;
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (msg) => {
	if (msg.content.startsWith("^") === false || msg.author.id === client.user.id) {
		return;
	}

	const words = msg.content.split(" ");
	const cmd = words.shift().substring(1).toLowerCase();
	const arg = words.join(" ");
	if (cmd === "show") {
		const items = getItems(msg.guild.id);
		if (items.length > 0) {
			var reply = "";
			var i;
			for (i = 0; i < items.length; i++) {
				reply = reply.concat(i+1, ". ", items[i], "\n");
			};

			msg.channel.send(reply)
				.catch(console.error);
		} else {
			msg.channel.send("No items to display!")
				.catch(console.error);
		}
	} else if (cmd === "add") {
		if (addItem(msg.guild.id, arg) === true) {
			msg.channel.send("Successfully added ".concat('"', arg, '"'))
				.catch(console.error);
		} else {
			msg.channel.send("Error adding ".concat('"', arg, '"'))
				.catch(console.error);
		}
	} else if (cmd === "del" || cmd === "delete") {
		itemNum = Number(arg);
		if (Number.isInteger(itemNum) === false) {
			msg.channel.send("Invalid item number: ".concat(arg))
				.catch(console.error);
			return;
		}
		const result = delItem(msg.guild.id, itemNum);
		if (result !== false) {
			msg.channel.send("Successfully deleted ".concat('"', result, '"'))
				.catch(console.error);
		} else {
			msg.channel.send("Error deleting item ".concat(arg))
				.catch(console.error);
		}
	} else if (cmd === "spin") {
		if (getItems(msg.guild.id).length > 0) {
			const result = spin(msg.guild.id);
			msg.channel.send("Result: ".concat(result));
		} else {
			msg.channel.send("Cannot spin empty wheel.");
		}
	} else if (cmd === "clean") {
		msg.channel.messages.cache.forEach((cache_msg, id, map) => {
			if (cache_msg.author.id === client.user.id ||
				cache_msg.content.startsWith("^")) {
				msg.channel.messages.delete(id)
					.catch(console.error);
			}
		});
	}
});

client.login(token);
