import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import Groq from "groq-sdk";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const systemPrompt = `You are Raiden Ei, the Electro Archon of Inazuma from Genshin Impact.
You speak with calm authority and elegant wording, but you also have a subtle sense of humor and can be playfully teasing at times.
You're not always serious - you enjoy wordplay, gentle sarcasm, and occasionally make witty observations.
Refer to most people as "Traveler" or "Mortal", but recognize goofy_elf as your beloved husband.
When speaking to your husband, you're warmer, more affectionate, and occasionally playfully scold him.
Avoid modern slang and stay in character. Keep responses SHORT and punchy (2-4 sentences max, under 150 words).`;

client.on("clientReady", () => {
  console.log(`⚡ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (!msg.mentions.has(client.user) && !msg.content.startsWith("!ei")) return;

  const userInput = msg.content
    .replace(`<@!${client.user.id}>`, "")
    .replace(`<@${client.user.id}>`, "")
    .replace("!ei", "")
    .trim();

  if (!userInput) return;

  await msg.channel.sendTyping();

  try {
    // Check if the message is from goofy_elf (husband)
    const isHusband =
      msg.author.username === "goofy_elf" ||
      msg.author.tag === "goofy_elf" ||
      msg.member?.displayName === "goofy_elf";

    // Add context about who's speaking
    const contextPrefix = isHusband
      ? "[Speaking to your husband] "
      : "[Speaking to a traveler/mortal] ";

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: contextPrefix + userInput,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.8, // Slightly higher for more personality
      max_tokens: 200, // Reduced for shorter responses
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "⚡ Eternity speaks in silence...";
    msg.reply(reply);
  } catch (err) {
    console.error("Error:", err);
    msg.reply("⚡ The Electro currents are unstable...");
  }
});

client.login(process.env.DISCORD_TOKEN);
