TiU Turportal 2025 Gruppe 2

Utvikling av en komplett webløsning for turinteresserte med integrert annonseportal og fellesturfasiliteter. Del av USN-prosjektet 2025/2026.

For å teste vær funksjonen må man åpne en ny terminal som man skriver "node src/backend/server.js" for å opprette en proxy server. Denne må kjøre i en egen terminal og man kan ikke starte nettsiden fra samme terminal.
PS. Hvis dette er første gang du tester dette så må man skrive "npm install".

For å teste nettsiden så må du være inni i "tiu-app"-hovedmappe. Bruk "cd .." for å gå tilbake og bruk cd "mappe_navn" for å gå dypere i mappene.
Deretter kan du skrive "npm start" i terminalen (ikke samme terminal som kjører server.js) når man er på riktig plass.

For å legge til stier (i SQL-databasen):
(Dette kommer til å bruke turen fra kirken på Noresund til den nye skolen som blir bygget der)

Legger til stien og gir den et navn:
INSERT INTO trails (name)
VALUES ('Olberg – Skolen');

Bruk denne kommandoen for å se trail_id som den fikk:
SELECT LAST_INSERT_ID() AS trail_id;

Denne kommandoen legger til alle punktene i stien. trail_id MÅ matche ID-tallet du fikk på forrige kall. lon er longitude og lat er latitude, bruk norgeskart for å få dette for hvert punkt også skriv det inn manuelt.
Point_order sier bare rekkefølgen som datamaskinen skal sette strekene imellom punktene.
INSERT INTO trail_points (trail_id, lon, lat, point_order) VALUES
(2, 9.63603,   60.1711871, 1),
(2, 9.6373714, 60.1730335, 2),
(2, 9.6347989, 60.1742761, 3),
(2, 9.6325535, 60.1753383, 4),
(2, 9.6279923, 60.1784539, 5),
(2, 9.624509,  60.1796521, 6),
(2, 9.6231964, 60.1794988, 7),
(2, 9.6216559, 60.1793362, 8);

Du kan så se om alt stemmer ved å gjøre dette, husk å endre "Olberg - Skolen" til navnet på stien du lagde:
SELECT t.name, p.lon, p.lat, p.point_order
FROM trails t
JOIN trail_points p ON p.trail_id = t.id
WHERE t.name = 'Olberg – Skolen'
ORDER BY p.point_order;


For å lage brukere så har jeg laget et script kalt "createUser.js" dette er bare til testing og vil lage NYE brukere i databasen.
For å bruke det må dere bare endre disse tre feltene:
    const username = "test_admin";
    const password = "test";
    const role = "admin";

Når du er klar til å lage en ny bruker bruk denne kommandoen i powershell/terminal vindu:
node createUser.js