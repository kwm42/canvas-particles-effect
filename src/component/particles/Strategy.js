function linearMove(p) {
    if (p.delay > 0)--p.delay;
    else {
        let step = .02;
        p.x += (p.targetX - p.x) * step;
        p.y += (p.targetY - p.y) * step;
    }
}

function randomMove(p) {
    if (p.delay > 0)--p.delay;
    else {
        let diffX = p.targetX - p.x;
        let diffY = p.targetY - p.y;
        let distance = Math.sqrt(diffX * diffX + diffY * diffY) * .99;
        p.x = p.targetX + Math.sin(Math.random() * 2 * Math.PI) * distance;
        p.y = p.targetY + Math.cos(Math.random() * 2 * Math.PI) * distance;
    }
}

function randomLayout(w, h){
    return {
        x: Math.random() * w,
        y: Math.random() * h
    }
}

function pointLayout(w, h){
    return {
        x: 0,
        y: 0
    }
}

function aroundLayout(w, h){
    // alt: true => top and bottom, false => left and right
    let alt = Math.random() > .5;
    return {
        x: alt ? (Math.random() > .5 ? 5 : w - 20) : Math.random() * w,
        y: !alt ? (Math.random() > .5 ? 5 : h - 20) : Math.random() * h
    }
}

module.exports = {
    moveStrategies: [
        {id: '0', name: 'linearMove', value: linearMove},
        {id: '1', name: 'randomMove', value: randomMove}
    ],
    layoutStrategies: [
        {id: '0', name: 'pointLayout', value: pointLayout},
        {id: '1', name: 'randomLayout', value: randomLayout},
        {id: '2', name: 'aroundLayout', value: aroundLayout}
    ]
}