let emptyboxes = 9;
let playerpoints = [];
let opponentpoints = [];

const win = [
    ["btn1", "btn2", "btn3"],
    ["btn4", "btn5", "btn6"],
    ["btn7", "btn8", "btn9"],
    ["btn1", "btn4", "btn7"],
    ["btn2", "btn5", "btn8"],
    ["btn3", "btn6", "btn9"],
    ["btn1", "btn5", "btn9"],
    ["btn3", "btn5", "btn7"],
]

function point(btn) {
    btn.style.backgroundImage = "url('img/img-x.png')";
    btn.disabled = true;
    emptyboxes--;
    playerpoints.push(btn.id);
    opponent();
    victory();
}

function reset() {
    const btns = document.querySelectorAll("button");
    for(i = 0, length = btns.length; i < length; i++) {
        btns[i].style.backgroundImage = "";
        btns[i].disabled = false;
    }
    emptyboxes = 9;
    playerpoints = [];
    opponentpoints = [];
}

function missing(points, counterLimit) {
    const btns = document.querySelectorAll("button");
    let btn;
    //if(points.length >= 1) {
        for(i = 0, n = win.length; i < n; i++) {
            let counter = 0;
            for(j = 0; j < win[i].length; j++) {
                console.log("b");
                if(counter == counterLimit && !points.includes(win[i][j])) {
                    btn = document.getElementById(win[i][j]);
                    if(btn.disabled == false) {
                        return win[i][j];
                    } else {
                        continue;
                    }
                }
                if(counter < counterLimit && points.includes(win[i][j])) {
                    counter++;
                    if(counter == counterLimit) {
                        j = -1;
                    }
                }
            }
        }
        return null;
    //}
}

function opponent() {
    let btn;
    if(playerpoints.length == 1) {
        valore = "btn" + (Math.floor(Math.random() * 9) + 1);
        btn = document.getElementById(valore);
    } else if(emptyboxes >= 1) {
        btn = document.getElementById(missing(playerpoints, 2));
        if(btn == null) {
            btn = document.getElementById(missing(opponentpoints, 1)); 
        }
    } else {
        return;
    }
    console.log(btn);
    btn.style.backgroundImage = "url('img/img-circle.png')";
    btn.disabled = true;
    emptyboxes--;
    opponentpoints.push(btn.id);
    victory();
}

function victory() {
    for(i = 0, n = win.length; i < n; i++) {
        let counterp = 0;
        let countero = 0;
        for(j = 0; j < win[i].length; j++) {
            //console.log(win[i][j]);
            if(playerpoints.includes(win[i][j])) {
                counterp++;
                if(counterp == 3) {
                    console.log("player wins");
                    reset();
                    return;
                } 
            } else if(opponentpoints.includes(win[i][j])) {
                countero++;
                //console.log(countero);
                if(countero == 3) {
                    console.log("opponent wins");
                    reset();
                    return;
                }
            }
        }
    }
    if(emptyboxes == 0) {
        console.log("draw");
        reset();
        return;
    }
    return;
}