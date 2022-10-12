import { request } from "undici";
import { parse } from "node-html-parser";
import { VercelRequest as Rq, VercelResponse as Rs } from "@vercel/node";
import { sponsors } from "../../../lib/api";

const MAX_AGE = 86400;
const SPONSORS_URL =
  "https://github.com/sponsors/$u/sponsors_partial?filter=all&page=$p";

const handler = async (req: Rq, res: Rs) => {
  const user = req.query?.user as string;

  if (req.method !== "GET") {
    return res.status(405).send({ error: "Method not allowed" });
  }

  if (!user) {
    return res.status(400).send({ error: "You must provide the user" });
  }

  try {
    const data = await sponsors(user);

    res.setHeader("Cache-Control", `s-maxage=${MAX_AGE}`);
    res.status(200).send(data);
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
};

export default handler;
