import tgAPI from "node-telegram-bot-api";
import "dotenv/config";
import { subscribeUser, unsubscribeUser } from "../backend/db/utils.js";

const bot = new tgAPI(process.env.TG_BOT_TOKEN, { polling: true });

function startBot() {
  bot.setMyCommands([
    { command: "/subscribe", description: "Подписаться на рассылку анкет" },
    { command: "/unsubscribe", description: "Отписаться от рассылки анкет" },
  ]);
  bot.on("message", async(message) => {
    console.log(message)
    const { text } = message;
    const actionsMapping = {
      '/start': () => 'Привет, я умею отправлять новые анкеты с сайта. Можешь подписаться командой /subscribe',
      '/subscribe': async (chat) => {
        const isSubscribed = await subscribeUser(chat);
        return isSubscribed ? 'Подписка активирована. Отписаться можно командой /unsubscribe' : 'Ты уже подписан.'
      },
      '/unsubscribe': async (chat) => {
        const isDeleted = await unsubscribeUser(chat);
        return isDeleted ? 'Подписка отменена.' : 'Ты не был подписан.';
      },
    }

    const action = actionsMapping[text];

    if (!action) {
      bot.sendMessage(message.chat.id, 'Я тебя не понимаю :(');
      return null;
    }

    const responseText = await action(message.chat);
    bot.sendMessage(message.chat.id, responseText);
  });
}

export { bot };
export default startBot;
