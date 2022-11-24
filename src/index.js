//discord js imports
import {
    Client,
    REST,
    GatewayIntentBits,
    EmbedBuilder
} from "discord.js"
//this inits the global var for token, and guild id
import { config } from "dotenv"
config()
//here we import commands
import ExampleCommand from "./commands/ExampleCommand"

//token to use the bot
const token = process.env.TOKEN
//client id for later use
const client_id = process.env.CLIENT_ID
//guild id for also later use
const guild_id = 'insert server id bot is located in'
//new discord bot client
const client = new Client(
    {
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]
    }
)
//a new REST api to input commands & etc
const rest = new REST({ version: '10' }).setToken(token)
//when bot starts it sends message in terminal that it started
client.on('ready', () => console.log(`Example Bot launched! ${client.user.tag}`))
//this is for commands
client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'examplecommand') {
            //embed example
            let embed = new EmbedBuilder()
                //sets title of embed
                .setTitle('Example Embed')
                //adds fields to embed
                .addFields(
                    { name: 'Example Field', value: interaction.options.getString('exampletext') }
                )
            //reply
            interaction.reply({
                embeds: [embed]
            })
        }
    }
})

//function to add commands
async function main() {
    //array for commands
    const commands = [
        //init commands here
        ExampleCommand
    ]
    try {
        //log when commands start to get inputted into bot
        console.log('Started refreshing (/) commands')
        //put commands into the bot
        await rest.put(Routes.applicationGuildCommands(client_id, guild_id),
            {
                //input the commands
                body: commands,
            })
        //start the bot
        client.login(token)
        //incase this errors it logs it to console
    } catch (error) {
        console.error(error);
    }
}

//run the function for commands
main()