# GitHub Sponsors API

Unofficial GitHub Sponsors API

## Documentation

### Endpoints

#### GET `/api/:user/sponsors(?filter=active|inactive)`

```
200 ["bob", "alice"]
```

Returns an array of usernames with `active` (default) or `inactive` sponsors for `:user`

#### GET `/api/:user/sponsorees`

```
200 ["bob", "alice"]
```

Returns an array of usernames which are sponsored by `:user` username.

#### GET `/api/:user/sponsored/:by`

```
200 { "sponsored: true }
```

Given that `:user` is sponsored `:by` username.

```
404 { "sponsored": false }
```

Given that `:user` is NOT sponsored `:by` username.

#### GET `/api/:user/sponsoring/:who(?filter=active|inactive)`

```
200 { "sponsoring: true }
```

Given that `:user` is or was (depending on the `filter` value) sponsoring `:who` username.

```
404 { "sponsoring": false }
```

Given `:user` is not sponsoring `:who` username.

### Local development

Make sure to create your `.env` file inside the repository root.

```env
SPONSORS_URL=https://github.com/sponsors/$u/sponsors_partial?filter=all&page=$p
SPONSORING_URL=https://github.com/$u?tab=sponsoring
```
