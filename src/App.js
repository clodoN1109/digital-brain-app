import React, { Component } from 'react';
import 'tachyons';
import Clarifai from 'clarifai';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Footer from './components/Footer/Footer.js';
import './App.css';
/*
let canvasBox =  document.getElementsByClassName('canvas')[0];
canvasBox.style.width = '350px';
canvasBox.style.height = '300px';
canvasBox.style.border = '2px solid black';

let logo =  document.getElementsByClassName('logo')[0];
logo.style.opacity = 0;
logo.style.width = 0;
logo.style.height = 0;
*/
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
      position:  {x:690,y:340,width:1,height:50}, // all or center or {x:1,y:1,width:100,height:100}
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

let sampleIndex = [0];

let listOfFaces = [];

let indexOfFace = -1;

let imageJPEG = '';

const app = new Clarifai.App({
      apiKey: 'b8996a9b4962460e97e5ada5dc67192e'
});

function faceRecognition(imgURL){

      function faceRecognitionPlot(regionsArray){

        function draw(xOrigin, yOrigin, width, height) {
          const canvas = document.getElementById("canvas");
          if (canvas.getContext) {
            const ctx = canvas.getContext("2d");

    // Box Style:

            var gradient = ctx.createLinearGradient(0, 0, 170, 0);
            gradient.addColorStop("0", "magenta");
            gradient.addColorStop("0.5" ,"blue");
            gradient.addColorStop("1.0", "red");

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;

    // Box Scaling and Positioning:

            let widthScaleFix = 1.15;
            let heightScaleFix = 1.95;
            ctx.strokeRect(xOrigin*350/widthScaleFix, yOrigin*300/heightScaleFix, width*350/widthScaleFix, height*300/heightScaleFix);
      /*ctx.fillRect(175/1.2, 150/2, 30, 30/1.8);*/ // Calibration
          }
        }

        console.log('regionsArray', regionsArray);

        const ctx = document.getElementById("canvas").getContext("2d");
        ctx.reset();

        let len = listOfFaces.length;
    for(let i=0; i<len; i++){listOfFaces.pop()}; // Clean the array from the previews analysis.

      regionsArray.map((region) => {

        console.log('detected region', region);
        let xOrigin = region.region_info.bounding_box.left_col;
        let yOrigin = region.region_info.bounding_box.top_row;
        let width =  region.region_info.bounding_box.right_col - xOrigin;
        let height = region.region_info.bounding_box.bottom_row - yOrigin;

      /*console.log(xOrigin, yOrigin, width, height);*/

        listOfFaces.push([xOrigin, yOrigin, width, height]);

        draw(xOrigin, yOrigin, width, height);



      });

  };

  imgURL = imgURL.replace(/\s+/g, ''); // Removes whitespaces.

  app.models.predict("a403429f2ddf4b49b307e318f00e528b", imgURL)
  .then(

    function(response) {

      console.log('response', response);


      let logo =  document.getElementsByClassName('logo')[0];
      let tiltBox = document.getElementsByClassName('Tilt')[0];
      let canvasBox =  document.getElementsByClassName('canvas')[0];

      logo.style.opacity = 1;
      logo.style.width = '220px';
      logo.style.height = '180px';

      console.log('this.state.input: ', imgURL);
      tiltBox.style.backgroundImage = 'url('+ imgURL +')';
      document.getElementsByClassName("particles-bg-canvas-self")[0].hidden = false;

      canvasBox.style.width = '0px';
      canvasBox.style.height = '0px';
      canvasBox.style.border = '0px solid black';

      setTimeout(() => {

        document.getElementsByClassName("particles-bg-canvas-self")[0].hidden = true;

        logo.style.opacity = 0;
        logo.style.width = 0;
        logo.style.height = 0;

        canvasBox.style.width = '350px';
        canvasBox.style.height = '300px';
        canvasBox.style.border = '0px solid black';

              /*document.getElementsByClassName('Tilt')[0].style.backgroundImage = '';*/
        faceRecognitionPlot(response.outputs[0].data.regions);

        console.log('listOfFaces: ', listOfFaces);


      }, 4000);

    },

    function(err){
      console.log(err);
    }


    );

};

function processingAnimation(time){

  let aux = document.getElementsByClassName("particles-bg-canvas-self")[0];

  if (aux!=undefined){

    aux.hidden = false;

  };

  setTimeout(() => {

    document.getElementsByClassName("particles-bg-canvas-self")[0].hidden = true;

  }, time); 

};


function createImageFileFromURL(imgURL){



}


createImageFileFromURL('');



processingAnimation(4000);


class App extends Component {

  constructor(){

    super();
    this.state = {
      input:'',
    }

  };

