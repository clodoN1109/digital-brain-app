import React, { Component } from 'react';
import 'tachyons';
import Clarifai from 'clarifai';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import config from './components/ParticlesConfig/ParticlesConfig.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Footer from './components/Footer/Footer.js';
import Signin from './components/Signin/Signin.js';
import Signup from './components/Signup/Signup.js';

import './App.css';

let listOfFaces = []; // Storage of all face's bounding boxes found on the last analised image.

let lastIndexOfFace = -1; // Face bounding box index pointer is currently over.

let imageLink = ''; // Current url or local address on the link form.

let submitsCounter = 0;

const initialState = {
  input:'',
  route:'signin',
  user: {

    id: '',
    name: '',
    email: '',
    favoriteColor: '',
    entries: 0,
    joined: ''

  },
  sampleCurrentIndex : 0
}


class App extends Component {

  constructor(){

    super();
    this.state = {
      input:'',
      route:'signin',
      user: {

        id: '',
        name: '',
        email: '',
        favoriteColor: '',
        entries: 0,
        joined: ''

      },
      sampleCurrentIndex : 0
    }

  };


  loadUser = (data) => {

    this.setState({user : 
      
      {

        id: data.id,
        name: data.name,
        email: data.email,
        favoriteColor: data.favoriteColor,
        entries: data.entries,
        joined: data.joined

      }

    })


  }

  hideCanvasDisplayLogo = (imgURL) => {
  
    let canvasBox =  document.getElementsByClassName('canvas')[0];
    let logo =  document.getElementsByClassName('logo')[0];
    let tiltBox = document.getElementsByClassName('Tilt')[0];

    logo.style.opacity = 1;
    logo.style.width = '220px';
    logo.style.height = '180px';

    tiltBox.style.backgroundImage = 'url('+ imgURL +')';

    canvasBox.style.width = '0px';
    canvasBox.style.height = '0px';
    canvasBox.style.border = '0px solid black';

  };
  
  displayCanvasHideLogo = () => {
  
    let canvasBox =  document.getElementsByClassName('canvas')[0];
    let logo =  document.getElementsByClassName('logo')[0];
    let tiltBox = document.getElementsByClassName('Tilt')[0];

    logo.style.opacity = 0;
    logo.style.width = 0;
    logo.style.height = 0;

    canvasBox.style.width = '350px';
    canvasBox.style.height = '300px';
    canvasBox.style.border = '0px solid black';

  };

