import startBot from "./bot/index.js";
import startApp from "./backend/index.js";

console.log(process.env.NODE_ENV)
startApp();
startBot();
