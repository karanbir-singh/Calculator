/*
* Copyright (C) 2020 Singh Karanbir. All rights riserved.
*/

// Contenitore principale: calcolatrice
const calculator = document.createElement("div");

// Contenitore dell'espressione, del risultato e dei bottoni
const contElem = document.createElement("div");

// Espressione in input
const inputEspr = document.createElement("input");

// Risultato dell'espressione
const output = document.createElement("p");

// Contenitore di bottoni
const btns = document.createElement("div");

// Contenitore di bottoni extra
const extraBtns = document.createElement("div");

// Dimensioni bottone
const btnWidth = "88px";
const btnHeight = "82px";

const openedB = "(";
const closedB = ")";

//------------------------------------------------------------------------------------------------------------------------------------------------

// Crea un bottone
function createButton(source, btnId, width, height) {
    const input = document.createElement("input");
    input.setAttribute("type", "image");
    input.src = source;
    input.id = btnId;

    //stile dei bottoni
    input.style.width = width;
    input.style.height = height;
    input.style.outline = "none";
    input.style.margin = "4px";
    input.style.marginBottom = "3px";
    if (btnId === "i") {
        input.style.borderRadius = "10px";
    }
    if (btnId === "c") {
        input.ondblclick = () => {
            cancelAll();
        }
    }

    input.onclick = () => {
        if (btnId === "=") {
            createRPN();
        } else if (btnId === "c") {
            cancel();
        } else if (btnId === "?") {
            alert("- You can modify the expression directly by clicking on the display where there is the expression\n- If the 'C' button is double-clicked, it will clean up the display\n- If you want to use the trigonometric functions or square root, after the value insert a right parenthesis i.e. ')'\n- The '%' rappresents the MOD function ( 10 mod 3 = 1 )\n- The log() function returns the base-10 logarithm of the inserted value.");
        } else if (btnId === "i") {
            alert("Created by Singh Karanbir");
        } else {
            inputEspr.value += btnId;
        }
    }

    btns.appendChild(input);
}

// Crea i bottoni operazioni
function operationsButtons(val) {
    let source = "";
    let opBtnId = "";
    switch (val) {
        case 6:
            source = "img/operators/divide.png";
            opBtnId = "/";
            break;
        case 3:
            source = "img/operators/multiply.png";
            opBtnId = "*";
            break;
        case 0:
            source = "img/operators/substract.png";
            opBtnId = "-";
            break;
    }
    createButton(source, opBtnId, btnWidth, btnHeight);
}

// Crea i bottoni parentesi
function bracketsButtons() {
    createButton("img/extra_/openB.png", openedB, btnWidth, btnHeight);
    createButton("img/extra_/closeB.png", closedB, btnWidth, btnHeight);
}

// Crea il bottone piccolo con la freccetta
let flag = true;
function extraButtonsOpener() {
    const input = document.createElement("input");
    input.setAttribute("type", "image");
    input.src = "img/extra_/right_arrow.png";
    input.id = "arrow";

    //stile dei bottoni
    input.style.width = "25px";
    input.style.height = "25px";
    input.style.outline = "none";
    input.style.margin = "4px";
    input.style.marginBottom = "0px";
    input.style.marginTop = "30px";
    input.style.marginLeft = "386px";
    input.style.borderRadius = "20px";

    input.onclick = () => {
        if (flag) {
            input.src = "img/extra_/left_arrow.png";
            flag = false;
            calculator.appendChild(extraBtns);
        } else if (!flag) {
            input.src = "img/extra_/right_arrow.png";
            flag = true;
            calculator.removeChild(extraBtns);
        }
    }

    contElem.appendChild(input);
}

// crea un bottone per settare l'unità di misura dell'angolo
let angle = "DEG";
function angleTypeButton() {
    const input = document.createElement("input");
    input.setAttribute("type", "image");
    input.src = "img/extra_/deg.png";
    input.id = "arrow";

    //stile dei bottoni
    input.style.width = "50px";
    input.style.height = "25px";
    input.style.outline = "none";
    input.style.position = "absolute";
    input.style.left = "75px";
    input.style.top = "165px";
    input.style.borderRadius = "20px";

    input.onclick = () => {
        if (angle === "DEG") {
            input.src = "img/extra_/rad.png";
            angle = "RAD";
        } else if (angle === "RAD") {
            input.src = "img/extra_/deg.png";
            angle = "DEG";
        }
    }

    contElem.appendChild(input);
}

