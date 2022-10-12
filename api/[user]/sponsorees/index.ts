import { request } from "undici";
import { parse } from "node-html-parser";
import { VercelRequest as Rq, VercelResponse as Rs } from "@vercel/node";

const MAX_AGE = 86400;
const SPONSORING_URL = "https://github.com/$u?tab=sponsoring";

const handler = async (req: Rq, res: Rs) => {
  const user = req.query?.user as string;

  if (req.method !== "GET") {
    return res.status(405).send({ error: "Method not allowed" });
  }

  if (!user) {
    return res.status(400).send({ error: "You must provide the user" });
  }

  try {
    const { body } = await request(SPONSORING_URL.replace("$u", user));
    const text = await body.text();

    const html = parse(text);
    const sponsoring = html.querySelector("a[data-tab-item=sponsoring]");

    if (!sponsoring) {
      return res.status(200).send([]);
    }

    const users = html.querySelectorAll("a[data-hovercard-type=user]");
    let data = users.map((user) => user.getAttribute("href")?.substring(1));

    res.setHeader("Cache-Control", `s-maxage=${MAX_AGE}`);
    res.status(200).send(data);
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
};

export default handler;
