import React, { Component } from 'react';
import 'tachyons';
import Clarifai from 'clarifai';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import './App.css';



//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: 'b8996a9b4962460e97e5ada5dc67192e'
 });
 
 console.log(app.models
       .predict(
         Clarifai.FACE_DETECT_MODEL,
         'https://samples.clarifai.com/face-det.jpg'));
    
    let config = {
      num: [4, 7],
      rps: 0.1,
      radius: [5, 5],
      life: [1.5, 3],
      v: [2, 3],
      tha: [-50, 60],
      // body: "./img/icon.png", // Whether to render pictures
      rotate: [0, 20],
      alpha: [0.1, 0],
      scale: [1, 0.05],
      position:  {x:630,y:240,width:1,height:50}, // all or center or {x:1,y:1,width:100,height:100}
      color: ["random", "#ff0000"],
      cross: "bround", // cross or bround
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
    
    setTimeout(() => {
      
      document.getElementsByClassName("particles-bg-canvas-self")[0].hidden = true;
      
    }, 6000); 
    
    class App extends Component {
      
      constructor(){
        
        super();
        this.state = {
          input:'',
        }
        
      }
      
      onInputChange = (event) => {
        
        console.log(event.target.value);
        
        
      }
      
      
      
      onButtonSubmit = () => {
        
        console.log('click');
        app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg")
        .then(
          
          function(response) {
            console.log(response);
          },
          function(err){
            console.log(err);
          }
          
          
          );
        }
        
        render (){
          
          return (
            <div className="App">
            <Navigation />
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
            <ParticlesBg type="custom" config={config} bg={true} />
            {/*
          <FaceRecognition /> */}
          </div>
          );
          
        }
        
      }
      
      
      
      export default App;
      
      