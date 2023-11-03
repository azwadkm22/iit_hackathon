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



const getAQILevel = (countryName) => {
    let AQI_level;
    // if (countryName == "India")
    // {
    //     AQI_levels[countryName] = 5;
    // } 

    return AQI_Levels[countryName];
    //Add API calls here.
}

const getGDPLevel = (countryName) => {
    let GDP_level;
    if (countryName == "India")
    {
        GDP_level = 3;
    } 
    return GDP_level;
    // Add API calls here.
}

module.exports = (countryName) => {
    // let color;
    let var1Color;
    let variable1Level = getAQILevel(countryName);
    let variable2Level = getGDPLevel(countryName);

    // if (variable1Level == 0 ) {
    //     var1Color = '#FFDAB9';
    // }
    // else if (variable1Level == 1 ) {
    //     var1Color = '#FFD700';
    // }
    // else if (variable1Level == 2 ) {
    //     var1Color = '#FFB6C1';
    // }
    // else if (variable1Level == 3 ) {
    //     var1Color = '#FF6B6B';
    // }
    // else if (variable1Level == 4 ) {
    //     var1Color = '#FFA500';
    // }
    // else if (variable1Level == 5 ) {
    //     var1Color = '#FF8C00';
    // }


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
  