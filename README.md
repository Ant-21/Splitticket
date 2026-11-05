# Splitticket

Fotografeer een ticket, deel het met een link of QR-code, en laat je vrienden zelf kiezen wat van hen is. Ze betalen in één tik via bunq.me (of met je rekeningnummer).

- **De app** (`index.html`, `parser.js`, `config.js`) staat gratis online via GitHub Pages.
- **De opslag** zit in een Google Sheet in je eigen Drive, via een klein Apps Script (`apps-script/Code.gs`).
- **Geen AI nodig:** de tekst van het ticket haal je uit de foto met Live Text van je iPhone. Je kopieert en plakt die in de app.

Je vrienden hebben geen account nodig. Ze openen de link, typen hun voornaam en kiezen hun deel.

---

## Opzetten (± 15 minuten)

### Stap 1 – Google Sheet en Apps Script

1. Ga naar [sheets.new](https://sheets.new) en noem de nieuwe Sheet **Splitticket**.
2. Kies in het menu **Extensies › Apps Script**.
3. Wis de voorbeeldcode en plak de volledige inhoud van `apps-script/Code.gs`. Klik op het **diskette-icoon** om op te slaan.
4. Klik rechtsboven op **Implementeren › Nieuwe implementatie**.
   - Klik op het tandwiel naast "Type selecteren" en kies **Web-app**.
   - **Uitvoeren als:** *Ik*.
   - **Wie heeft toegang:** *Iedereen*.
   - Klik op **Implementeren**.
5. Google vraagt om toestemming. Kies je account. Krijg je de melding "Google heeft deze app niet geverifieerd", klik dan op **Geavanceerd › Ga naar Splitticket (onveilig)** en daarna op **Toestaan**. Dat is normaal voor een script dat je zelf maakt: het krijgt alleen toegang tot deze Sheet.
6. Kopieer de **Web-app-URL**. Die eindigt op `/exec`.

### Stap 2 – GitHub

1. Ga naar [github.com/new](https://github.com/new).
   - **Repository name:** `splitticket`
   - Kies **Public**. GitHub Pages is gratis voor publieke repositories. Er staan geen geheimen in de code.
   - Klik op **Create repository**.
2. Klik op **uploading an existing file** en sleep deze bestanden erin: `index.html`, `parser.js`, `config.js`, `README.md`. De map `apps-script` mag je ook uploaden, maar dat hoeft niet. Klik op **Commit changes**.
3. Open `config.js` in je repository, klik op het **potlood-icoon** en vervang `PLAK_HIER_JE_APPS_SCRIPT_LINK` door je link uit stap 1. Klik op **Commit changes**.
4. Ga naar **Settings › Pages**.
   - **Source:** *Deploy from a branch*
   - **Branch:** *main*, map */ (root)* › **Save**.
5. Na een minuutje staat je app op `https://JOUWNAAM.github.io/splitticket/`.

### Stap 3 – Op je iPhone

1. Open de link in **Safari**.
2. Tik op de **Deel-knop › Zet op beginscherm**. Splitticket opent nu als een app.
3. Typ je naam. Vul onder **Profiel** je bunq.me-naam (of rekeningnummer) in en tik op **Bewaar**.

---

## Gebruiken

1. Tik op de **blauwe camera-knop** en fotografeer het ticket.
2. **Houd je vinger op de tekst** in de foto › **Selecteer alles** › **Kopieer**. Plak de tekst in het vak en tik op **Lees lijnen**.
3. Controleer de lijnen. De prijs is **per stuk**. Tik op **Maak ticket**.
4. Tik op **Deel link** (WhatsApp, Berichten…) of **Toon QR** als je samen bent.
5. Je vrienden tikken op + bij hun items en op **Betaal via bank**.
6. Onder **Te krijgen** zie je wie wat koos en wie betaald heeft. Met **Herinner** stuur je de link opnieuw.

---

## Iets aanpassen aan het script

Pas je `Code.gs` later aan? Kies dan **Implementeren › Implementaties beheren**, klik op het **potlood**, kies bij **Versie** *Nieuwe versie* en klik op **Implementeren**. Zo blijft je link hetzelfde. Een "Nieuwe implementatie" geeft een nieuwe link, die je dan opnieuw in `config.js` moet zetten.

## Goed om te weten

- **"Betaald" is op vertrouwen.** De app controleert niet bij de bank of het geld echt aankwam.
- **Je profiel hangt aan je telefoon.** Wis je de websitegegevens van Safari, dan start je met een nieuw, leeg profiel.
- **Al je gegevens staan in je Google Sheet.** Je kan ze daar bekijken of wissen.
