npm start
json-server --watch db.json (det är port 3000 på json)

Mina Figma bilder ligger här inne i en mapp i src


(((valda tekniska lösningar, och de utmaningar och lärdomar du stött på under projektets 
gång. Beskriv varför vissa beslut togs, hur de påverkade projektets utfall, och vilka insikter du fått som 
en framtida systemutvecklare.)))

Till att börja med så att jag ändå nöjd med att jag inte bestämde hela min design innan jag började koda. Visst har jag fått göra om saker under arbetets gång men det gör mig inget. Jag fick själslig ro av att göra det på mitt sätt även om det var krångligare och tog mer tid. Men på det viset så visste jag att jag skulle ha tid med allt i och med att jag jobbade med design och kod paralellt.

Det jag fortfarande behöver göra är att refaktorera en del kod. Jag har en massa useEffects som jag misstänker skulle kunna finnas i en custom hook, men det har jag inte hunnit sätta mig in i. Många av mina beslut har tagits av stress över att inte hinna färdigt. Vissa grejer borde jag ha gjort bättre från början, tex att se till att jag inte upprepar en massa kod men jag tänkte att det är bättre att få det gjort än att få det gjort bra. 

Sen blev det också så att jag gjorde sådant som jag tyckte var roligt för stunden. Jag hade ju haft tid att refaktorera lite kod om jag inte istället lärde mig att göra en timer som räknade ner, exempelvis.

Under presentationen så blev jag påminnd om att jag borde ha utvecklat projektet mobile first och det hade ju säkert underlättat mitt liv men återigen så är det stressen över att inte hinna klart som lagt käppar i hjulet så lärdomen blir väl att jag borde tänka efter före även när det gäller planeringen av min tid. Jag borde ju ha fattat att jag skulle ha tid till VG delen så jag borde ha planerat för det från början.

Som vanligt kan jag inte påstå att jag har något vettigt att säga om arkitektur och uppbyggnad annat än att jag är nöjd med att jag här på slutet ändå slog ihop tre komponenter till en genom att istället ha en återanvändbar som tar emot props från sina föräldrar. Dock är jag mindre nöjd med att jag inte använde localStorgae hooken till det som hade med sparandet av en inloggad user, för det borde jag väl ha gjort (?!?!) men jag glömde bort att den fanns.


