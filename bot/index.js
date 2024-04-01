import tgAPI from 'node-telegram-bot-api';
import 'dotenv/config';

const bot = new tgAPI(process.env.TG_BOT_TOKEN, { polling: true });


function startBot() {
  bot.on('message', (message) => {
    const text = message.text;
    const chatID = message.chat.id;
    bot.sendMessage(chatID, message.text);
  })
}

export default startBot;