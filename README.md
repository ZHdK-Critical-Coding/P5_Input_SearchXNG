# SearXNG Search — p5.js

A text input and a search button. The query is sent to a SearXNG instance and the result urls are drawn as text on the canvas.

Ein Texteingabefeld und ein Such-Button. Die Suchanfrage wird an eine SearXNG-Instanz geschickt, die URLs der Resultate werden als Text auf die Leinwand gezeichnet.

## Configuration

```js
const SEARCH_URL = "http://brian3.hermi.lan:8888/search?q=";
```

`&format=json` is appended automatically. The JSON format must be enabled in SearXNG's `settings.yml`:

```yaml
search:
  formats:
    - html
    - json
```

## CORS

SearXNG does not send an `Access-Control-Allow-Origin` header. When the sketch runs in a browser (e.g. Live Server on `127.0.0.1:5500`), the request is blocked unless a reverse proxy in front of SearXNG adds the header, e.g. nginx:

```nginx
add_header Access-Control-Allow-Origin *;
```
