var a = document.getElementsByTagName('div')[0];

var txt = '';
var speed = 100;
var level = 0;
var showYourScore = document.getElementById("score");
var canv = document.getElementById("workField");
canv.style.border = "solid black 3px";
var workField = canv.getContext("2d");
var nickName = '';
var game = {};
var isPassed = false;
var allBullets = [];
var count = 0;
var inputLevel = document.getElementsByTagName('input')[0];
inputLevel.style.backgroundColor = "lightgreen";
inputLevel.addEventListener('keypress', function (e) {
//    txt += e.key;
//    level = Number(txt);
})

//////////////////////////////////
window.addEventListener('mousemove', function (mouse) {
    if (allBullets.length > 0) {

        for (let y = 0; y < allBullets.length; y++) {
            if (allBullets[y].coorX <= mouse.clientX - 8 && allBullets[y].coorX + 5 >= mouse.clientX - 8) {
                if (allBullets[y].coorY <= mouse.clientY - 50 && allBullets[y].coorY + 5 >= mouse.clientY - 50) {
//                    console.log("SUCCESS", mouse.clientX, mouse.clientY, allBullets[y]);
                    workField.clearRect(0, 0, 500, 200);
                    score++;


                    //                    a.style.backgroundColor = "# 447766";
//                    console.log(showYourScore);
                    showYourScore.textContent = "Your score " + score;

                    allBullets.splice(y, 1);
                }
            }
        }
    }

});
window.addEventListener('keydown', function (button) {

    if (button.key == "ArrowDown") {
        movePadDown();

    } else if (button.key == "ArrowUp") {
        movePadUp();

    }

})


var coor = 16;
var score = 0;
function moveAllBullets() {
    setTimeout(function () {
        for (let int = 0; int < allBullets.length; int++) {
            workField.clearRect(allBullets[int].coorX, allBullets[int].coorY, 10, 10);    // изчиства полето
            allBullets[int].coorX++;
            workField.fillRect(allBullets[int].coorX, allBullets[int].coorY, 10, 10);
            let x = allBullets[int].coorX;
            let y = allBullets[int].coorY;
            if (match()) {
                allBullets.splice(int, 1);
                workField.clearRect(x, y, 10, 10);
            }
            if (allBullets.length > 0) {
                if (allBullets[int].coorX >= 500) {
                    allBullets.splice(int, 1);
                    score--;
                }

            }
            moveAllBullets();
        }
    }, speed);
}


///////////////////////

function createBullet() {

    let num = Math.ceil(Math.random() * 100);
    let bullet = {
        "start": 0,
        "count": 1
    };
    bullet.count = count++;
    bullet.start = num;
    bullet.coorX = Math.ceil(Math.random() * 100);
    bullet.coorY = num;
    allBullets.push(bullet);

}
////////////////////////////////

function startLevel() {
    for (let p = 0; p < level; p++) {
        createBullet();

    }
//    speed--;
    moveAllBullets();
    pad();

}

///////////////////////////////////////////////////
function main() {
    a.style.border = "3px solid blue "
    a.style.backgroundColor = "blue";
    a.innerHTML = "You pass the level " + level;
    if (allBullets.length == 0)
        setTimeout(function () {
            level++;
            startLevel();
        }, 3000)
}
////////////
var padRect = {};
padRect.allCoor = [];

function pad() {
    for (let r = 0; r < 5; r++) {

        let aid = {
            coorY: r * 5,
            coorX: 493
        };
        padRect.allCoor.push(aid);
        showPad();

    }

}
function showPad() {
    for (let r = 0; r < padRect.allCoor.length; r++) {
        let x = padRect.allCoor[r].coorX;
        let y = padRect.allCoor[r].coorY;
        workField.fillRect(x, y, 5, 5);
    }
}
/////////////////////////////////
function movePadDown() {
    let hlp = {
        coorX: padRect.allCoor[0].coorX,
        coorY: padRect.allCoor[0].coorY + 25
    }

    workField.clearRect(hlp.coorX, hlp.coorY - 25, 5, 5);
    padRect.allCoor.splice(0, 1)
    padRect.allCoor.push(hlp);

    showPad();
}
function movePadUp() {
    let hlp = {
        coorX: padRect.allCoor[padRect.allCoor.length - 1].coorX,
        coorY: padRect.allCoor[padRect.allCoor.length - 1].coorY - 25
    }

    workField.clearRect(padRect.allCoor[padRect.allCoor.length - 1].coorX, padRect.allCoor[padRect.allCoor.length - 1].coorY, 5, 5);
    padRect.allCoor.pop();
    padRect.allCoor.splice(0, 0, hlp);

    showPad();
}
function movePadLeft() {
}
function movePadRight() {
}
function match() {
    for (let r = 0; r < allBullets.length; r++) {

        if (allBullets[r].coorX == 483) {
            if (allBullets[r].coorY >= padRect.allCoor[0].coorY && allBullets[r].coorY <= padRect.allCoor[0].coorY + 25) {
                console.log("you catched :) ")
                return true;
            }
        }
    }
    return false;
}




