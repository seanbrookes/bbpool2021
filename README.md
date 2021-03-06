# bbpool2021
Annual friends baseball pool site.

It hosts 4 teams with protected rosters between seasons and then facilitates a draft before the season to fill out unprotected positions in each roster.

Players are mapped to player id properties from the mlb stats db.

On demand the latest stats are pulled from the api and a React context state store is created and cached for the duration of the visit.

Each roster is comprised of top players at each of the main positions scoring based on key stats
hitters: runs, hits, HR's, rbi, sb
starters: wins, losses, and k's
closers: wins, saves, k's

Hosted using Vercel app hosting - pretty slick

https://bbpool2021.vercel.app/
![pool screenshot](https://user-images.githubusercontent.com/1751524/124396823-ce6ccb00-dcc0-11eb-81cd-e390f6bb16f0.png)



https://github.com/seanbrookes/bbpool2021

https://vercel.com/seanbrookes/bbpool2021 

```
hiiter total calc:
      totalVal = (baseValObj.r) + (baseValObj.h / 2) + (baseValObj.rbi) + (baseValObj.hr * 2) + (baseValObj.sb / 2);

      starter totals:
       totalVal = ((baseValObj.w * 15) - (baseValObj.l * 4) + (baseValObj.k / 2));

       closer totals
           totalVal = (baseValObj.sv * 7) + (baseValObj.w * 6) + (baseValObj.k / 2) + (baseValObj.ip / 2);


```


special note of appreciation for mlb to be ok with small fish to access their stats api.