  faceRecognition = (imgURL) => {

    function PlotBoundingBoxes(regionsArray){
  
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

    document.getElementsByClassName('zoomBox')[0].style.display = ''; // Unable zoom box display.
    document.getElementById("zoomCanvas").getContext("2d").reset(); // Clear the zoom canvas for next plot.
  
    imgURL = imgURL.replace(/\s+/g, ''); // Removes accidental whitespaces from url.
  
    imageLink = imgURL; // Saves the current url link in a variable of greater scope so it can be used from other functions.
    
    // console.log(Clarifai);
    if(submitsCounter === 0){
      document.getElementById('state-info').innerHTML = 'Waiting server response (only 1st submit takes a while...).';
      submitsCounter += 1;
  }else{document.getElementById('state-info').innerHTML = 'Waiting server response.'};
    
    fetch('https://digitalbrainapp.onrender.com/imageurl', {
              'method': 'post',
              'headers': {'Content-Type': 'application/json'},
              'body' : JSON.stringify({
                  input: imgURL
              })
            })
            .then(response => response.json())

    .then(
  
      response => {

        if (response) {

          if (this.state.route === "loggedin"){

            fetch('https://digitalbrainapp.onrender.com/image', {
              'method': 'put',
              'headers': {'Content-Type': 'application/json'},
              'body' : JSON.stringify({
                  id: this.state.user.id
              })
            }).then(response => response.json())
              .then(count => {
                //console.log(count);
                this.setState(Object.assign(this.state.user, {entries: count}));
            }).catch(console.log);

          };


          // console.log('response', response);
  
          this.hideCanvasDisplayLogo(imgURL);
  
          setTimeout(() => {
  
  
          this.displayCanvasHideLogo();
          console.log(response);
          PlotBoundingBoxes(response.outputs[0].data.regions);
          // console.log('listOfDetectedFaces: ', listOfFaces);

          document.getElementById('state-info').innerHTML = 'There you go!!';
  
          }, 3000);

        }
  
      }

      ).catch(err => console.log(err));
  
  };
  

  onInputChange = (event) => {

    this.setState({input: event.target.value});

  };

  onRouteChange = (event) => {

    if(event === 'signin'){


      document.getElementById("zoomCanvas").getContext("2d").reset();
      document.getElementsByClassName('zoomBox')[0].style.display = 'none';
      document.getElementById('linkSpace').value = '';

      listOfFaces = [];

      lastIndexOfFace = -1; 

      imageLink = ''; 

      this.hideCanvasDisplayLogo();

      this.setState({user:initialState});

    }

    if (event === 'loggedin') {

      document.getElementById("zoomCanvas").getContext("2d").reset();
      document.getElementsByClassName('zoomBox')[0].style.display = 'none';
      document.getElementById('linkSpace').value = '';

      listOfFaces = [];

      lastIndexOfFace = -1; 

      imageLink = ''; 

      this.hideCanvasDisplayLogo();

    }

    this.setState({route: event});
  }

  onPictureSubmit = () => {

    let imgURL = this.state.input;
    this.faceRecognition(imgURL);
    
  };

  sample = () => {

    //console.log('click');

    document.getElementById('linkSpace').value = '';

    let sampleURL = ['https://static.independent.co.uk/s3fs-public/thumbnails/image/2012/01/11/19/pg-40-crowd-afp-getty.jpg?quality=75&width=982&height=726&auto=webp', 
      'https://www.independent.ie/world-news/and-finally/83225/29752775.ece/AUTOCROP/h530/PANews_7bf4ba20-81bd-4033-beaf-3d6ff1d8d7b6_I1.jpg',
      'https://www.psychologicalscience.org/redesign/wp-content/uploads/2016/08/PAFF_022619_facescrowd.jpg',
      'https://img.freepik.com/premium-photo/group-diverse-people-studio_53876-9287.jpg?w=996'];


    if(this.state.sampleCurrentIndex === 4){
      
      let URL = sampleURL[0];
      this.setState({sampleCurrentIndex:1});
      this.faceRecognition(URL);

    }
    else{

      let URL = sampleURL[this.state.sampleCurrentIndex];
      this.setState({sampleCurrentIndex:this.state.sampleCurrentIndex+1});
      console.log('URL: ' ,URL);
      this.setState({input: URL});
      document.getElementById('linkSpace').value = URL;
      this.faceRecognition(URL);
  
    }


  };

  onCopyFromClipboard = () => {

    //console.log('click');

    navigator.clipboard.readText().then((clipText) => (

      document.getElementById('linkSpace').value = clipText
      ));

    setTimeout(() => {this.setState({input:document.getElementById('linkSpace').value}); }, 200); 



  };

  onHoverImage = (event) => {

    let imgURL = imageLink;

    function faceBoxPlot(currentX, currentY, imgURL){

      function displayFace(currentFaceIndex, imgURL, refreshZoomDisplay){

        let face = listOfFaces[currentFaceIndex];

        let xOrigin = face[0];
        let yOrigin = face[1];
        let width = face[2];
        let height = face[3]; 

        const ctx = document.getElementById("zoomCanvas").getContext("2d");

        const image = new Image();
        //image.crossOrigin = "Anonymous"; // Causes problems with most urls when informed. 
        image.src = imgURL;
        
        xOrigin = xOrigin*image.width; // Scale conversion from 0-1 to 0-Image Resolution.
        yOrigin = yOrigin*image.height;  // Scale conversion from 0-1 to 0-Image Resolution.
        width = width*image.width;  // Scale conversion from 0-1 to 0-Image Resolution.
        height = height*image.height;  // Scale conversion from 0-1 to 0-Image Resolution.

        let xRes = 300; //  Those were suposed to match exactly the zoom box (x,y) dimensions, but had to be manually adapted.
        let yRes = 170;

        image.addEventListener("load", () => {
                          
          ctx.drawImage(image, xOrigin, yOrigin, width, height, 0, 0, xRes, yRes);
          
          console.log(ctx);
          let imageData = ctx.createImageData(350,300);
          console.log(imageData);
          for (let i = 0; i < imageData.data.length; i += 4) {
            // Modify pixel data
            imageData.data[i + 0] = 190;  // R value
            imageData.data[i + 1] = 0;    // G value
            imageData.data[i + 2] = 210;  // B value
            imageData.data[i + 3] = 255;  // A value
          }
          console.log(imageData);
          //let imageData = ctx.getImageData(xOrigin, yOrigin, width, height);
          //console.log(imageData);
          //ctx.putImageData(imageData, 0, 0);

        });

      };

      function faceBoxCorrelationWithPointerPosition(currentX, currentY){

        let currentFaceIndex = lastIndexOfFace;

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
  
            currentFaceIndex = index;
  
          }
  
        }));

