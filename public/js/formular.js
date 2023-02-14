//Anzahl Termine auslesen
let anzahlTermine = document.getElementById("anzT");

//Event Listener bei Änderung der Anzahl von Terminen
anzahlTermine.addEventListener("change", function() {
    //Div welches durch neues div mit Fieldsets ersetzt werden soll
    let div = document.getElementById("ersetzen");
    //neues Div erstellen
    let neuesdiv = document.createElement("div");
    neuesdiv.id="ersetzen";
    //Bei mehr als 2 Terminen
    if (anzahlTermine.value >= 3) {
        for (let i = 2; i<anzahlTermine.value; i++) {
            neuesdiv.append(neuesFieldset(i+1));
        };
        div.replaceWith(neuesdiv);
    }
    //Bei 2 Terminen
    else div.replaceWith(neuesdiv);
});

function neuesFieldset(nummer) {
    //Fieldset
    let fieldset = document.createElement("fieldset");
    //Legend
    let legend = document.createElement("legend");
    legend.textContent="Termin " + nummer;
    //Datum
    let label1 = document.createElement("label");
    label1.for="datum" + nummer;
    label1.textContent="Datum:";
    let input1 = document.createElement("input");
    input1.type = "date";
    input1.name = "datum" + nummer;
    input1.id = "datum" + nummer;
    //Start
    let label2 = document.createElement("label");
    label2.for="start" + nummer;
    label2.textContent="Start:";
    let input2 = document.createElement("input");
    input2.type = "time";
    input2.name = "start" + nummer;
    input2.id = "start" + nummer;
    //Ende
    let label3 = document.createElement("label");
    label3.for="ende" + nummer;
    label3.textContent="Ende:";
    let input3 = document.createElement("input");
    input3.type = "time";
    input3.name = "ende" + nummer;
    input3.id = "ende" + nummer;

    //Zusammenfügen
    fieldset.append(legend, label1, input1, label2, input2, label3, input3);

    return fieldset;
};