const express = require("express");
const data = require("../models/persistence");

const { Abstimmung, Termin, Stimme } = require("../models/persistence");

const router = express.Router();

//Statische Inhalte
router.use(express.static("public"));

//Im Body gesendete Daten einlesen
router.use(express.urlencoded({extended: false}));

//Ansicht "Startseite"
router.get("/", function(req, res) {
    res.render("startseite");
});

//Ansicht "Neue Abstimmung erstellen" 
router.get("/neueAbstimmung", function(req, res) {
    res.render("neueAbstimmung");
});

router.post("/neueAbstimmung", function(req, res) {
    //neue Abstimmung erstellen
    let neueAbstimmung = new Abstimmung(req.body.nameAbst, req.body.beschreibung);
    //Durchlaufen aller Termine und erstellen hinzufügen der neuen Termine zur Abstimmung
    let anzahlTermine = 1;
    while (req.body[`datum${anzahlTermine}`] && req.body[`start${anzahlTermine}`] && req.body[`ende${anzahlTermine}`]) {
        let neuerTermin = new Termin(req.body[`datum${anzahlTermine}`],
            req.body[`start${anzahlTermine}`],
            req.body[`ende${anzahlTermine}`]);
        neueAbstimmung.addTermin(neuerTermin);
        anzahlTermine++;
    };
    //Bestätigungsseite mit den Codes anzeigen
    res.redirect("/codes?acode=" + neueAbstimmung.acode + "&tcode=" + neueAbstimmung.tcode);
});

//Anischt "Bestätigungsansicht"
router.get("/codes", function(req, res) {
    res.render("codes", { acode: req.query.acode, tcode: req.query.tcode});
});

//Ansicht "An Abstimmung teilnehmen" 
router.get("/teilnahmeAnAbstimmung", function(req, res) {
    //Wenn Abstimmung zu tcode existiert
    if (data.getAbstimmungZuTCode(req.query.tcodeInput)) {
        res.render("teilnahmeAnAbstimmung", { getAbstimmungZuTCode: data.getAbstimmungZuTCode(req.query.tcodeInput) });   
    }
    //Wenn keine Abstimmung zu tcode existiert
    else res.status(404).render("fehlerseite"); 
});

router.post("/teilnahmeAnAbstimmung", function (req, res) {
    //Abstimmung bestimmen
    let aktuelleAbstimmung = data.getAbstimmungZuTCode(req.query.tcodeInput);
    //
    for (let i=0; i < aktuelleAbstimmung.termine.length; i++) {
        aktuelleAbstimmung.termine[i].addStimme(
            new Stimme(req.body.nameStudent, req.body[`term${i+1}`]));
    };
    res.redirect("/");
});

//Ansicht "Bestehende Abstimmungen betrachten" 
router.get("/bestehendeAbstimmungen", function(req, res) {
    //Wenn Abstimmung zu acode existiert
    if (data.getAbstimmungZuACode(req.query.acodeInput)) {
        res.render("bestehendeAbstimmungen", { getAbstimmungZuACode: data.getAbstimmungZuACode(req.query.acodeInput)});
    }
    //Wenn keine Abstimmung zu acode existiert
    else res.status(404).render("fehlerseite"); 
});

//Nicht existierende URLs und Recourcen
router.use(function(req, res) {
    res.status(404).render("fehlerseite");    
});

module.exports = router;