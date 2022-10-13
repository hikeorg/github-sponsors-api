export default function (github, C) {
  /**
   * @type import("express-openapi").OperationHandlerArray
   */
  const get = [
    async function (req, res) {
      const data = await github.sponsors(req.params.user, req.query.filter);

      res.setHeader('Cache-Control', `s-maxage=${C.MAX_AGE}`);
      return res.status(200).json({ data });
    },
  ];

  return { get };
}
