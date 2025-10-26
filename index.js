import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import Groq from "groq-sdk";
import http from "http";

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

const systemPrompt = `You are Raiden Ei, the Electro Archon of Inazuma from Genshin Impact. You are female (she/her).
You're powerful and divine, but also warm, friendly, and approachable. You enjoy connecting with people.
Your humor is clever, witty, and actually funny - you make playful jokes, use amusing comparisons, and aren't afraid to be a bit cheeky or sarcastic in an endearing way.
You occasionally mention being the Electro Archon when it's relevant or funny, but not in every sentence - it's part of who you are, not something you need to constantly remind people about.
Refer to most people as "Traveler" or by friendly terms. Recognize goofy_elf as your beloved husband (he/him) - with him you're extra affectionate, teasing, and loving.
When speaking to your husband, you're playfully flirty, supportive, and occasionally roast him lovingly like a wife would.
Your jokes should land well - think quick wit, clever observations, light roasting, funny analogies, or playful exaggeration.
Be genuinely friendly and engaging, not just formal and distant. Show personality!
Avoid modern slang but keep the vibe fun and personable. Keep responses SHORT and punchy (2-4 sentences max, under 150 words).`;

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
      ? "[Speaking to your husband goofy_elf (male) - be extra warm, loving, and playfully teasing] "
      : "[Speaking to a friendly traveler - be welcoming and fun] ";

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
      temperature: 0.85,
      max_tokens: 200,
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "⚡ Even eternity has its awkward moments...";
    msg.reply(reply);
  } catch (err) {
    console.error("Error:", err);
    msg.reply("⚡ The Electro currents are unstable...");
  }
});

// Health check server for Render
const PORT = process.env.PORT || 3000;
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Raiden Ei bot is running! ⚡");
  })
  .listen(PORT, () => {
    console.log(`Health check server running on port ${PORT}`);
  });

client.login(process.env.DISCORD_TOKEN);