        return currentFaceIndex;
        
      }

      let currentFaceIndex = faceBoxCorrelationWithPointerPosition(currentX, currentY);

      if(currentFaceIndex != lastIndexOfFace){ // Avoid unecessary calls of the function, i.e. , while the currentFaceIndex doesn't change.
        lastIndexOfFace = currentFaceIndex;
        displayFace(currentFaceIndex, imgURL);
      }

    };

    function pointerPosition(){
      
    /*  console.log('x', event.clientX);
    console.log('y', event.clientY);*/

      let canvas = document.getElementById("canvas");
      let bound = canvas.getBoundingClientRect();
      let context = canvas.getContext('2d');

      let x = event.clientX - bound.left - canvas.clientLeft;
      let y = event.clientY - bound.top - canvas.clientTop;

      let xScaleFix = 1.13;
      let yScaleFix = 2; 

    /*context.fillRect(x/xScaleFix, y/yScaleFix, 2, 2);*/ //Used only to test and guide the callibration of the pointer.

      x = x/xScaleFix/300;
      y = y/yScaleFix/150;

      return [x,y];

    }

    faceBoxPlot(pointerPosition()[0], pointerPosition()[1], imgURL);

  };


  render (){
    
    return (

      <div className="App">
      {(this.state.route === 'loggedin') ? <Navigation onRouteChange = {this.onRouteChange} /> :  <div style={{height:'40px'}}></div>}
      <Logo onHoverImage = {this.onHoverImage}/>
      {(this.state.route === 'loggedin') ? <Rank userName = {this.state.user.name} entries = {this.state.user.entries} /> : <div></div>}
      { ((this.state.route === 'signin') || (this.state.route === 'signup')) ? 
        <p id='state-info' className='f3' style ={{fontSize:'20px', margin:'10px' }}>
                {'Exchange pixels for information.'}
        </p>
        : ''
      }
      <ImageLinkForm onInputChange = {this.onInputChange} 
      onPictureSubmit = {this.onPictureSubmit} 
      sample = {this.sample}
      onCopyFromClipboard = {this.onCopyFromClipboard}/>
      {/* {(this.state.route === 'signin') ? <Signin Signup loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/> : <div></div>}
      {(this.state.route === 'signup') ? <Signup loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/> : <div></div>} */}
      <ParticlesBg type="custom" config={config} bg={true} />
      <Footer />
      


      </div>
      );
  }

}

export default App;

