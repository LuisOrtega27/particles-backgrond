const canvas = document.querySelector('#canvas')
const wrapper = document.querySelector('.wrapper')

canvas.width = wrapper.clientWidth
canvas.height = wrapper.clientHeight

const ctx = canvas.getContext('2d')



const particlesSettings = {
    time: 60,
    cuantity: 30,
    lineDistance: 120,
    particleColor: "#fff",
    lineColor: "#fff",
    lineWidth: 1,
    mouseLines: false,
    PDimentions: {
        w: 2,
        h: 2
    },
    currentCoords: [],
    targetCoords: [],
    mouseCoords: {x: 0, y: 0}
}

if(wrapper.clientWidth < 1000){
    particlesSettings.cuantity = 30
    particlesSettings.PDimentions.h = 2
    particlesSettings.PDimentions.w = 2
    particlesSettings.lineWidth = 0.5
    particlesSettings.lineDistance = 60
}


ctx.fillStyle = particlesSettings.particleColor;
ctx.strokeStyle = particlesSettings.lineColor
ctx.lineWidth = particlesSettings.lineWidth



// MOUSE=============================================================
canvas.addEventListener('mousemove', event=>{

    particlesSettings.mouseCoords.x = event.clientX
    particlesSettings.mouseCoords.y = event.clientY

})



const drawLinesToMouse = ()=>{

    particlesSettings.currentCoords.forEach( coord => {
        
        if( (coord.x- particlesSettings.mouseCoords.x) > particlesSettings.lineDistance ) return
            
        if( (coord.x- particlesSettings.mouseCoords.x) < -particlesSettings.lineDistance ) return
            
        if( (coord.y - particlesSettings.mouseCoords.y) > particlesSettings.lineDistance ) return
            
        if( (coord.y - particlesSettings.mouseCoords.y) < -particlesSettings.lineDistance ) return

        ctx.beginPath();
        
        ctx.moveTo(
            particlesSettings.mouseCoords.x,
            particlesSettings.mouseCoords.y
        );
    
        ctx.lineTo(
            coord.x + particlesSettings.PDimentions.w/2, 
            coord.y + particlesSettings.PDimentions.h/2
        );
    
        ctx.stroke();
    
        ctx.closePath();

    })

}



// MOUSE=============================================================



const moveCoords = (index)=>{

    // X coords
    if (particlesSettings.currentCoords[index].x < particlesSettings.targetCoords[index].x) particlesSettings.currentCoords[index].x += 1
    else if (particlesSettings.currentCoords[index].x > particlesSettings.targetCoords[index].x) particlesSettings.currentCoords[index].x -= 1
    
    // Y coords
    if (particlesSettings.currentCoords[index].y < particlesSettings.targetCoords[index].y) particlesSettings.currentCoords[index].y ++
    else if (particlesSettings.currentCoords[index].y > particlesSettings.targetCoords[index].y) particlesSettings.currentCoords[index].y --
    
    // X & Y === X & Y
    if ( index != null &&
        particlesSettings.currentCoords[index].x === particlesSettings.targetCoords[index].x 
        &&
        particlesSettings.currentCoords[index].y === particlesSettings.targetCoords[index].y 
    ){
        createCoords(index)
            
    }
            
}
    
    
    
const drawParticles = ()=>{
        
    for(let e = 0; e < particlesSettings.cuantity; e++){    
        
        ctx.beginPath();
        
        ctx.arc(
            particlesSettings.currentCoords[e].x + particlesSettings.PDimentions.w/2, 
            particlesSettings.currentCoords[e].y + particlesSettings.PDimentions.w/2, 
            particlesSettings.PDimentions.w, 
            0, 
            Math.PI * 2, 
            true
        );
        
        ctx.fill();
        
        // ctx.stroke();
        
        moveCoords(e)
            
    }

}



