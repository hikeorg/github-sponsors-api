export default function (github, C) {
  /**
   * @type import("express-openapi").OperationHandlerArray
   */
  const get = [
    async function (req, res) {
      const { filter } = req.query;
      const { user, sponsor } = req.params;

      const data = await github.sponsoring(sponsor, user, filter);
      const status = data ? 200 : 404;

      res.setHeader('Cache-Control', `s-maxage=${C.MAX_AGE}`);
      return res.status(status).send();
    },
  ];

  return { get };
}
