import React from 'react';

let config = {
    num: [4, 7],
    rps: 0,
    radius: [5, 5],
    life: [1.5, 3],
    v: [2, 3],
    tha: [-50, 60],
        // body: "./img/icon.png", // Whether to render pictures
    rotate: [0, 20],
    alpha: [0.1, 0],
    scale: [1, 0.05],
        position:  {x:1,y:650,width:1000,height:100}, // all or center or {x:1,y:1,width:100,height:100}
        color: ["random", "#ff0000"],
        bround: "cross", // cross or bround
        random: 15,  // or null,
        g: 1,    // gravity
        f: [2, -1], // force
        onParticleUpdate: (ctx, particle) => {
          ctx.beginPath();
          ctx.rect(particle.p.x, particle.p.y, particle.radius * 2, particle.radius * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
          ctx.closePath();
        }
      };

export default config;

