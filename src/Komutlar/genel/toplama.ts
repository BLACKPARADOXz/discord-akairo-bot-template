const { Command } = require("discord-akairo");
const { Message } = require("discord.js");

module.exports = class extends Command {
    public constructor() {
        super("Toplama", {
            aliases: ["toplama"], 
            args: [
                {
                    id: "sayı1",
                    type: "number"
                },
                {
                    id: "sayı2",
                    type: "number"
                }
            ],
        })
    }

    /**
     * @param { Message } message 
     */

    exec(message, { sayı1,sayı2 }) {

        if (!sayı1) {
            message.channel.send("ilk sayıyı girmek zorunludur")
            return;
        }

        if (!sayı2) {
            message.channel.send("ikinci sayıyı girmek zorunludur")
            return;
        }

        message.channel.send(`${sayı1} + ${sayı1} = ${sayı1 + sayı2}`)

    }
}