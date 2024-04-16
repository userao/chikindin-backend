import { SubscriberModel } from "./models.js";

async function subscribeUser(user) {
  const isSubscribedAlready = !!await SubscriberModel.findOne({
    where: { chatId: user.id }
  })
  
  if (isSubscribedAlready) {
    return !isSubscribedAlready;
  }

  await SubscriberModel.create({ ...user, chatId: user.id });
  return !isSubscribedAlready;
}

async function unsubscribeUser(user) {
  const isDeleted = !!await SubscriberModel.destroy({
    where: {
      chatId: user.id,
    },
  });

  return isDeleted;
}

function getSubscribers() {
  return SubscriberModel.findAll();
}

export { subscribeUser, unsubscribeUser, getSubscribers };
