/* console.log("coucou"); */
let sensibility=1
const main = document.querySelector("main");
main.style.padding='auto'
main.style.backgroundColor='gray'
const player = document.createElement('div');
const playerImg = document.createElement('img');
playerImg.src = "rocket.png"
playerImg.style.width='50%'
player.style.position='absolute'
player.style.left='50%'
player.style.bottom='00%'
main.append(player)
player.append(playerImg)

const moveLeft = () => {
    player.style.left = parseInt(player.style.left)-sensibility+"%"
}
const moveRight = () => player.style.left = parseInt(player.style.left)+sensibility+"%"

const fire = () =>{
    const missile = document.createElement('div');
    missile.style.background='blue'
    missile.style.position='absolute'
    missile.style.width="0.5%"
    missile.style.height="2%"
    let missileLeft = missile.style.left = parseInt(window.getComputedStyle(player).left) + 
    parseInt(window.getComputedStyle(playerImg).width)/2 +
    "px"
    let missilebottom = missile.style.bottom = parseInt(window.getComputedStyle(player).bottom) +
    parseInt(window.getComputedStyle(playerImg).height) +
    "px"
    main.append(missile)
    /* while */
    setInterval(()=>
    {
        missile.style.top = parseInt(window.getComputedStyle(missile).top) -10 +"px"
    },
    200
    )
}

let leftKeyPressed
let rightKeyPressed
let spaceKeyPressed
let previousFireTime
document.addEventListener(
    "keydown",
    (event) => {
        if (event.key==="ArrowLeft")
            {moveLeft();
            leftKeyPressed=true;}
            else if (event.key==="ArrowRight")
            {moveRight();
            rightKeyPressed=true;}
            else if (event.key===" ")
           {spaceKeyPressed=true;
            console.log(Date.now())
            console.log(Date.now()-previousFireTime)
            if (Date.now()-previousFireTime>1000||previousFireTime==null)
                {setTimeout(
                    fire(),10
                    )
                previousFireTime=Date.now();}
            }
                
            }
            );

document.addEventListener(
    "keyup",
    (event) => {
        if (event.key==="ArrowLeft")
        leftKeyPressed=false;
        else if (event.key==="ArrowRight")
        rightKeyPressed=false;
        else if (event.key===" ")
        spaceKeyPressed=false;
    }
    );
    
    
setInterval(()=>{
    if (leftKeyPressed==true)
        {
        moveLeft()}
    else if (rightKeyPressed==true)
        {
        moveRight()}
    },
    100)
            
setInterval(()=>{
    if (spaceKeyPressed)
    setTimeout(
        fire(),10
        )
    },
    1000)