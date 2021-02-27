# The Wheel

To create your own bot with this code, you'll need nodejs, the discord.js package, and your bot token. Run the following command at your Linux/Unix shell:

```
WHEELBOT_TOKEN='your.token.here' node bot.js
```

## Commands

* `^show`: shows the current list of items on the wheel
* `^add {item text}`: adds an item to the list
* `^del {number}` or `^delete {number}`: deletes the item at the specified position
* `^spin`: "spins the wheel," outputting one random item from the list
* `^clean`: cleans up messages sent by the bot and command messages
