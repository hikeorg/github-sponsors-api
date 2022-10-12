# GitHub Sponsors API

Unofficial GitHub Sponsors API

## Documentation

### Endpoints

#### `GET /api/:user/sponsors`

#### `GET /api/:user/sponsorees`

#### `GET /api/:user/sponsored/:by`

#### `GET /api/:user/sponsoring/:who`

### Local development

Make sure to create your `.env` file inside the repository root.

```env
SPONSORS_URL=https://github.com/sponsors/$u/sponsors_partial?filter=all&page=$p
SPONSORING_URL=https://github.com/$u?tab=sponsoring
```