// Crea i bottoni extra
function createExtraButtons(width, height, source, btnId) {
    const input = document.createElement("input");
    input.setAttribute("type", "image");
    input.src = source;
    input.id = btnId;

    //stile dei bottoni
    input.style.width = width;
    input.style.height = height;
    input.style.outline = "none";
    input.style.margin = "5px";

    input.onclick = () => {
        if (btnId === "sin" || btnId === "cos" || btnId === "tan" || btnId === "√" || btnId === "log") {
            inputEspr.value += btnId + "(";
            return;
        }
        inputEspr.value += btnId;
    }

    extraBtns.appendChild(input);
}

// Crea tutti i bottoni
function createAllButtons() {
    // parentesi
    bracketsButtons();

    // numeri e operatori
    createButton(("img/extra_/clean.png"), "c", btnWidth, btnHeight);
    createButton(("img/operators/sum.png"), "+", btnWidth, btnHeight);
    for (let i = 9; i >= 0; i--) {
        if (i % 3 === 0 && i != 9)
            operationsButtons(i);
        createButton(("img/numbers/" + i + ".png"), i, btnWidth, btnHeight);

    }
    createButton(("img/extra_/dot.png"), ".", btnWidth, btnHeight);
    createButton(("img/extra_/ris.png"), "=", "184px", btnHeight);

    // punto di domanda e informazioni (rules.png)
    createButton(("img/extra_/info.png"), "?", "20px", "20px");
    createButton(("img/extra_/rules.png"), "i", "20px", "20px");

    // DEG/RAD, freccetta per i bottoni extra e due pulsanti per lo spostamento del "caret"
    extraButtonsOpener();
    angleTypeButton();

    // bottoni extra
    createExtraButtons(btnWidth, btnHeight, "img/operators/pow.png", "^");
    createExtraButtons(btnWidth, btnHeight, "img/operators/sqrt.png", "√");
    createExtraButtons(btnWidth, btnHeight, "img/operators/mod.png", "%");
    createExtraButtons(btnWidth, btnHeight, "img/numbers/pi.png", "π");
    createExtraButtons(btnWidth, btnHeight, "img/operators/sin.png", "sin");
    createExtraButtons(btnWidth, btnHeight, "img/operators/cos.png", "cos");
    createExtraButtons(btnWidth, btnHeight, "img/operators/tan.png", "tan");
    createExtraButtons(btnWidth, btnHeight, "img/operators/log.png", "log");

    calculator.appendChild(btns);
}

//------------------------------------------------------------------------------------------------------------------------------------------------

// Imposta le stringhe secondo un formato preciso 
// (ogni elemento è suddiviso dagli altri con uno spazio)
/* 
** Esempio: 91+2*(32+1) -> ( 91 + 2 * ( 32 + 1 ) ) 
*/
function formatExpr(inExpr) {
    let tmp = "";
    for (let i = 0; i < inExpr.length; i++) {
        if (inExpr.charAt(i) !== " ")
            tmp += inExpr.charAt(i);
    }
    let tmp1 = "";
    for (let i = 0; i < tmp.length; i++) {
        let k = tmp.charAt(i);
        k = k.toLocaleLowerCase();
        if (!isNaN(k) || k === "." || k === "π") {
            tmp1 += k;
        } else if (k === openedB) {
            tmp1 += k + " ";
        } else if (k === closedB) {
            tmp1 += " " + k;
        } else if (k === "s" || k === "c" || k === "t" || k === "l") {
            switch (k) {
                case "s": tmp1 += "sin ";
                    i = i + 2;
                    break;
                case "c": tmp1 += "cos ";
                    i = i + 2;
                    break;
                case "t": tmp1 += "tan ";
                    i = i + 2;
                    break;
                case "l": tmp1 += "log ";
                    i = i + 2;
                    break;
            }
        } else if (isOperator(k)) {
            tmp1 += " " + k + " ";
        }
    }

    return tmp1;
}

// Precedenze
function priority(op) {
    switch (op) {
        case "+": return 0;
        case "-": return 0;

        case "/": return 1;
        case "*": return 1;
        case "%": return 1;

        case "^": return 2;
        case "log": return 2;

        case "√": return 3;

        // Funzioni trigonometriche
        case "sin": return 4;
        case "cos": return 4;
        case "tan": return 4;
    }
}

