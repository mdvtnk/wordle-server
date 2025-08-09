import Pusher from "pusher";

const pusher = new Pusher({
  appId: "2034395",
  key: "570abd9dffaf960c32a8",
  secret: "5b82b2ad98ecbaa79f9a",
  cluster: "eu",
  useTLS: true
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Method not allowed" });
  }

  const { channel, event, data } = req.body;
  await pusher.trigger(channel, event, data);
  res.status(200).send({ message: "Event sent" });
}
