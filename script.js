
// http://api.weatherapi.com/v1/current.json?key=89380fd65f764c80ac0202527251003&q=damoh&aqi=yes

//this for forcast
// /http://api.weatherapi.com/v1/forecast.json?key=89380fd65f764c80ac0202527251003&q=damoh&days=6&aqi=yes&alerts=yes


let mainBG = document.querySelector(".bg-image")
let searchLoc = document.querySelector(".searchInput")
let searcIcon = document.querySelector(".search-icon")

let message = document.querySelector(".message")
let wind = document.querySelector(".speed")
let pressure = document.querySelector(".pressure")
let otherConditions = document.querySelector(".other-conditions")
let condition = document.querySelector(".condition")


let windDir = document.querySelector(".windDir")
let sunset = document.querySelector(".sunset")
let feelsLike = document.querySelector(".feelsLike")
let humidity = document.querySelector(".Humidity")
let Aqi = document.querySelector(".Aqi")

let temperature = document.querySelector(".temperature")
let areaLoca = document.querySelector(".area-location")
let tempImg = document.querySelector(".temp-image")

let dateTime = document.querySelector(".date-time")
let currDate = document.querySelector(".date")
let currTime = document.querySelector(".time")
let currDay = document.querySelector(".day")
let seconds = document.querySelector(".seconds")



let searchValue;

searcIcon.addEventListener("click", () => {
    searchValue = searchLoc.value.trim();

    mainBG.style.opacity = .2

    if (searchValue === "") {
       
       
        alert("Please enter the Location")
         
        mainBG.src="./src/bgggg.jpg"
        mainBG.style.opacity=1;

        
           resetAll()

        return
        
         }

    else {
        
        FetchData(searchValue);

    }


})




async function FetchData(locationName) {

    try {

        let url = `http://api.weatherapi.com/v1/forecast.json?key=89380fd65f764c80ac0202527251003&q=${locationName}&days=7&aqi=yes&alerts=yes`

        let resp = await fetch(url);

        if (!resp.ok) {
            throw new Error(`Location not found. Please try again.`);
            resetAll();
        }

        let data = await resp.json();
        console.log(data);

        setTimeout(() => {

            mainBG.style.opacity = 1
        }, 200)


        // for making location name smaller if its too long
        function makeFixLocationText(locationName) {
            if (locationName.length > 8) {
                return locationName.slice(0, 8) + "..."
            }
            else {
                return locationName
            }
        }
        //   makeFixLocationText(locationName)


        // addingAnimation



        areaLoca.innerHTML = makeFixLocationText(data.location.name)
        temperature.innerHTML = data.current.temp_c;
        wind.innerHTML = data.current.wind_kph;
        pressure.innerHTML = data.current.pressure_mb;


        condition.innerHTML = data.current.condition.text;
        windDir.innerHTML = data.current.wind_dir
        feelsLike.innerHTML = data.current.feelslike_c
        Aqi.innerHTML = data.current.air_quality.pm10;
        humidity.innerHTML = data.current.humidity + "%"
        tempImg.src = data.current.condition.icon


        // for date and time 
        let currDatetime = data.location.localtime;
        let today = new Date().getDay();



        function dateTime(currDatetime, today) {
            let date_Time = currDatetime.split(" ");

            currDate.innerHTML = date_Time[0];
            currTime.innerHTML = date_Time[1];

            let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            currDay.innerHTML = week[today];

        }

        dateTime(currDatetime, today);





        let CurrentTemp = data.current.temp_c;

        updateBackground(CurrentTemp);


        // condition for rain

        let weatherCondition = data.current.condition.text.toLowerCase();
        if (weatherCondition.includes("rain") || weatherCondition.includes("drizzle") || weatherCondition.includes("shower")) {
            mainBG.src = "./src/rainy.webp"; // Use your rainy background image here
        }





        // now for the upcoming 6 days forcast
        // it took me a long time to think by my own howto extact data and use it here

        let weekdays = data.forecast.forecastday
        //   console.log(weekdays);
        let forecastDays = document.querySelectorAll(".forecast-day")
        //  console.log(forecastDays);
          
        forecastDays.forEach((elem,index)=>{

            let date = elem.querySelector(".day-date")
            let dayCondition = elem.querySelector(".day-condition")
            let dayIcon = elem.querySelector(".day-icon")
            let dayTemp= elem.querySelector(".dayTemp")
            

            date.innerHTML= weekdays[index+1].date;
            dayCondition.innerHTML= weekdays[index+1].day.condition.text;
            dayIcon.src= weekdays[index+1].day.condition.icon;
            dayTemp.innerHTML= weekdays[index+1].day.avgtemp_c;         
        })


    }

    catch (err) {
        console.error("Error fetching data:", err.message);
        alert("Location not found. Please try again.");
        resetAll();

    }


}