// Controlla se il valore passato come parametro è un'operatore
function isOperator(val) {
    if (val === "/"
        || val === "*"
        || val === "+"
        || val === "-"
        || val === "%"
        || val === "^"
        || val === "sin"
        || val === "cos"
        || val === "tan"
        || val === "√"
        || val === "log")
        return true;
    return false;
}

//------------------------------------------------------------------------------------------------------------------------------------------------

// Trasforma l'espressione dalla notazione infissa ad una notazione postfissa
function createRPN() {
    let temp = formatExpr(inputEspr.value);

    // Input
    let infix = cleanUp(temp.split(" "));

    // Stack di operatori
    let op = [];

    // Output
    let postfix = [];

    // Inserimento di una parentesi aperta nello stack di operatori
    op.push("(");

    // Inserimento di una parentesi chiusa alla fine di input
    infix.push(")");

    // Lettura di ogni elemento dell'input
    infix.forEach((actualVal) => {
        if (!isNaN(actualVal) || actualVal === "π") { // Se il valore corrente è un numero
            // viene inserito in postfix
            postfix.push(actualVal);

        } else if (actualVal === openedB) { // Se il valore corrente è la parentesi aperta
            // viene inserita nello stack di operatori
            op.push(actualVal);

        } else if (actualVal === closedB) { // Se il valore corrente è una parentesi chiusa
            // Si estraggono gli operatori dalla sommità dello stack
            // e vengono in postfix, fin quando non ci sia
            // una parentesi aperta sulla cima dello stack di operatori
            let j = op.length - 1;
            let tmp = op[j];
            while (tmp !== openedB) {
                if (isOperator(tmp)) {
                    postfix.push(op.pop());
                }
                j--;
                tmp = op[j];
            }
            // Si estrae la parentesi aperta dallo stack di operatori
            op.pop();

        } else if (isOperator(actualVal)) { // Se il valore corrente è un operatore
            // Si estraggono gli operatori (se ce ne sono) dalla sommità dallo stack
            // finché hanno una priorità maggiore o uguale a quello dell'operatore corrente
            // e si inseriscono in postfix
            let temp = op[op.length - 1];
            while (isOperator(temp)) {
                if (priority(temp) >= priority(actualVal)) {
                    postfix.push(op.pop());
                } else {
                    break;
                }
                temp = op[op.length - 1];
            }

            // Si pone sullo stack di operatori il carattere corrente
            op.push(actualVal);
        }
    });

    // Una volta che è stato letto ogni elemento di input
    // si estraggono tutti gli operatori e vengono inseriti in postfix
    while (op.length !== 0) {
        let tmp = op.pop();
        if (isOperator(tmp)) {
            postfix.push(tmp);
        }
    }
    // Parte il calcolo del risultato
    calculateResult(postfix);
}

// Calcola il risultato
function calculateResult(postfix) {
    // expr: rappresenta postfix
    if (postfix[0] === "") {
        postfix[0] = "0";
    }
    let expr = cleanUp(postfix);

    // Stack di valori numerici
    let values = [];

    // ris: risultato dell'espressione
    let ris = 0;

    let i = 0;
    while (i < expr.length) {
        // Valore attuale in lettura
        let actualVal = expr[i];

        if (actualVal === "π") {
            actualVal = "" + Math.PI;
        }
        if (!isNaN(actualVal)) { // Se il valore corrente è un numero
            // viene inserito nello stack di valori numerici
            values.push(parseFloat(actualVal));

        } else if (isOperator(actualVal)) { // Se il valore corrente è un operatore
            // Si estraggono i due valori numerici precedenti all'operatore
            let x = values.pop();

            // Nel caso in cui si ha una funzione trigonometrica o una radice quadrata, non si tira fuori il secondo valore
            let value;
            if (actualVal === "sin"
                || actualVal === "cos"
                || actualVal === "tan"
                || actualVal === "√"
                || actualVal === "log") {

                value = operation(actualVal, x, 0);

                // Javascript: alcuni valori conosciuti danno come risultato valori non precisi, ma molto vicini
                // tan(π/2) da come risultato: 16331239353195370 che verrà interpretato come infinito
                // cosi anche per tan(3*π/2) = 5443746451065123 che verrà interpretato come infinito
                if (value === 16331239353195370 || value === 5443746451065123) {
                    output.innerText = "INFINITY";
                    return;
                } else {
                    // in tutti gli casi si arrotonda per avere un valore adeguato
                    value = Math.round(value * 1000000000) / 1000000000;
                }
            } else { // se l'operator non è una funzione trigonometrica

                // Si estrae il secondo valore
                let y = values.pop();

                // Si esegue l'operazione tra x e y con operatore il valore corrente
                value = operation(actualVal, x, y);
            }
            // Si inserisce il risultato all'interno dello stack di valori numerici
            values.push(value);
        }
        i++;
    }

    // l'ultimo valore presente nello stack di valori numeri
    // sarà il risultato dell'espressione
    ris = values.pop();
    if (("" + ris).length > 19) {
        output.innerText = "ERROR, TOO LONG TO VIEW";
        //return;
    }
    // Visualizzazione del risultato
    output.innerText = "= " + ris;
}

