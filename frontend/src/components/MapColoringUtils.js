// colorUtils.js

// AQI_level = 3;
// GDP_level = 0;



// Light Peach: #FFDAB9
// Peach: #FFD700
// Apricot: #FFB6C1
// Coral: #FF6B6B
// Tangerine: #FFA500
// Burnt Orange: #FF8C00

let AQI_Levels = {
    "India": 3,
    "Bangladesh": 2,
    "Myanmar": 4,
    "Pakistan": 5,
    "China": 1,
    "Mongolia": 0,
}


let GDP_Levels = {
    "India": 3,
    "Bangladesh": 2,
    "Myanmar": 4,
    "Pakistan": 5,
    "China": 1,
    "Mongolia": 0,
}




const getAQILevel = (countryName) => {

    
    // let AQI_level;
    // if (countryName == "India")
    // {
    //     AQI_levels[countryName] = 5;
    // } 

    return AQI_Levels[countryName];
    //Add API calls here.
}

const getGDPLevel = (countryName) => {
    // let GDP_level;
    // if (countryName == "India")
    // {
    //     GDP_level = 3;
    // } 
    return GDP_Levels[countryName];
    // Add API calls here.
}

function addHexColors(hexColor1, hexColor2) {
    console.log(hexColor1, hexColor2)
    // Convert HEX color codes to RGB
    function hexToRgb(hex) {
        hex = hex.replace('#', ''); // Remove the "#" character
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r, g, b];
      }
      
  
    // Convert RGB to HEX
    function rgbToHex(r, g, b) {
      return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
    }
  
    const rgb1 = hexToRgb(hexColor1);
    const rgb2 = hexToRgb(hexColor2);
  
    // Add the RGB values component-wise
    const resultRgb = [
      Math.min(rgb1[0] + rgb2[0], 255),
      Math.min(rgb1[1] + rgb2[1], 255),
      Math.min(rgb1[2] + rgb2[2], 255),
    ];
  
    // Convert the result RGB values back to HEX
    const resultHex = rgbToHex(resultRgb[0], resultRgb[1], resultRgb[2]);
  
    return resultHex;
  }
  
//   // Example usage:
//   const color1 = "#FF0000"; // Red
//   const color2 = "#0000FF"; // Blue
  
//   const resultColor = addHexColors(color1, color2);
//   console.log("Resulting color:", resultColor);
  



export function getAQIColor(countryName) {
    // let color;
    let var1Color;
    let variable1Level = getAQILevel(countryName);

    if (variable1Level == 0 ) {
        var1Color = '#9cd84e';
    }
    else if (variable1Level == 1 ) {
        var1Color = '#facf39';
    }
    else if (variable1Level == 2 ) {
        var1Color = '#f99049';
    }
    else if (variable1Level == 3 ) {
        var1Color = '#f65e5f';
    }
    else if (variable1Level == 4 ) {
        var1Color = '#a070b6';
    }
    else if (variable1Level == 5 ) {
        var1Color = '#a06a7b';
    }


    
    return var1Color;
  };
  



export function getBivariateColor(countryName) {

    let var1Color;
    let var2Color;
    let variable1Level = getAQILevel(countryName);
    let variable2Level = getGDPLevel(countryName);

    if (variable1Level == 0 ) {
        var1Color = '#FFDAB9';
    }
    else if (variable1Level == 1 ) {
        var1Color = '#FFD700';
    }
    else if (variable1Level == 2 ) {
        var1Color = '#FFB6C1';
    }
    else if (variable1Level == 3 ) {
        var1Color = '#FF6B6B';
    }
    else if (variable1Level == 4 ) {
        var1Color = '#FFA500';
    }
    else if (variable1Level == 5 ) {
        var1Color = '#FF8C00';
    }


    if (variable2Level == 0 ) {
        var2Color = '#ADD8e6';
    }
    else if (variable2Level == 1 ) {
        var2Color = '#87CEEB';
    }
    else if (variable2Level == 2 ) {
        var2Color = '#B0E0E6';
    }
    else if (variable2Level == 3 ) {
        var2Color = '#4169E1';
    }
    else if (variable2Level == 4 ) {
        var2Color = '#000080';
    }
    else if (variable2Level == 5 ) {
        var2Color = '#008080';
    }

    let resultColor;
    console.log(var1Color, var2Color)
    resultColor = addHexColors(var1Color, var2Color);

    if (resultColor ==  undefined) {
        resultColor = 'lavendar'
    }
    return resultColor;
  };
  