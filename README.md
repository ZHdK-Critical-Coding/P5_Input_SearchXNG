# P5.js: SearXNG Search

[Deutsch](README_DE.md)

A text input and a search button. The query is sent to a SearXNG instance
and the result URLs are drawn as text on the canvas, each with small tags
for the search engines that found it. A starting point for using web search
results as input for a sketch.

## Installation

Requirements: a running [SearXNG](https://docs.searxng.org) instance that
is reachable from your computer, with the JSON format enabled and CORS
headers added (see below).

Set `SEARCH_URL` at the top of `sketch.js` to your instance:

```js
const SEARCH_URL = "http://brian3.hermi.lan:8888/search?q=";
```

### SearXNG configuration

`&format=json` is appended automatically. The JSON format must be enabled
in SearXNG's `settings.yml`:

```yaml
search:
  formats:
    - html
    - json
```

SearXNG does not send an `Access-Control-Allow-Origin` header. When the
sketch runs in a browser (e.g. Live Server on `127.0.0.1:5500`), the request
is blocked unless a reverse proxy in front of SearXNG adds the header, e.g.
nginx:

```nginx
add_header Access-Control-Allow-Origin *;
```

Libraries (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (included, not
used).

## How to Run

1. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).
2. Type a query and click **Search** or press Enter.

## Coding Help

- **`sketch.js` → `SEARCH_URL`**: search endpoint, the encoded query is
  appended to it.
- **`setup()`**: creates a full-window canvas, the text input and the
  **Search** button.
- **`keyPressed()`**: Enter also starts `search()`.
- **`search()`**: fetches `SEARCH_URL + query + "&format=json"` and keeps
  only `engines` and `url` of every result in `results`. The full response
  is logged to the console – look there for other fields (e.g. `title`,
  `content`) and add them to the `map()` call. Errors end up in `status`.
- **`draw()`**: prints `status` and then one line per result: a framed tag
  per engine, followed by the URL.
