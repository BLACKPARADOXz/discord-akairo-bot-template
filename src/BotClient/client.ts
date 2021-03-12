import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { red } from 'colorette'
import fs from 'fs';
import { join } from 'path';
import YAML from "yawn-yaml/cjs";
const ayar = new YAML(fs.readFileSync("../ayarlar.yaml").toString()).json;

export default class BotClient extends AkairoClient {
    config = ayar
    commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, '..', 'Komutlar'),
        prefix: async(message) => {
            return ayar.bot.prefix;
        },
        aliasReplacement: /-/g,
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 3e5,
        defaultCooldown: 3000,
        argumentDefaults: {
            prompt: {
                modifyStart: (_, str) => `${str}\n\nKomuttan çıkmak için \`iptal\` yazın...`,
                modifyRetry: (_, str) => `${str}\n\nKomuttan çıkmak için \`iptal\` yazın...`,
                timeout: `Sanırım çok uzun sürdü, komut iptal edildi.`,
                ended: `3'ten fazla denemeye rağmen hala tam olarak anlayamadınız. Komut iptal edildi.`,
                cancel: `Komut iptal edildi.`,
                cancelWord: "iptal",
                retries: 3,
                time: 30000,
            },
            otherwise: '',
        },
    });

    listenerHandler = new ListenerHandler(this, { directory: join(__dirname, '..', 'Eventler') });

    constructor() {
        super({ ownerID: ayar.bot.sahipler }, {
            messageCacheMaxSize: 1000,
            partials: ['MESSAGE', 'REACTION'],
            disableMentions: 'everyone',
        });


        process.on('unhandledRejection', (err) => console.error(err));
    }

    async setup() {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
        });

        this.commandHandler.loadAll()
        console.log(`Command handler yüklendi.`)
        this.listenerHandler.loadAll()
        console.log(`Event Handler yüklendi.`)
    }

    async start() {
        await this.setup();
        return this.login(ayar.bot.token).then(() => {}).catch(() => console.log(red("Config.yaml' da geçerli bir token girmeniz gerekiyor.")))
    }

}

