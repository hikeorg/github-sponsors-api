import { VercelRequest as Rq, VercelResponse as Rs } from "@vercel/node";
import { sponsoring } from "../../../lib/api";

const MAX_AGE = 86400;

const handler = async (req: Rq, res: Rs) => {
  const by = req.query?.by as string;
  const user = req.query?.user as string;

  if (req.method !== "GET") {
    return res.status(405).send({ error: "Method not allowed" });
  }

  if (!user || !by) {
    return res.status(400).send({ error: "You must provide the user" });
  }

  try {
    const data = await sponsoring(user, by);
    const status = data ? 200 : 404;

    res.setHeader("Cache-Control", `s-maxage=${MAX_AGE}`);
    res.status(status).send({ sponsored: Boolean(data) });
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
};

export default handler;