function updateBackground(temp) {

    if (temp <= 0) {
        message.innerHTML = "❄️ Freezing Cold - Stay warm!";
        mainBG.src = './src/below0.webp';


    }
    else if (temp > 0 && temp <= 10) {
        message.innerHTML = "🌨️ Very Cold - Heavy jackets required.";
        mainBG.src = './src/0-5.webp';
    }
    else if (temp > 10 && temp <= 15) {
        message.innerHTML = "🌫️ Cold & Foggy - Visibility may be low.";
        mainBG.src = './src/10-15.webp';
    }
    else if (temp > 15 && temp <= 25) {
        message.innerHTML = "🌤️ Cool & Pleasant - Perfect weather!";
        mainBG.src = './src/15-25.webp';
    }
    else if (temp > 25 && temp <= 30) {
        message.innerHTML = "☀️ Mildly Warm - Enjoy the outdoors.";
        mainBG.src = './src/25-30.webp';
    }
    else if (temp > 30 && temp <= 38) {
        message.innerHTML = "🔥 Hot - Stay hydrated!";
        mainBG.src = './src/30-38.webp';
    }
    else if (temp > 38 && temp <= 41) {
        message.innerHTML = "🥵 Very Hot - Avoid going out in the sun.";
        mainBG.src = './src/38-41.webp';
    }
    else if (temp > 41) {
        message.innerHTML = "🌋 Extreme Heat - Stay indoors and stay cool!";
        mainBG.src = './src/morethan41.webp';

    }


}







//reset everything
function resetAll(){

    

    mainBG.src="./src/bgggg.jpg"
    mainBG.style.opacity=1;

    message.innerHTML=""
    condition.innerHTML=""
    windDir.innerHTML=""
    feelsLike.innerHTML=""
    humidity.innerHTML=""
    Aqi.innerHTML=""
    temperature.innerHTML="--"
    areaLoca.innerHTML="--"
    tempImg.src="./src/bg.webp"
    wind.innerHTML="--"
    pressure.innerHTML="--"
    
    currDate.innerHTML = "Date";
    currTime.innerHTML = "Time";
    currDay.innerHTML = "Day";


    // now to reset forcast boxes
    let forecastBoxes= document.querySelectorAll(".forecast-day")
    forecastBoxes.forEach((elem)=>{
        let date= elem.querySelector(".day-date");
        let dayCondition= elem.querySelector(".day-condition");
        let dayIcon= elem.querySelector(".day-icon");
        let dayTemp= elem.querySelector(".dayTemp");

          date.innerHTML="Date"
          dayCondition.innerHTML="--";
          dayIcon.src="src/bg.webp";
          dayTemp.innerHTML=""
    })
  }






  // someanimations
  let locaTemp = document.querySelector(".loca-temp"); 

  
  locaTemp.addEventListener("mouseenter", () => {
      locaTemp.style.transform = "scale(1.1)";
      tempImg.style.transform = "rotate(360deg)";
  });
  
  locaTemp.addEventListener("mouseleave", () => {
      locaTemp.style.transform = "scale(1)";
      tempImg.style.transform = "rotate(0deg)";
  });







