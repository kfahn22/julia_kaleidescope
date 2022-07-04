// Mandelbrot/Julia coding challenge by Daniel Shiffman
// This sketch renders the Julia set within the Koch curve using different values of c

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
  
        c0 = sa.createCanvas(400,400, sa.WEBGL);
        c0.parent(divA);
        sa.pixelDensity(1);
        // shaders require WEBGL mode to work
        graphics0 = sa.createGraphics(400, 400, sa.WEBGL);
  
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
  
  new p5(sb => {
  
    // a shader variable
    let shader1;
  
    // Declare variables
    let button1;
    let c1;
    let graphics1;
    
    sb.clear = () => {
        sb.clearStorage();
    }
  
    sb.preload = () => {
        // load the the shader
        shader1 = sb.loadShader('julia_set/julia.vert', 'julia_set/julia.frag');
    }
  
    sb.setup = () => {
        sb.pixelDensity(1);
        sb.noStroke();
  
        let divB = sb.createDiv();
        divB.position(410, 110);
        divB.style('max-width', '200px');
        divB.style('align-content', 'center');
  
        c1 = sb.createCanvas(400,400, sb.WEBGL);
        c1.parent(divB);
        sb.pixelDensity(1);
        // shaders require WEBGL mode to work
        graphics1 = sb.createGraphics(400, 400, sb.WEBGL);
  
        button1 = sb.createButton('SAVE TILE B');
        button1.position(120, 950);
        button1.mousePressed(sb.saveTile1);
  
      //   radio.selected('4.0');
        
        let choice = sb.getItem('choice');
        if (choice != null) {
            radio.selected('choice');
        } else {
            radio.selected('4.0');
        }
    }
  
    sb.draw = () => {
        //pass the uniforms to the shader
        //this is done separately for each canvas
        //instance
        shader1.setUniform('u_resolution', [sb.width, sb.height]);
        shader1.setUniform("iMouse", [sb.mouseX, sb.map(sb.mouseY, 0, sb.height, sb.height, 0)]);
        shader1.setUniform('choice', 4.0);
        shader1.setUniform('tile', 1.0);
        sb.shader(shader1);
        sb.rect(0, 0, sb.width, sb.height);
    }
  
    sb.saveTile1 = () => {
        //sb.saveCanvas(c1, '1.png');
        sb.storeItem("img1", c1.elt.toDataURL());
    }
  
  });
  
  
  new p5(sc => {
  
    // a shader variable
    let shader2;
  
    // Declare variables
    let button2;
    let c2;
    let graphics2;
    
    sc.clear = () => {
        sc.clearStorage();
    }
  
    sc.preload = () => {
        // load the the shader
        shader2 = sc.loadShader('julia_set/julia.vert', 'julia_set/julia.frag');
    }
  
    sc.setup = () => {
        sc.pixelDensity(1);
        sc.noStroke();
  
        let divC = sc.createDiv();
        divC.position(10, 510);
        divC.style('max-width', '200px');
        divC.style('align-content', 'center');
  
        c2 = sc.createCanvas(400,400, sc.WEBGL);
        c2.parent(divC);
        sc.pixelDensity(1);
        // shaders require WEBGL mode to work
        graphics2 = sc.createGraphics(400, 400, sc.WEBGL);
  
        button2 = sc.createButton('SAVE TILE C');
        button2.position(230, 950);
        button2.mousePressed(sc.saveTile2);
    }
  
    sc.draw = () => {
        shader2.setUniform('u_resolution', [sc.width, sc.height]);
        shader2.setUniform("iMouse", [sc.mouseX, sc.map(sc.mouseY, 0, sc.height, sc.height, 0)]);
        shader2.setUniform('choice', 7.0);
        shader2.setUniform('tile', 2.0);
        sc.shader(shader2);
        sc.rect(0, 0, sc.width, sc.height);
    }
  
  sc.saveTile0 = () => {
        //sc.saveCanvas(c2, '2.png');
        sc.storeItem("img2", c2.elt.toDataURL());
    }
    
  });
  
  
  new p5(sd => {
  
    // a shader variable
    let shader3;
  
    // Declare variables
    let button3;
    let c3;
    let graphics3;
  
  
    sd.preload = () => {
        // load the the shader
        shader3 = sd.loadShader('julia_set/julia.vert', 'julia_set/julia.frag');
    }
  
    sd.setup = () => {
        sd.pixelDensity(1);
        sd.noStroke();
  
        let divD = sd.createDiv();
        divD.position(410, 510);
        divD.style('max-width', '200px');
        divD.style('align-content', 'center');
  
        c3 = sd.createCanvas(400,400, sd.WEBGL);
        c3.parent(divD);
        sd.pixelDensity(1);
        // shaders require WEBGL mode to work
        graphics3 = sd.createGraphics(400, 400, sd.WEBGL);
  
        button3 = sd.createButton('SAVE TILE D');
        button3.position(340, 950);
        button3.mousePressed(sd.saveTile3);
    }
  
    sd.draw = () => {
        shader3.setUniform('u_resolution', [sd.width, sd.height]);
        shader3.setUniform("iMouse", [sd.mouseX, sd.map(sd.mouseY, 0, sd.height, sd.height, 0)]);
        shader3.setUniform('choice', 6.0);
        shader3.setUniform('tile', 3.0);
        sd.shader(shader3);
        sd.rect(0, 0, sd.width, sd.height);
    }
  
    sd.storeParameters = () => {
        let parameters = {
            rad1: rad1Slider.value(),
            rad2: rad2Slider.value(),
            x1: x1Slider.value(),
            y1: y1Slider.value(),
            x2: x2Slider.value(),
            y2: y2Slider.value(),
        }
        sd.storeItem("parameters", parameters);
    }
  
    sd.saveTile0 = () => {
        //sd.saveCanvas(c3, '3.png');
        sd.storeItem("img3", c3.elt.toDataURL());
    }
    
  
  });
  
  