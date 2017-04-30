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


### Editing the presskit (presskitJS)

PresskitJS is based on the [presskit() by Rami Ismail](https://github.com/ramiismail/dopresskit) which is an incredible resource to the indie community by providing a snapshot of your studio and all the valuable information about it to the press it helps the whole process of being written about go smoother (and likely helps you get more coverage and for that coverage to be accurate).
I love the format and content of presskit() but I really wanted a version I could build along site the website with node whereas the original presskit() requires php. PresskitJS uses a small node app to compile a single presskit html page from a handlebars template and a json file.
* Edit the presskit date in `/presskit.json`
* Run `npm run build:presskit` to just build the presskit, or `npm run buuld` to build the main site then the presskit in one command

#### Future PresskitJS updates:

* Automatically create zip files of both `images` and 'logos' arrays
* Generate additional pages for each release game
* Solidify first version of stand-alone PresskitJS app
  * Write read me for PresskitJS
  * Check into licensing - might need to be GPL since presskit() is GPL
  * Create github repo for PresskitJS
  * Publish NPM module of PresskitJS



Building
--------
This uses the [unfold static site generator](https://github.com/ericlathrop/unfold).

To build:
 1. Install [node.js](http://nodejs.org/)
 2. Run `npm install`
 3. Run `npm run build`

To view locally:
 1. Run `npm install -g static-server`
 2. Run `static-server out`
 3. Point your web browser at [http://localhost:8080](http://localhost:9080)