// Esegue singole operazioni
function operation(operator, x, y) {
    switch (operator) {
        case "+": return x + y;
        case "-": return y - x;
        case "/": return y / x;
        case "*": return x * y;
        case "%": return y % x;
        case "^": return Math.pow(y, x);
        case "√": return Math.sqrt(x);
        case "log": return Math.log10(x);

        // Funzioni trigonometriche
        case "sin": if (angle === "RAD") return Math.sin(x);
        else return Math.sin(x * Math.PI / 180);
        case "cos": if (angle === "RAD") return Math.cos(x);
        else return Math.cos(x * Math.PI / 180)
        case "tan": if (angle === "RAD") return Math.tan(x);
        else return Math.tan(x * Math.PI / 180);
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------

// Pulisce tutto
function cancelAll() {
    inputEspr.value = "";
    output.innerText = "";
    setFocus();
}

// Cancella solo l'ultimo valore dell'input
function cancel() {
    inputEspr.value = inputEspr.value.substr(0, inputEspr.value, length - 1);
}

// pulisce una lista data come parametro: toglie eventuali ""
function cleanUp(list) {
    let temp = list;
    temp.forEach((elem, index) => {
        if (elem === "" && index !== 0) {
            list.splice(index, 1);
        }
    })
    return list;
}

//------------------------------------------------------------------------------------------------------------------------------------------------

// Setta il focus sul campo di input quando carica la pagina: 
// si potra vedere il cursore lampeggiante in cui verrà inserita l'espressione
function setFocus() {
    inputEspr.focus();
}

// Setta lo style di tutti gli elementi
function setStyle() {
    // calculator style
    calculator.style.width = "441px";
    calculator.style.height = "693px";
    calculator.style.backgroundImage = "url(img/Calculator.png)";

    contElem.style.paddingTop = "50px";

    extraBtns.style.backgroundImage = "url(img/extra_/extraB.png)";
    extraBtns.style.borderRadius = "15px";
    extraBtns.style.maxWidth = "196px"
    extraBtns.style.position = "absolute";
    extraBtns.style.left = "455px";
    extraBtns.style.top = "160px";

    // input field style
    inputEspr.id = "input-eq";
    inputEspr.style.border = "none";
    inputEspr.style.backgroundColor = "transparent";
    inputEspr.style.color = "black";
    inputEspr.style.fontFamily = "digital-font-1";
    inputEspr.style.fontSize = "40px";
    inputEspr.style.height = "30px";
    inputEspr.style.paddingLeft = "30px";
    inputEspr.onfocus = () => {
        inputEspr.style.outline = "none";
    }

    // output field style
    output.style.fontFamily = "digital-font-1";
    output.style.fontSize = "40px";
    output.style.margin = "0px"
    output.style.textAlign = "right";
    output.style.height = "50px";
    output.style.paddingRight = "30px";

    // buttons container style
    btns.style.paddingLeft = "31px";

    contElem.appendChild(inputEspr);
    contElem.appendChild(output);
    contElem.appendChild(btns);
    calculator.appendChild(contElem);
    document.body.appendChild(calculator);
}

//------------------------------------------------------------------------------------------------------------------------------------------------

// Se si schiccia 'Enter', viene eseguito il calcolo del risultato
addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        // attraverso blur() non mi toglie il focus() sull'ultimo bottone schicchiato 
        // e di conseguenza mi aggiungeva comunque il valore all'input
        // per questo motivo ho dovuto usare preventDefault()
        event.preventDefault();

        createRPN();
    }
})

//TODO Radice quadrata: √

setStyle();
createAllButtons();