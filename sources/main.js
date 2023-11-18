const app = document.querySelector('.weather-web');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput=document.querySelector('.cloud');
const humidityOutput=document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
const col = document.querySelector('.col');
// default city 
let cityInput = 'ahmedabad';

//add click event on cities...
cities.forEach((city)=>{
    city.addEventListener('click',(e)=>{
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity="0";
    });
 
});

//form event...
// form.style.display='none';
form.addEventListener('submit', (e) => {
    if(search.value.length == 0) {
        alert('Please enter a city name');
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }

    e.preventDefault(); //it will prevent the page from reloading
});
function dayOfTheWeek(day,month,year){
    const Weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
    const date = new Date(year,month-1,day);
    if(isNaN(date)){
        return "Invalid Date";
    }
    return Weekdays[date.getDay()];
}


function fetchWeatherData(){
    fetch(`https://api.weatherapi.com/v1/current.json?key=e26ee2f87b994c98863100552231608&q=${cityInput}`)
        .then(Response => Response.json())
        .then(data=>{
            temp.innerHTML = data.current.temp_c + "&#176;";
            
            conditionOutput.innerHTML=data.current.condition.text;

            const date = data.location.localtime;
            const y = date.substr(0,4);
            const m = date.substr(5,2);
            const d = date.substr(8,2);
            const time = date.substr(11);//Saturday Aug 12 2023
            dateOutput.innerHTML = `${dayOfTheWeek(d,m,y)},${d}-${m}-${y}`;
            // alert(dayOfTheWeek(d,m,y) + d +  m + y );

            timeOutput.innerHTML=time;

            nameOutput.innerHTML=data.location.name;

            const iconId = data.current.condition.icon.substr(
                "//cdn.weatherapi.com/weather/64x64/".length);
            icon.src="/icons/"+iconId;

            cloudOutput.innerHTML=data.current.cloud+"%";
            humidityOutput.innerHTML=data.current.humidity+"%";
            windOutput.innerHTML=data.current.wind_kph+" km/h";

            let timeOfDay = "day";
            const code = data.current.condition.code;

            if(!data.current.is_day){
                timeOfDay="night";
            }
            
            if(code == 1000) {//Clear
                app.style.backgroundImage = `url(/image/${timeOfDay}/clear.avif)`;
                if(timeOfDay == "day") {
                    app.style.color='white';
                    var myInput = document.getElementById('myInput');
                    myInput.addEventListener('focus',function(){
                        myInput.style.color='white';
                    })
                }                
            } else if (//cloudy
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1169 ||
                code == 1187 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282
            ) {
                app.style.backgroundImage = `url(/image/${timeOfDay}/cloudy.avif)`;
                if(timeOfDay == "day") {
                    app.style.color='black';
                }
            } else if ( //rain

                code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252
            ) { 
                app.style.backgroundImage = `url(/image/${timeOfDay}/rain.avif)`;
                if(timeOfDay == "day") {
                    app.style.color='white';
                    var myInput = document.getElementById('myInput');
                    myInput.addEventListener('focus',function(){
                        myInput.style.color='white';
                    })
                }  
              
            } else { //snow
                app.style.backgroundImage = `url(/image/${timeOfDay}/snow.avif)`;
                if(timeOfDay == "day") {
                    app.style.color='white';
                    var myInput = document.getElementById('myInput');
                    myInput.addEventListener('focus',function(){
                        myInput.style.color='white';
                    })
                }  
            }


            app.style.opacity="1";

            
        }).catch(()=>{
            alert('city not found,please try again');
            app.style.opacity="1";
        })
}

//call fetch function...

fetchWeatherData();
app.style.opacity="1";