import { createRequire } from 'module'
import axios from 'axios'
const require = createRequire(import.meta.url)
const TelegramBot = require('node-telegram-bot-api')
const dotenv = require('dotenv')

const userMessageTime = new Map()

dotenv.config()
const token = process.env.TELEGRAM_BOT_TOKEN
const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/start (.+)/, async (msg, match) => {
  const chatId = msg.chat.id
  const username = msg.from.username
  bot.sendMessage(
    chatId, "Generating Image for @" + username
  )
})

if(bot.isPolling()) {
  await bot.stopPolling();
}
await bot.startPolling();