const createCoords = (index)=>{
    
    if(index!=null){

        for(let i = 0; i < 2; i++){
            
            let randomX = Math.floor(Math.random() * wrapper.clientWidth - 10)
            let randomY = Math.floor(Math.random() * wrapper.clientHeight - 10)
            
            if( i === 0 ) particlesSettings.currentCoords[index] = { x: randomX, y: randomY } 
            
            if( i === 1 ) particlesSettings.targetCoords[index] = { x: randomX, y: randomY }
            
        }
        
        return

    }
    
            
    for(let i = 0; i < 2; i++){
        
        for(let e = 0; e < particlesSettings.cuantity; e++){

            let randomX = Math.floor(Math.random() * wrapper.clientWidth - 10)
            let randomY = Math.floor(Math.random() * wrapper.clientHeight - 10)
                
            i === 0 && particlesSettings.currentCoords.push({x: randomX, y: randomY})
            
            i === 1 && particlesSettings.targetCoords.push({x: randomX, y: randomY})
            
        }

    }
    
}



const drawLines = (pointAX,pointAY, pointBX,pointBY)=>{

    ctx.beginPath();

    ctx.moveTo(
        pointAX + particlesSettings.PDimentions.w/2, 
        pointAY + particlesSettings.PDimentions.h/2
    );

    ctx.lineTo(
        pointBX + particlesSettings.PDimentions.w/2, 
        pointBY + particlesSettings.PDimentions.h/2
    );

    ctx.stroke();

    ctx.closePath();

}

//  Change color ====================================

changeFirtColorAt = 50
changeSecondColorAt = 75
changeThirdColorAt = 90


console.log(-5 - -4)

const changeLineColor = (x, y)=>{

    if( 
        x >= -changeFirtColorAt && 
        x <= changeFirtColorAt && 
        y >= -changeFirtColorAt && 
        y <= changeFirtColorAt
    
    ) ctx.strokeStyle = "#28e"

    else if( 
        x >= -changeSecondColorAt && 
        x <= changeSecondColorAt && 
        y >= -changeSecondColorAt && 
        y <= changeSecondColorAt
    
    ) ctx.strokeStyle = "#28e7"
    
    else if( 
        x >= -changeThirdColorAt && 
        x <= changeThirdColorAt && 
        y >= -changeThirdColorAt && 
        y <= changeThirdColorAt
    
    ) ctx.strokeStyle = "#28e4"
    
    else  ctx.strokeStyle = "#28e2"

}



const detectParticleCloseness = ()=>{
    
    for(let i = 0; i < particlesSettings.currentCoords.length; i++){
        
        for(let e = 0; e < particlesSettings.currentCoords.length; e++){

            // X
            if( (particlesSettings.currentCoords[i].x - particlesSettings.currentCoords[e].x) >= particlesSettings.lineDistance ) continue
            if( (particlesSettings.currentCoords[i].x - particlesSettings.currentCoords[e].x) <= -particlesSettings.lineDistance ) continue

            // Y
            if( (particlesSettings.currentCoords[i].y - particlesSettings.currentCoords[e].y) >= particlesSettings.lineDistance ) continue
            if( (particlesSettings.currentCoords[i].y - particlesSettings.currentCoords[e].y) <= -particlesSettings.lineDistance ) continue

            // changecolor
            changeLineColor(
                particlesSettings.currentCoords[i].x - particlesSettings.currentCoords[e].x,
                particlesSettings.currentCoords[i].y - particlesSettings.currentCoords[e].y
            );
            
            // lines
            drawLines(
                particlesSettings.currentCoords[i].x,  particlesSettings.currentCoords[i].y, 
                particlesSettings.currentCoords[e].x, particlesSettings.currentCoords[e].y
            );
                
                
            
        }

    }

}



const animate = ()=>{
    
    createCoords()

    setInterval(() => {

        ctx.clearRect(0 , 0, wrapper.clientWidth, wrapper.clientHeight)
        
        detectParticleCloseness()

        if(wrapper.clientWidth > 1000 && particlesSettings.mouseLines === true ) drawLinesToMouse()
        
        drawParticles()


    }, particlesSettings.time);

}

animate()