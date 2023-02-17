let city = document.getElementById('city');
let search = document.getElementById('search');

const API_KEY = "401a6a721d1ec9d3924a0aa8d50039a3";

const fetchData = async () => {
  let cityValue = city.value;
  if (cityValue == '') {
    return console.log('nothing');
  } else {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=${API_KEY}`)
      const json = await res.json();
      console.log(json);
      const obj = {
        city: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        description: json.weather[0].main,
        high: json.main.temp_max,
        low: json.main.temp_min,
        pressure: json.main.pressure,
        humidity: json.main.humidity
      }
      template(obj);
    } catch (error) {
      console.log(error);
    }
  }
}

const template = (obj) => {
  let country = document.getElementById('country');
  country.innerHTML = `${obj.city}, ${obj.country}`;
  let temp = document.getElementById('temp');
  temp.innerHTML = `${parseInt(obj.temp)}°`;
  let description = document.getElementById('description');
  description.innerHTML = `${obj.description}`;
  let high = document.getElementById('high');
  high.innerHTML = `${parseInt(obj.high)}`
  let low = document.getElementById('low');
  low.innerHTML = `${parseInt(obj.low)}`
  let pressure = document.getElementById('pressure');
  pressure.innerHTML = `${parseInt(obj.pressure)}`
  let humidity = document.getElementById('humidity');
  humidity.innerHTML = `${parseInt(obj.humidity)}`

  let img = document.getElementById('img');
  switch (obj.description) {
    case 'Clear':
      img.src = './img/sun.png';
      break;
    case 'Clouds':
      img.src = './img/clouds.png';
      break;
    case 'Rain':
      img.src = './img/raining.png';
      break;
    case 'Snow':
      img.src = './img/snowing.png';
      break;
    case 'Haze':
      img.src = './img/haze.png';
      break;
    default:
      img.src = './img/sun.png';
      break;
  }
}

search.addEventListener('click', fetchData);