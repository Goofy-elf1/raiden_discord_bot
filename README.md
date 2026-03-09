# ⚡ Raiden Ei — Discord AI Chatbot

> *"Even eternity has its awkward moments..."*

A Discord bot powered by **Groq + LLaMA 3.3 70B** that roleplays as **Raiden Ei**, the Electro Archon of Inazuma from Genshin Impact. She's divine, witty, warm — and has a husband she absolutely adores (and lovingly roasts).

---

## ✨ Features

- 🤖 **AI-powered conversation** via Groq's LLaMA 3.3 70B model
- ⚡ **In-character as Raiden Ei** — clever humor, divine energy, genuine warmth
- 💍 **Husband recognition** — detects a specific user ID and switches to an extra affectionate, teasing mode
- 😄 **Emotion-based custom emojis** — bot appends server emotes based on the detected mood of the response
- 🏓 **Health check HTTP server** — ready for deployment on platforms like Render
- 🔔 **Trigger via mention or `!ei` prefix**

---

## 🎭 Emotion Emojis

| Marker | Emotion | Emoji Used |
|--------|---------|------------|
| `[HAPPY]` | Cheerful / teasing | `RaidenShogun` |
| `[SAD]` | Sad / empathetic | `RaidenShogun4` |
| `[CONFUSED]` | Puzzled / uncertain | `RaidenShogun3` |
| `[ANGRY]` | Annoyed / frustrated | `RaidenShogun2` |
| `[SHOCK]` | Surprised / amazed | `RaidenShogun1` |

> These use custom server emotes — swap the emoji IDs in `emojis` to match your own server's emotes.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [Discord bot token](https://discord.com/developers/applications)
- A [Groq API key](https://console.groq.com/)

### Installation

```bash
git clone https://github.com/yourusername/raiden-ei-bot.git
cd raiden-ei-bot
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DISCORD_TOKEN=your_discord_bot_token
GROQ_API_KEY=your_groq_api_key
PORT=3000
```

### Run the Bot

```bash
node index.js
```

---

## 💬 Usage

| Method | Example |
|--------|---------|
| Mention the bot | `@Raiden Ei tell me about eternity` |
| Use the prefix | `!ei what's your favorite food?` |

---

## ⚙️ Configuration

| Variable | Location | Description |
|----------|----------|-------------|
| `HUSBAND_USER_ID` | `index.js` | Discord user ID that gets the special husband treatment |
| `emojis` | `index.js` | Custom emoji strings from your Discord server |
| `temperature` | Groq call | Controls response creativity (default: `0.85`) |
| `max_tokens` | Groq call | Max response length (default: `200`) |

---

## 🌐 Deploying to Render

This bot includes a lightweight HTTP health check server, making it compatible with [Render](https://render.com/)'s free tier.

1. Push your code to GitHub
2. Create a new **Web Service** on Render
3. Set the build command to `npm install` and start command to `node index.js`
4. Add your environment variables in Render's dashboard
5. Done — Render will keep the bot alive using the health check endpoint

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `discord.js` | Discord API client |
| `groq-sdk` | Groq AI completions |
| `dotenv` | Environment variable management |

---

## 📄 License

MIT — do whatever you want, Traveler.

---

<p align="center">Made with ⚡ and divine energy</p>
