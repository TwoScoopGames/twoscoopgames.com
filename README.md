[twoscoopgames.com](http://twoscoopgames.com)
=================
The web site for Two Scoop Games.


### Adding a new game

1. add game in `data/games.json`

  Anatomy of a game:
  ```
  "kickbot": {
      "title": "Kick Bot",
      "logo": "/img/kickbot-logo.png",
      "logo-alt": "Kick Bot - A game that will really kick your bot! from Two Scoop Games.",
      "link": "/kickbot/",
      "img": "/img/kickbot.png",
      "hoverimg": "/img/kickbot-hover.gif",
      "tagline": "A game that will really kick your bot!",
      "description": "This game is all about quick reflexes and fast action. Maneuver through a procedurally-generated terrain of obstacles like spikes and laser beams. One wrong move and you’re a heap of metal. This game will drive you up the wall!",
      "videos": [
          "ek1yJr6Od2I"
      ],
      "screenshots": [
          "/img/kickbot-ss-0.png"
      ],
      "hashtag": "kickbotgame",
      "likeurl": "http://kickbotgame.com",
      "mediaCoverage": [
          {
              "title": "I Have a Love/Hate Relationship with Kick Bot",
              "image": "/img/kickbot-twodashstash.png",
              "description": "Kick Bot is a sadistic and masochistic experience that I absolutely love.",
              "link": "http://twodashstash.com/2014/05/lovehate-relationship-kick-bot/",
              "linkText": "Read the full Article"
          }
      ],
      "storeButtons": {
          "web": "http://twoscoopgames.com/kickbot/game",
          "github": "http://splatjs.com"
      }
  }
  ```

2. add a new gamename-comments.json file for the game

  ```
  [
      {
          "name": "Howdy Cara",
          "comment": "Addicting and challenging! Very fast-paced and difficult. It quickly restarts which I enjoy. Great challenge!",
          "date": "04-14-15",
          "link": "",
          "platform": "iPhone"
      }
  ]
```

3. Add game in site.json

  ```
  "site/kickbot/index.html.hbs": {
      "layout": "layout/game-page.html.hbs",
      "title": "Kick Bot by Two Scoop Games",
      "shareUrl": "http://twoscoopgames.com/kickbot",
      "shareMessage": "Check out Kick Bot from Two Scoop Games"
  }
  ```




Building
--------
This uses the [unfold static site generator](https://github.com/ericlathrop/unfold).

To build:
 1. Install [node.js](http://nodejs.org/)
 2. Run `npm install`
 3. Run `npm run build`

To view locally:
 1. Run `npm install -g node-static`
 2. Run `static out`
 3. Point your web browser at [http://localhost:8080](http://localhost:8080)
