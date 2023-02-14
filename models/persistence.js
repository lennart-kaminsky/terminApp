//
// Fachobjekte
//

//Array mit allen Abstimmungen
const abstimmungenArray = [];

//Konstruktor Abstimmung
let Abstimmung = function (name, beschreibung) {
    this.name = name;
    this.beschreibung = beschreibung;
    this.acode = generateCode();
    this.tcode = generateCode();
    this.termine = [];
    
    abstimmungenArray.push(this);
};
Abstimmung.prototype.addTermin = function(termin) {
    if (this.termine.find(element => element.datum == termin.datum && element.start == termin.start && element.ende == termin.ende)) {
        throw new Error("Zu dieser Zeit existiert bereits ein Termin!");
    }
    else {
        termin.id = "Termin " + (this.termine.length + 1);
        this.termine.push(termin);
    }
}

//Konstruktor Termin
let Termin = function (datum, start, ende) {
    this.id;
    this.datum = datum;
    this.start = start;
    this.ende = ende;
    this.stimmen = [];
};
//Methoden von Termin im Prototype
Termin.prototype.addStimme = function(Stimme) {
    this.stimmen.push(Stimme);
};

//Konstruktor Stimme
let Stimme = function(name, option) {
    this.name = name;
    this.option = option;

    if (this.istValideOption(this.option) == false) {
        throw new Error("Dies ist keine gültige Option!");
    };
};
//Methoden von Termin im Prototype
Stimme.prototype.istValideOption = function (option) {
    if (option === "Ja" || option === "Nein" || option === "Vielleicht") {
        return true;
    }
    else return false;
};

//
// Hilfsfunktionen
//

// Erzeugt einen sechsstelligen Code, bestehend aus Buchstaben und Ziffern
const generateCode = () => Array(6)
.fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
.map((x) => x[Math.floor(Math.random() * x.length)])
    .join("");

//Abstimmung zu tcode
function getAbstimmungZuTCode(tcode) {
    return abstimmungenArray.find(element => element.tcode === tcode);
}

//Abstimmung zu acode
function getAbstimmungZuACode(acode) {
    return abstimmungenArray.find(element => element.acode === acode);
}

//
// Initialer Datenbestand
//

//Abstimmung erstellen
let abstimmung1 = new Abstimmung("Web-Technologien",
    "Bei dieser Prüfung ist ein Poster als Hilfsmittel erlaubt.");

//Ausgabe von Teilnehmer- und Administratorcode
console.log("T-Code:" + abstimmung1.tcode);
console.log("A-Code:" + abstimmung1.acode);

//Termine erstellen
let termin1 = new Termin("2022-03-09", "14:00", "14:30");
let termin2 = new Termin("2022-03-09", "15:00", "15:30");
let termin3 = new Termin("2022-03-10", "14:00", "14:30");

//Stimmen zu Terminen hinzufügen
termin1.addStimme(new Stimme("Lennart Kaminsky","Ja"));
termin2.addStimme(new Stimme("Lennart Kaminsky","Vielleicht"));
termin3.addStimme(new Stimme("Lennart Kaminsky","Nein"));

termin1.addStimme(new Stimme("Max Mustermann","Ja"));
termin2.addStimme(new Stimme("Max Mustermann","Vielleicht"));
termin3.addStimme(new Stimme("Max Mustermann","Nein"));

termin1.addStimme(new Stimme("Erika Mustermann","Ja"));
termin2.addStimme(new Stimme("Erika Mustermann","Vielleicht"));
termin3.addStimme(new Stimme("Erika Mustermann","Nein"));

//Termine zur Abstimmung hinzufügen
abstimmung1.addTermin(termin1);
abstimmung1.addTermin(termin2);
abstimmung1.addTermin(termin3);

//
// Schnittstelle
//

module.exports = {
    Abstimmung: Abstimmung,
    Termin: Termin,
    Stimme: Stimme,
    abstimmungenArray: abstimmungenArray,
    getAbstimmungZuTCode: getAbstimmungZuTCode,
    getAbstimmungZuACode: getAbstimmungZuACode
};