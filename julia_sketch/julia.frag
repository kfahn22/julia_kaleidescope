
// This shader folds uv space to draw the Koch curve
// The Julia set is inserted into the Koch curve for 
// different values of c to craete a kaleiscope effect.

// Frag code based on:
// Mandelbrot/Julia coding challenge by Daniel Shiffman


// KIFS Explained! by The Art of Code (Martijn Steinrucken)
// https://www.youtube.com/watch?v=il_Qg9AqQkE
// Mandelbrot Explained! by The Art of Code
// https://www.youtube.com/watch?v=6IWXkV82oyY

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float colorAr;
uniform float colorAg;
uniform float colorAb;
uniform float choice;

#define S smoothstep
#define PI 3.14159

 // Create a normal line that rotates around origin
vec2 N(float angle)
  {
  return vec2( sin(angle), cos(angle) );
}

// Function of reflect uvs across a line
// adj remaps line 
// dot(uv,n) =  uv.x*n.x + uv.y*n.y
vec2 Reflect( vec2 uv, vec2 adj, vec2 n ) {
    float d = dot(uv - adj, n); 
    return n*max(0., d)*2.0;
}

// CHOOSE JULIA SET
// Choices 0-9 alues from Wikipeida
// https://en.wikipedia.org/wiki/Julia_set
// Choices 10-12 from
// The Beaty of Fractals, Peitgen & Richter, p193
// Choices 13-16 from  //http://paulbourke.net/fractals/juliaset/
vec2 chooseJulia( float choice ) {
  vec2 js = vec2(0);
  if (choice == 0.0) {
      vec2 c = vec2(-0.7269, 0.1889);
      js += c;
  }
  else if (choice == 1.0) {
      vec2 c = vec2(-0.8, 0.156);
       js += c;
  }
 else if (choice == 2.0) {
      vec2 c = vec2(0.285, 0.01);
      js += c;
  }
  else if (choice == 3.0) {
      vec2 c = vec2(0.285, 0.0);
      js += c;
  }
  else if (choice == 4.0) {
      vec2 c = vec2(-0.4, 0.6);
      js += c;
  }
   else if (choice == 5.0) {
      vec2 c =  vec2(0.45, 0.1428);
      js += c;
  }
   else if (choice == 6.0) {
      vec2 c = vec2(-0.70176, -0.3842);
      js += c;
  }
   else if (choice == 7.0) {
      vec2 c = vec2(-0.835, -0.2321);
      js += c;
  }
  else if (choice == 8.0) {
      vec2 c = vec2(0.0, -0.8);
      js += c;
  }
   else if (choice == 9.0) {
      vec2 c = vec2(-.6995, .37999);
      js += c;
  }
   else if (choice == 10.0) {
      vec2 c = vec2(-0.194, .6557);
      js += c;
  }  
   else if (choice == 11.0) {
      vec2 c = vec2(-0.74543, .11301);
      js += c;
  }  
  else if (choice == 12.0) {
      vec2 c = vec2(0.27334, .00742);
      js += c;
  }
   else if (choice == 13.0) {
       vec2 c = vec2(.355, .355);
      js += c;
   }
   else if (choice == 14.0) {
   vec2 c = vec2(-.54, 0.54);
      js += c;
  }
  else if (choice == 15.0) {
   vec2 c = vec2(-.4, -0.59);
      js += c;
  }
  else if (choice == 16.0) {
   vec2 c = vec2(0.32, 0.043);
      js += c;
  }
 return  js;
}

float Mandelbrot( vec2 uv, float k, vec2 m, float choice ) {
    
    float zoom = pow(k, -m.x*k);
  
    vec2 c = uv*zoom;
    c += chooseJulia( choice );

    float a = 0.0;
    float b = 0.0;
    vec2 z = vec2(a, b);
    float iter = 0.0;
    const float maxiterations = 100.;
    for (float n = 0.0; n < maxiterations; n++) {
   
     z = vec2 (z.x*z.x - z.y*z.y, 2.*z.x*z.y) + c;
     // if further away from 4 break
     if ( length(z) > 4.0) break;
        iter++;
   }
   float bright = iter/maxiterations;
   float power = 0.75;
   bright = pow(bright, power);
   return bright;
}

void main( )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (gl_FragCoord.xy-0.5*u_resolution.xy)/u_resolution.y;
    vec2 mouse = iMouse.xy/u_resolution.xy;;
    float t =  iTime;

    uv *= 2.0;
    vec3 col = vec3(0.0);

    // Code for the Koch curve
    // We use a reflection to add two more Koch curves reflected across a line of angle 5./6.*PI
    uv.x = abs(uv.x);
    uv.y += tan(5./6.*PI)*0.5; //adjustment to reorient Koch snowflake back in center
    vec2 n = N(5./6.*PI); //orientation of line 
    // adjustment to move reflection line to end of Koch curve
    vec2 adj = vec2(0.5, 0.0); 
    uv -= Reflect(uv, adj, n);

    n = N(2./3. * PI); // angle to give "hat"
    // we add a scaling factor so line does not change as uvs are divided
    float scale = 1.0;
    uv.x += 0.5;
    // Change the number of iterations for Koch curve here!
    for (int i = 0; i < 10; i++ ) {
    uv *= 3.0; // we multiply by 3. to divide the uvs
    scale *=3.0;
    uv.x  -= 1.5; // adjustment to translate uvs back to origin
     
    uv.x = abs(uv.x);  // reflect uvs across line (uvs go from 1.0 - 0.0 - 1.0)
    uv.x -= 0.5;  // adjust length of line so that it is 3 units long
     
    // mirror uvs around line 
    uv -= n*min(0.0, dot(uv - vec2(0.0, 0.0), n))*2.; 
    }

    // Choice value of c
    float c = choice;
    float d = Mandelbrot( uv, 10.0, mouse, c );
   
    float s =  S(2./u_resolution.y, 0.0, d/scale);
  
   //Approach to coloring Julia set from https://github.com/vharivinay/julia-set-with-shaders/
 vec3 col1 = vec3(0.5-cos(d * 20.0)/2.0,0.5-cos(d * 30.0)/2.0,0.5-cos(d * 40.0)/2.0);

  gl_FragColor = vec4(col1, 1.0);
}
