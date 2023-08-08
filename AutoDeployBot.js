import { createRequire } from 'module'
import axios from 'axios'
const require = createRequire(import.meta.url)
const TelegramBot = require('node-telegram-bot-api')
const dotenv = require('dotenv')

const userMessageTime = new Map()

dotenv.config()
const token = process.env.TELEGRAM_BOT_TOKEN
const bot = new TelegramBot(token, { polling: true })
let nFlag = 0;
let nNetworkFlag = 0;
const SEPARATE_STRING = " ";

bot.onText(/(.+)/, async (msg, match) => {
  const chatId = msg.chat.id
  // Send a message with inline keyboard
  if(nFlag == 1 && nNetworkFlag > 0)
  {
    let queryData = match[0].split(SEPARATE_STRING);
    if(queryData.length != 3)
    {
      bot.sendMessage(chatId, 'Please Input Correctly.');
    }
    else
    {
      
    }
  }
})

bot.onText(/\/start/, async (msg, match) => {
  nFlag = nNetworkFlag = 0;
  const chatId = msg.chat.id
  const username = msg.from.username
  bot.sendMessage(chatId, 'Platform ERC20 Wallet Address:\n0xeD42a7b61d7Ad7fb413e5fDe470935D6DfD983B7');

  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Quick Deploy', callback_data: `btnQuickDeploy` }
        ],
        [
          { text: 'Transfer ETH', callback_data: `btnTransferETH`}
        ]
      ]
    }
  };

  // Send a message with inline keyboard
  bot.sendMessage(chatId, 'Choose one of the following options:', options);
})

// Handle callback queries from inline keyboard buttons
bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const queryData = query.data;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Ethereum', callback_data: `btnEthereum` }
        ],
        [
          { text: 'BSC', callback_data: `btnBSC`}
        ],
        [
          { text: 'Arbitrum', callback_data: `btnArbitrum`}
        ],
        [
          { text: 'Base', callback_data: `btnBase`}
        ]
      ]
    }
  };
  // Handle different button presses
  switch (queryData) {
    case 'btnQuickDeploy':
      nFlag = 1;
      bot.sendMessage(chatId, "Choose one of the following networks:", options)
      break;
    case 'btnTransferETH':
      nFlag = 2;
      bot.sendMessage(chatId, "Choose one of the following networks:", options)
      break;
    case 'btnEthereum':
      nNetworkFlag = 1;
      if(nFlag == 2)
      {
        bot.sendMessage(chatId, "Please transfer native currency to 0xeD42a7b61d7Ad7fb413e5fDe470935D6DfD983B7")
      }
      else if(nFlag == 1)
      {
        bot.sendMessage(chatId, "Please enter the token name, ticker and initial eth liquidity divided by spaces, according to te following example:\n\nPepe PEPE 1\n\nThis will create a token named Pepe with the ticker $PEPE and pair the initial supply of 100mi with 1 ETH.")
      }
      break;
    case 'btnBSC':
      nNetworkFlag = 2;
      if(nFlag == 2)
      {
        bot.sendMessage(chatId, "Please transfer native currency to 0xeD42a7b61d7Ad7fb413e5fDe470935D6DfD983B7")
      }
      else if(nFlag == 1)
      {
        bot.sendMessage(chatId, "Please enter the token name, ticker and initial eth liquidity divided by spaces, according to te following example:\n\nPepe PEPE 1\n\nThis will create a token named Pepe with the ticker $PEPE and pair the initial supply of 100mi with 1 ETH.")
      }
      break;
    case 'btnArbitrum':
      nNetworkFlag = 3;
      if(nFlag == 2)
      {
        bot.sendMessage(chatId, "Please transfer native currency to 0xeD42a7b61d7Ad7fb413e5fDe470935D6DfD983B7")
      }
      else if(nFlag == 1)
      {
        bot.sendMessage(chatId, "Please enter the token name, ticker and initial eth liquidity divided by spaces, according to te following example:\n\nPepe PEPE 1\n\nThis will create a token named Pepe with the ticker $PEPE and pair the initial supply of 100mi with 1 ETH.")
      }
      break;
    case 'btnBase':
      nNetworkFlag = 4;
      if(nFlag == 2)
      {
        bot.sendMessage(chatId, "Please transfer native currency to 0xeD42a7b61d7Ad7fb413e5fDe470935D6DfD983B7")
      }
      else if(nFlag == 1)
      {
        bot.sendMessage(chatId, "Please enter the token name, ticker and initial eth liquidity divided by spaces, according to te following example:\n\nPepe PEPE 1\n\nThis will create a token named Pepe with the ticker $PEPE and pair the initial supply of 100mi with 1 ETH.")
      }
      break;
  }
  bot.answerCallbackQuery(query.id);
});

if(bot.isPolling()) {
  await bot.stopPolling();
}
await bot.startPolling();