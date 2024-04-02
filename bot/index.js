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
    const { text } = message;
    const actionsMapping = {
      '/subscribe': async (chat) => {
        await subscribeUser(chat);
        return 'Вы подписались на рассылку анкет';
      },
      '/unsubscribe': async (chat) => {
        await unsubscribeUser(chat);
        return 'Вы отписались от рассылки анкет';
      },
    }
    const action = actionsMapping[text];
    const responseText = await action(message.chat);
    bot.sendMessage(message.chat.id, responseText);
  });
}

export { bot };
export default startBot;
