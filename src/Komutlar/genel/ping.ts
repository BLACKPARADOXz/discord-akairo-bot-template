import { Command } from "discord-akairo";
import { Message } from 'discord.js';

export default class extends Command {
   public constructor() {
        super("Ping", {
            aliases: ["ping"],
        })
    }

    exec(message: Message) {
        message.channel.send(`Pong ${this.client.ws.ping}ms`)
    }
}
