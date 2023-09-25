const canvas = document.querySelector('#canvas')
const wrapper = document.querySelector('.wrapper')

canvas.width = wrapper.clientWidth
canvas.height = wrapper.clientHeight

const ctx = canvas.getContext('2d')



const particlesSettings = {
    time: 60,
    cuantity: 60,
    lineDistance: 120,
    particleColor: "#28e6",
    lineColor: "#fff",
    lineWidth: 1,
    PDimentions: {
        w: 6,
        h: 6
    },
    currentCoords: [],
    targetCoords: [],
    mouseCoords: {x: 0, y: 0}
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
        
        if( 
            (coord.x- particlesSettings.mouseCoords.x) <= (particlesSettings.lineDistance + 100) 
            && 
            (coord.x- particlesSettings.mouseCoords.x) > -(particlesSettings.lineDistance + 100)
        ){
            
            if( 
                (coord.y - particlesSettings.mouseCoords.y) <= (particlesSettings.lineDistance + 100) 
                && 
                (coord.y - particlesSettings.mouseCoords.y) >= -(particlesSettings.lineDistance + 100)
            ){

                ctx.beginPath();
            
                ctx.moveTo(
                    coord.x + particlesSettings.PDimentions.w/2, 
                    coord.y + particlesSettings.PDimentions.h/2
                );
                
                ctx.lineTo(
                    particlesSettings.mouseCoords.x,
                    particlesSettings.mouseCoords.y
                );
            
                ctx.stroke();
            
                ctx.closePath();
                
            }

        }
            

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
        
        ctx.fillRect( 
            particlesSettings.currentCoords[e].x, 
            particlesSettings.currentCoords[e].y, 
            particlesSettings.PDimentions.w, 
            particlesSettings.PDimentions.h
        )
        
        moveCoords(e)
            
    }

}



const createCoords = (index)=>{
    
    if(index!=null){

        for(let i = 0; i < 2; i++){
            
            let randomX = Math.floor(Math.random() * wrapper.clientWidth - 10)
            let randomY = Math.floor(Math.random() * wrapper.clientHeight - 10)
            
            if(i === 0) particlesSettings.currentCoords[index] = {x: randomX, y: randomY}
            
            if(i === 1 )particlesSettings.targetCoords[index] = {x: randomX, y: randomY}
            
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



const detectParticleCloseness = ()=>{
    
    for(let i = 0; i < particlesSettings.currentCoords.length; i++){
        
        for(let e = 0; e < particlesSettings.currentCoords.length; e++){
            
            if( 
                (particlesSettings.currentCoords[i].x - particlesSettings.currentCoords[e].x) <= particlesSettings.lineDistance 
                && 
                (particlesSettings.currentCoords[i].x - particlesSettings.currentCoords[e].x) > -particlesSettings.lineDistance
            ){
                
                if( 
                    (particlesSettings.currentCoords[i].y - particlesSettings.currentCoords[e].y) <= particlesSettings.lineDistance 
                    && 
                    (particlesSettings.currentCoords[i].y - particlesSettings.currentCoords[e].y) >= -particlesSettings.lineDistance
                ){

                    drawLines(
                        particlesSettings.currentCoords[i].x,  particlesSettings.currentCoords[i].y, 
                        particlesSettings.currentCoords[e].x, particlesSettings.currentCoords[e].y)
                }

            }
            
        }

    }

}



const animate = ()=>{
    
    createCoords()

    setInterval(() => {

        ctx.clearRect(0 , 0, wrapper.clientWidth, wrapper.clientHeight)
        
        detectParticleCloseness()
        drawLinesToMouse()
        drawParticles()


    }, particlesSettings.time);

}

animate()