import { SubcriberModel } from "./models.js";

function subscribeUser(user) {
  SubcriberModel.create({ ...user, chatId: user.id });
}

function unsubscribeUser(user) {
  SubcriberModel.destroy({
    where: {
      chatId: user.id,
    },
  });
}

export { subscribeUser, unsubscribeUser };
