var a = document.getElementsByTagName('div')[0];

var txt = '';
var speed = 100;
var level = 0;

var canv = document.getElementById("workField");
canv.style.border = "solid black 3px";
var workField = canv.getContext("2d");
var nickName = '';
var game = {};
var isPassed = false;
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
                    console.log("SUCCESS", mouse.clientX, mouse.clientY, allBullets[y]);
                    workField.clearRect(0, 0, 500, 200);
                    score++;

                    a.style.backgroundColor = "# 447766";
                    a.innerHTML = "Your score" + score;
                    allBullets.splice(y, 1);
                }
            }
        }
    }
    
});

var coor = 16;
var score = 0;
function moveAllBullets() {
    setTimeout(function () {
        for (let int = 0; int < allBullets.length; int++) {
            workField.clearRect(allBullets[int].coorX, allBullets[int].coorY, 10, 10);    // изчиства полето
            allBullets[int].coorX++;
            workField.fillRect(allBullets[int].coorX, allBullets[int].coorY, 10, 10);
            if (allBullets[int].coorX >= 500) {
                allBullets.splice(int, 1);
                score--;
                console.log(allBullets);
            }



        }

        moveAllBullets();

    }, speed);
}


///////////////////////
var allBullets = [];
var count = 0;
function createBullet() {

    let num = Math.ceil(Math.random() * 200);
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
    speed--;
    moveAllBullets();
}

///////////////////////////////////////////////////
function main() {
    a.style.border = "3px solid blue "
    a.style.backgroundColor ="blue";
    a.innerHTML = "You pass the level " + level;
    if(allBullets.length == 0)
    setTimeout(function () {
        level++;
        startLevel();
    }, 3000)
}








