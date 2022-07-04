// This sketch visualizes the Julia set within the Koch curve using different values of c
// Based on The Coding Train challenges by Dainel Shiffman: 
//https://thecodingtrain.com/challenges/22-julia-set
//https://thecodingtrain.com/challenges/21-mandelbrot-set-with-p5js

// Frag code based on tutorials by the Art of Code
// More info in frag file

new p5(sa => {

  // a shader variable
  let shader0;

  // Declare variables
  let button0;
  let button;
  let c0;
  let graphics0;
  let divAr;

  sa.clear = () => {
      sa.clearStorage();
  }

  sa.preload = () => {
      // load the the shader
      shader0 = sa.loadShader('julia_set/julia.vert', 'julia_set/julia.frag');
  }

  sa.setup = () => {
      sa.pixelDensity(1);
      sa.noStroke();

      let para = sa.createP("Julia Set Kaleidescope -- move mouse to see");
      para.position(10,10);
      para.style('font-size', '30px');
      let divA = sa.createDiv();
      divA.position(10, 110);
      divA.style('max-width', '200px');
      divA.style('align-content', 'center');

      c0 = sa.createCanvas(800,800, sa.WEBGL);
      c0.parent(divA);
      sa.pixelDensity(1);
      // shaders require WEBGL mode to work
      graphics0 = sa.createGraphics(800, 800, sa.WEBGL);

      button0 = sa.createButton('SAVE TILE A');
      button0.position(10,950);
      button0.mousePressed(sa.saveTile0);
    
      button = sa.createButton("CLEAR STORAGE");
      button.position(10, 1000);
      button.mousePressed(sa.clear);
      
      divAr = sa.createDiv();
      divAr. position(850, 10);
      radio = sa.createRadio();
      radio.parent(divAr);
      divAr.style('maxWidth', '150px');
      radio.option('0.0', 'c = ( -0.7269, 0.188 )');
      radio.option('1.0', 'c = ( -0.8, 0.156 )');
      radio.option('2.0', 'c = ( 0.285, 0.01 )');
      radio.option('3.0', 'c = ( 0.285, 0.0)');
      radio.option('4.0', 'c = ( -0.4, 0.6 )');
      radio.option('5.0', 'c = (  0.45, 0.1428)');
      radio.option('6.0', 'c = ( -0.70176, -0.3842 )');
      radio.option('7.0', 'c = ( -0.835, -0.2321)');
      radio.option('8.0', 'c = ( 0.0, -0.8 )');
      radio.option('9.0', 'c = ( -.6995, .37999 )');
      radio.option('10.0', 'c = ( -0.194, .6557 )');
      radio.option('11.0', 'c = ( -0.74543, .11301 )');
      radio.option('12.0', 'c = ( 0.27334, .00742 )');
      radio.option('13.0', 'c = ( .355, .355 )');
      radio.option('14.0', 'c = ( -.54, 0.54 )');
      radio.option('15.0', 'c = ( -.4, -0.59 )');
      radio.option('16.0', 'c = ( 0.32, 0.043 )');
      radio.selected('3.0');
      sa.storeC();
      let choice = sa.getItem('choice');
      if (choice != null) {
          radio.selected('choice');
      }
      
  }

  sa.draw = () => {
      let choice = radio.value();
      //pass the uniforms to the shader
      //this is done separately for each canvas instance
      shader0.setUniform('u_resolution', [sa.width, sa.height]);
      shader0.setUniform("iMouse", [sa.mouseX, sa.map(sa.mouseY, 0, sa.height, sa.height, 0)]);
      shader0.setUniform('choice', choice);
      shader0.setUniform('tile', 0.0);
      sa.shader(shader0);
      sa.rect(0, 0, sa.width, sa.height);
  }

  sa.saveTile0 = () => {
      //sa.saveCanvas(c0, '0.png');
      sa.storeItem("img0", c0.elt.toDataURL());
  }
  sa.storeC = () => {
      let c = radio.value();
      sa.storeItem('choice', c);
  }

  sa.clear = () => {
    sa.clearStorage();
  }

});