import { SlashCommandBuilder } from "discord.js";

const ExampleCommand = new SlashCommandBuilder()
    //this adds a name to run the command in a server
    .setName('examplecommand')
    //this sets a description for this command
    .setDescription('Example Command')
    //this adds a string option for the bot to use later
    .addStringOption('exampletext')

//this is to make it so that it inits in index.js
export default ExampleCommand.toJSON()