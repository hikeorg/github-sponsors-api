# GitHub Sponsors API

Unofficial GitHub Sponsors API

### Documentation

Checkout the [`openapi.yaml` source code](./src/openapi.yaml) or the Swagger UI for [more interactive documentation](https://petstore.swagger.io/?url=https%3A%2F%2Fgithub-sponsors-api.vercel.app%2Fapi).

### Local development

Make sure to create your `.env` file inside the repository root.

```env
SPONSORS_URL=https://github.com/sponsors/$u/sponsors_partial?filter=all&page=$p
SPONSORING_URL=https://github.com/$u?tab=sponsoring
```
