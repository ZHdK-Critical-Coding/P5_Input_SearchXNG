# P5.js: SearXNG Search

[English](README.md)

Ein Texteingabefeld und ein Such-Button. Die Suchanfrage wird an eine
SearXNG-Instanz geschickt, die URLs der Resultate werden als Text auf die
Zeichenfläche gezeichnet, jeweils mit kleinen Tags für die Suchmaschinen,
die sie gefunden haben. Ein Ausgangspunkt, um Websuch-Resultate als Input
für einen Sketch zu verwenden.

## Installation

Voraussetzungen: eine laufende [SearXNG](https://docs.searxng.org)-Instanz,
die vom eigenen Computer aus erreichbar ist, mit aktiviertem JSON-Format und
CORS-Headern (siehe unten).

1. `SEARCH_URL` oben in `sketch.js` auf die eigene Instanz setzen:
   ```js
   const SEARCH_URL = "http://brian3.hermi.lan:8888/search?q=";
   ```
2. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).
3. Einen Suchbegriff eingeben und auf **Search** klicken oder Enter drücken.

### SearXNG-Konfiguration

`&format=json` wird automatisch angehängt. Das JSON-Format muss in der
`settings.yml` von SearXNG aktiviert sein:

```yaml
search:
  formats:
    - html
    - json
```

SearXNG schickt keinen `Access-Control-Allow-Origin`-Header. Läuft der
Sketch im Browser (z. B. Live Server auf `127.0.0.1:5500`), wird die Anfrage
blockiert, ausser ein Reverse Proxy vor SearXNG ergänzt den Header, z. B.
nginx:

```nginx
add_header Access-Control-Allow-Origin *;
```

Bibliotheken (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (eingebunden,
nicht verwendet).

## Coding-Hilfe

- **`sketch.js` → `SEARCH_URL`**: Such-Endpunkt, die kodierte Suchanfrage
  wird angehängt.
- **`setup()`**: erstellt eine fensterfüllende Zeichenfläche, das
  Texteingabefeld und den Knopf **Search**.
- **`keyPressed()`**: Enter startet ebenfalls `search()`.
- **`search()`**: ruft `SEARCH_URL + query + "&format=json"` ab und behält
  von jedem Resultat nur `engines` und `url` in `results`. Die ganze Antwort
  wird in der Konsole ausgegeben – dort nach weiteren Feldern schauen (z. B.
  `title`, `content`) und sie im `map()`-Aufruf ergänzen. Fehler landen in
  `status`.
- **`draw()`**: schreibt `status` und dann eine Zeile pro Resultat: einen
  umrandeten Tag pro Suchmaschine, gefolgt von der URL.
