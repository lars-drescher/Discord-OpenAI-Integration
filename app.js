// imports
import { Client, GatewayIntentBits, AttachmentBuilder } from "discord.js"
const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages
    ], partials: [0, 1]
})
import "dotenv/config"
import OpenAI from "openai"
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
})
import axios from "axios"
import fs from "node:fs"
import { UsageCounter } from "./helper/usageCounter.js"


// DiscordJS setup
client.login(process.env.DISCORD_TOKEN)
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity('type "bob-help" <promt>"')
})

// Commands
client.on("messageCreate", (msg) => {
  if (msg.author.bot) return
  const args = msg.content.split(" ")

  switch(args[0].toLowerCase()) {
    case "bob-usage":
      bobUsage(msg)
      break
    case "bob-help":
      bobHelp(msg)
      break
    case "bob":
      bobGPT(msg)
      break
    case "gpt-3":
      gpt3(msg)
      break
    case "gpt-4":
      gpt4(msg)
      break
    case "dall-e":
      dallE(msg)
      break
  }
})

// Loading config and personality
const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"))
const usageCounter = new UsageCounter(config)

/**
 * Logger
 * @param {string} username 
 * @param {string} model 
 */
function logger(username, model) {
  console.log(`${username} requestet ${model}`)
}

/**
 * Shows a help command
 */
async function bobHelp(msg) {
  msg.channel.send('"bob-usage" - Daily Usage \n"bob <promt>" - BOB \n"gpt-3 <promt>" - GPT3 Text Generation \n"gpt-4 <promt>" - GPT4 Text Generation\n"dall-e <promt>" - DALL-E Image Generation');
}

/**
 * Shows current usage
 */
async function bobUsage(msg) {
  const usage =  usageCounter.usage
  msg.channel.send(`GPT3: ${usage.gpt3Usage}\nGPT4: ${usage.gpt4Usage}\nDALL-E: ${usage.dallEUsage}\nDALL-E Lars: ${usage.dalleUsageLars}\n`);
}

/**
 * GPT-3 named bob with a personality
 */
async function bobGPT(msg) {
  const promt = msg.content.slice(4)

  const usage = usageCounter.gpt3Usage
  if (!usage) return msg.channel.send("Daily limit exceeded")

  logger(msg.author.username,"bob")

  try {

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: config.bobPersonality },
      { role: "user", content: promt}],
      model: "gpt-3.5-turbo",
    })

    let nachicht = replaceMessage(completion.choices[0].message.content)

    await msg.reply(nachicht)    
    msg.channel.send(`Daily Limit: [${usage}/${usageCounter.gpt3UsageLimit}]`)

  } catch (e) {
    console.error(e)
    msg.reply("internal error :(")
  }
}

// GPT-3 Command
async function gpt3(msg) {
  const promt = msg.content.slice(6)

  const usage = usageCounter.gpt3Usage
  if (!usage) return msg.channel.send("Daily limit exceeded")

  logger(msg.author.username,"gpt3")

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Du bist ein nützlicher Assistent. Fasse dich kurz" },
      { role: "user", content: promt}],
      model: "gpt-3.5-turbo",
    })

    await msg.reply(completion.choices[0].message.content)
    msg.channel.send(`Daily Limit: [${usage}/${usageCounter.gpt3UsageLimit}]`)
  } catch (e) {
    console.error(e)
    msg.reply("internal error :(")
  }
}

// GPT-4 Command
async function gpt4(msg) {
  const promt = msg.content.slice(6)

  const usage = usageCounter.gpt4Usage
  if (!usage) return msg.channel.send("Daily limit exceeded")

  logger(msg.author.username,"gpt4")

  try {

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Du bist ein nützlicher Assistent. Fasse dich kurz" },
      { role: "user", content: promt}],
      model: "gpt-4-1106-preview",
    })

    let nachicht = completion.choices[0].message.content + "[WARNUNG] GPT-4 kostet relativ viel"

    await msg.reply(nachicht)
    msg.channel.send(`Daily Limit: [${usage}/${usageCounter.gpt4UsageLimit}]`)
  } catch (e) {
    console.error(e)
    msg.reply("internal error :(")
  }
}

// Dall-e image generation
async function dallE(msg) {
  const promt = msg.content.slice(7)

  if (!usage) return msg.channel.send("Daily limit exceeded")

  logger(msg.author.username,"dalle")

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: promt,
      n: 1,
      size: "1024x1024",
    })
    const imgUrl = response.data[0].url;

    const file = await axios.get(imgUrl, {
      responseType: "arraybuffer"
    })

    const attachment = new AttachmentBuilder(file.data, { name: Date.now() + ".png", description: promt})

    await msg.reply({ files: [attachment] })
    msg.channel.send(`Daily Limit: [${usage}/${usageCounter.dalleUsageLimit}]`)

  } catch (e) {
    console.error(e)
    msg.reply("internal error :(")
  }
}
