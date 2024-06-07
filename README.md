
Kommandon ~~~~~~~~~~~~~~~~~~~~(json ligger på port 3000 så kör den först (?!?!))
json-server --watch db.json 
npm install
npm start


~~~~~~ Mina Figma bilder ligger här inne i en mapp i src ~~~~~~~~


ANALYS

Till att börja med så att jag ändå nöjd med att jag inte bestämde hela min design innan jag började koda. Visst har jag fått göra om saker under arbetets gång men det gör mig inget. Jag fick själslig ro av att göra det på mitt sätt även om det var krångligare och tog mer tid. Men på det viset så visste jag att jag skulle ha tid med allt i och med att jag jobbade med design och kod paralellt.

Det jag fortfarande behöver göra är att refaktorera en del kod. Jag har en massa useEffects som jag misstänker skulle kunna finnas i en custom hook, men det har jag inte hunnit sätta mig in i. Många av mina beslut har tagits av stress över att inte hinna färdigt. Vissa grejer borde jag ha gjort bättre från början, tex att se till att jag inte upprepar en massa kod men jag tänkte att det är bättre att få det gjort än att få det gjort bra. 

Sen blev det också så att jag gjorde sådant som jag tyckte var roligt för stunden. Jag hade ju haft tid att refaktorera lite kod om jag inte istället lärde mig att göra en timer som räknade ner.

Under presentationen så blev jag påminnd om att jag borde ha utvecklat projektet mobile first och det hade ju säkert underlättat mitt liv men återigen så är det stressen över att inte hinna klart som lagt käppar i hjulet så lärdomen blir väl att jag borde tänka efter före även när det gäller planeringen av min tid. Jag borde ju ha fattat att jag skulle ha tid till VG delen så jag borde ha planerat för det från början.

Som vanligt kan jag inte påstå att jag har något vettigt att säga om arkitektur och uppbyggnad annat än att jag är nöjd med att jag här på slutet ändå slog ihop tre komponenter till en genom att istället ha en återanvändbar som tar emot props från sina föräldrar. Dock är jag mindre nöjd med att jag inte använde localStorgae hooken till det som hade med sparandet av en inloggad user, för det borde jag väl ha gjort (?!?!) men jag glömde bort att den fanns.

Något jag börjar lära mig är att släppa saker som inte funkar och istället hitta på någon annan lösning. Jag höll på i evigheter med att försöka göra så att man inte kan komma vidare från payment om man har flera produkter i sin cart men en av dem har tomt i fältet för quantity. Jag lyckades inte fixa det på något bra sätt men jag fattar nu i alla fall att jag bara borde ha designat om det för att passa mina alternativa lösningar.

Summan av kardemumman är i alla fall att detta är det första slutprojektet som jag är nöjd med så jag har egentligen inga egentliga klagomål mot mig själv.

Ps. jag är förresten onöjd med payment sidan, där ser man att jag inte riktigt tänkt till innan. Jag försökte göra om den men det blev inte som jag ville (vill ha delivery info till vänster och sen väljer man betalningsmetod till höger, så att sidan inte är så tom till att börja med). + Störigt att man måste scrolla upp för att hitta knapparna för att välja betalningsform.