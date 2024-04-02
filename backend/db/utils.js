import { SubcriberModel } from "./models.js";

async function subscribeUser(user) {
  const isSubscribedAlready = !!await SubcriberModel.findOne({
    where: { chatId: user.id }
  })
  
  if (isSubscribedAlready) {
    return !isSubscribedAlready;
  }

  await SubcriberModel.create({ ...user, chatId: user.id });
  return !isSubscribedAlready;
}

async function unsubscribeUser(user) {
  const isDeleted = !!await SubcriberModel.destroy({
    where: {
      chatId: user.id,
    },
  });

  return isDeleted;
}

function getSubscribers() {
  return SubcriberModel.findAll();
}

export { subscribeUser, unsubscribeUser, getSubscribers };
