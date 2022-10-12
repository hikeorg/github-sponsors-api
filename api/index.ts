import { VercelApiHandler } from "@vercel/node";

const handler: VercelApiHandler = async (_, res) => {
  res.status(200).send({
    endpoints: [
      "GET /:user/sponsors",
      "GET /:user/sponsorees",
      "GET /:user/sponsored/:by",
      "GET /:user/sponsoring/:who",
    ],
  });
};

export default handler;
