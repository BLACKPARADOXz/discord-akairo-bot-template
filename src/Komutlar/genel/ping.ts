import { Command } from "discord-akairo";
import { Message } from 'discord.js';

export default class extends Command {
   public constructor() {
        super("Ping", {
            aliases: ["ping"],
        })
    }

    /**
     * @param { Message } message 
     */

    exec(message) {
        message.channel.send(`Pong ${this.client.ws.ping}ms`)
    }
}