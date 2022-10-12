import { request } from "undici";
import { parse } from "node-html-parser";
import { VercelRequest as Rq, VercelResponse as Rs } from "@vercel/node";

const SPONSORS_URL = "https://github.com/sponsors";

const handler = async (req: Rq, res: Rs) => {
  const { user } = req.query;

  if (req.method !== "GET") {
    return res.status(405).send({ error: "Method not allowed" });
  }

  if (!user) {
    return res.status(400).send({ error: "You must provide the user" });
  }

  const { body } = await request(`${SPONSORS_URL}/${user}`);
  const text = await body.text();
  const html = parse(text);
};

export default handler;