  onInputChange = (event) => {

    this.setState({input: event.target.value});

  };

  onButtonSubmit = () => {

    console.log('click');
    let imgURL = this.state.input;
    faceRecognition(imgURL);

  };

  sample = () => {

    console.log('click');

    document.getElementById('linkSpace').value = '';

    let sampleURL = ['https://static.independent.co.uk/s3fs-public/thumbnails/image/2012/01/11/19/pg-40-crowd-afp-getty.jpg?quality=75&width=982&height=726&auto=webp', 
      'https://www.independent.ie/world-news/and-finally/83225/29752775.ece/AUTOCROP/h530/PANews_7bf4ba20-81bd-4033-beaf-3d6ff1d8d7b6_I1.jpg',
      'https://www.psychologicalscience.org/redesign/wp-content/uploads/2016/08/PAFF_022619_facescrowd.jpg',
      'https://img.freepik.com/premium-photo/group-diverse-people-studio_53876-9287.jpg?w=996'];


    if (sampleIndex[0] === 4){
      sampleIndex[0] = 0;
    };
    let URL = sampleURL[sampleIndex[0]];

    sampleIndex[0] = sampleIndex[0] + 1;


    console.log('URL: ' ,URL);
    this.setState({input: URL});
    document.getElementById('linkSpace').value = URL;
    faceRecognition(URL);

  };

  onCopyFromClipboard = () => {

    console.log('click');

    navigator.clipboard.readText().then((clipText) => (

      document.getElementById('linkSpace').value = clipText
      ));

    setTimeout(() => {this.setState({input:document.getElementById('linkSpace').value}); }, 200); 



  };

  onHoverImage = (event) => {

  
    let imgURL = this.state.input;

    function imageCorrelation(currentX, currentY, imgURL){

      function exhibitFace(xOrigin, yOrigin, xMax, yMax, index, imgURL){

        function sliceImage(xOrigin, yOrigin, xMax, yMax, imgURL){
        
          let sliceJPEG = createImageFileFromURL(imgURL);

          return sliceJPEG;

        };

        console.log('face: ', index);


        /*let sliceURL = sliceImage(xOrigin, yOrigin, xMax, yMax);*/
        let sliceURL = 'https://i.ytimg.com/vi/nlZCkRi05JQ/maxresdefault.jpg';

        let zoomBox = document.getElementsByClassName('zoomBox')[0];
        zoomBox.style.transform =  'scale(160) rotate(10deg) translate(-1px, 0.7px)';
        

        const canvas = document.getElementById("zoomCanvas");
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = imgURL;
        image.addEventListener("load", () => {
        ctx.drawImage(image, 0, 0, 233, 320);});





      };


      listOfFaces.map(((face, index) => {

        let xOrigin = face[0];
        let yOrigin = face[1];
        let width = face[2];
        let height = face[3]; 

        let xMax = xOrigin+width;
        let yMax = yOrigin+height;

        if ( ((currentX>xOrigin)&&(currentX<xMax))
         &&
         ((currentY>yOrigin)&&(currentY<yMax)) 
         )
        {

/*          console.log('index, indexOfFace index === indexOfFace');
          console.log(index, indexOfFace, index === indexOfFace);*/
          if(index != indexOfFace){
            indexOfFace = index;
            exhibitFace(xOrigin, yOrigin, xMax, yMax, index, imgURL); 

          }

        }

      }));

    };

/*        console.log('x', event.clientX);
        console.log('y', event.clientY);*/

        // Canvas pointer position determination:

    let canvas = document.getElementById("canvas");
    let bound = canvas.getBoundingClientRect();
    let context = canvas.getContext('2d');

    let x = event.clientX - bound.left - canvas.clientLeft;
    let y = event.clientY - bound.top - canvas.clientTop;

    let xScaleFix = 1.13;
    let yScaleFix = 2; 

        /*context.fillRect(x/xScaleFix, y/yScaleFix, 2, 2);*/

    x = x/xScaleFix/300;
    y = y/yScaleFix/150;
        /*console.log('x,y : ', x, y);*/

    imageCorrelation(x,y, imgURL);





  };


  render (){


    return (
      <div className="App">
      <Navigation />
      <Logo onHoverImage = {this.onHoverImage}/>
      <Rank />
      <ImageLinkForm onInputChange = {this.onInputChange} 
      onButtonSubmit = {this.onButtonSubmit} 
      sample = {this.sample}
      onCopyFromClipboard = {this.onCopyFromClipboard}/>
      <ParticlesBg type="custom" config={config} bg={true} />
      <Footer />

      </div>
      );

  }

}



export default App;

