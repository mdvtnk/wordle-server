// api/send.js
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "2034395",
  key: "570abd9dffaf960c32a8",
  secret: "5b82b2ad98ecbaa79f9a",
  cluster: "eu",
  useTLS: true,
});

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { channel, event, data } = req.body;

  try {
    await pusher.trigger(channel, event, data);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "pusher error" });
  }
}
