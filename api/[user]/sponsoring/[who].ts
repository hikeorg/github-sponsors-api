import { VercelRequest as Rq, VercelResponse as Rs } from "@vercel/node";
import { Filter, FILTERS, sponsoring } from "../../../lib/api";

const MAX_AGE = 86400;

const handler = async (req: Rq, res: Rs) => {
  const who = req.query?.who as string;
  const user = req.query?.user as string;
  const filter = req.query?.filter as Filter;

  if (req.method !== "GET") {
    return res.status(405).send({ error: "Method not allowed" });
  }

  if (!user || !who) {
    return res.status(400).send({ error: "You must provide the user" });
  }

  if (filter && !FILTERS.includes(filter)) {
    return res
      .status(400)
      .send({ error: `Filter must be one of: ${FILTERS.join(", ")}` });
  }

  try {
    const data = await sponsoring(who, user, filter);
    const status = data ? 200 : 404;

    res.setHeader("Cache-Control", `s-maxage=${MAX_AGE}`);
    res.status(status).send({ sponsoring: data });
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
};

export default handler;
