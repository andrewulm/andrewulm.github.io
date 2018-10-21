# LiriBot

Welcome to LiriBot. This is a node.js bot that will take in two arguments passed through your CLI. 

```
node liri [task to run] [term to search]
```
###### Task to Run:
* concert-this
* spotify-this-song
* movie-this
* do-what-it-says

###### Example:

**concert-this**

```
node liri concert-this Foo Fighters
```

*Results:*

![concert-this command](./screenshots/screenshot_concert-this.png)

------

###### Example:
**spotify-this-song**

```
node liri concert-this My Hero
```

*Results:*
![spotify-this-song](screenshots/screenshot_spotify-this.png)

------

###### Example:
**movie-this**

```
node liri movie-this Tenacious D
```

*Results:*
![spotify-this-song](screenshots/screenshot_movie-this.png)

###### Example:
**do-what-it-says**

This command will take whatever data is in the `random.txt` file and pass them through the bot as a `[task] [term]` pairing.

random.txt contents:
```
spotify-this-song,"I Want it That Way"
```

```
node liri do-what-it-says
```

*Results:*
![spotify-this-song](screenshots/screenshot_do-what.png)