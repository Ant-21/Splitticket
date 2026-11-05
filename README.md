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
2. Klik op **uploading an existing file** (of **Add file › Upload files**) en sleep deze bestanden erin: `index.html`, `parser.js`, `config.js`, `manifest.json`, `icon-180.png`, `icon-192.png`, `icon-512.png`, `README.md`. De map `apps-script` mag je ook uploaden, maar dat hoeft niet. Klik op **Commit changes**.
3. Open `config.js` in je repository, klik op het **potlood-icoon** en vervang `PLAK_HIER_JE_APPS_SCRIPT_LINK` door je link uit stap 1. Klik op **Commit changes**.
4. Ga naar **Settings › Pages**.
   - **Source:** *Deploy from a branch*
   - **Branch:** *main*, map */ (root)* › **Save**.
5. Na een minuutje staat je app op `https://JOUWNAAM.github.io/splitticket/`.

### Stap 3 – Op je iPhone

1. Open de link in **Safari** en typ je naam.
2. Vul onder **Profiel** je bunq.me-naam (of rekeningnummer) in en tik op **Bewaar**.
3. Tik onder **Profiel** op **Installeer** en volg de drie stappen. Splitticket opent nu als een app en je profiel gaat mee.

---

## Gebruiken

1. Tik op de **blauwe camera-knop** en fotografeer het ticket.
2. **Houd je vinger op de tekst** in de foto › **Selecteer alles** › **Kopieer**. Plak de tekst in het vak en tik op **Lees lijnen**.
3. Controleer de lijnen. De prijs is **per stuk**. Tik op **Volgende**.
4. Voeg toe **voor wie je betaalde** en duid aan wat **je eigen deel** was. Tik op **Maak ticket**.
5. Tik op **Deel link** (WhatsApp, Berichten…) of **Toon QR** als je samen bent.
6. Je vrienden kiezen wie ze zijn, tikken op + bij hun items en op **Betaal via bank**.
7. Onder **Te krijgen** zie je wie nog moet betalen. **Herinner** stuurt een persoonlijk bericht met naam en bedrag, enkel naar wie nog niet betaalde. Betaalde iemand buiten de app om? Open het ticket en tik bij die persoon op **Markeer als betaald**.

## Tickets laten lezen met AI (optioneel)

1. Maak een API-sleutel op [console.anthropic.com](https://console.anthropic.com) (**Continue with an API key**), zet er wat tegoed op en stel een maandlimiet in.
2. Open je Sheet › **Extensies › Apps Script** › **Projectinstellingen** (tandwiel) › **Scripteigenschappen** › **Eigenschap toevoegen**:
   - Naam `ANTHROPIC_API_KEY`, waarde: je sleutel (`sk-ant-…`).
3. Publiceer een nieuwe versie van het script (zie hieronder). Google vraagt opnieuw toestemming, nu ook om "externe services te gebruiken": zo bereikt het script Claude.
4. Neem in de app een foto. Splitticket leest het ticket meteen met AI. Lukt dat niet, dan kan je nog altijd de tekst plakken.

**Wie mag AI gebruiken?** De eerste die AI gebruikt, wordt automatisch de eigenaar. Doe dat dus zelf eerst. Zijn id komt in de scripteigenschap `AI_USERS`. Wil je een vriend toelaten, voeg dan zijn id toe, gescheiden door een komma. Je vriend vindt het id onder **Profiel › Ander toestel**: het deel van de koppelcode vóór het puntje, bv. `u1a2b3c4d5e6f7a8b`.

**Extra instellingen (scripteigenschappen):**
- `AI_DAILY_LIMIT`: maximaal aantal tickets per persoon per dag (standaard 30).
- `ANTHROPIC_MODEL`: welk Claude-model leest (standaard `claude-haiku-5-5`, het snelste en goedkoopste).

## Bijwerken naar een nieuwe versie

1. **Script:** open je Sheet › **Extensies › Apps Script**, vervang alle code door de nieuwe `Code.gs` en sla op. Kies **Implementeren › Implementaties beheren**, klik op het **potlood**, kies bij **Versie** *Nieuwe versie* en klik op **Implementeren**.
2. **App:** ga in GitHub naar je repository › **Add file › Upload files**, sleep de nieuwe bestanden erin (behalve `config.js`, die blijft hetzelfde) en klik op **Commit changes**.
3. Wacht een minuut en ververs de app.

---

## Iets aanpassen aan het script

Pas je `Code.gs` later aan? Kies dan **Implementeren › Implementaties beheren**, klik op het **potlood**, kies bij **Versie** *Nieuwe versie* en klik op **Implementeren**. Zo blijft je link hetzelfde. Een "Nieuwe implementatie" geeft een nieuwe link, die je dan opnieuw in `config.js` moet zetten.

## Goed om te weten

- **"Betaald" is op vertrouwen.** De app controleert niet bij de bank of het geld echt aankwam.
- **Je profiel hangt aan je telefoon.** Bewaar je **koppelcode** (Profiel › Ander toestel). Daarmee zet je je profiel terug op een nieuw toestel of na het wissen van Safari-gegevens.
- **Al je gegevens staan in je Google Sheet.** Je kan ze daar bekijken of wissen.
