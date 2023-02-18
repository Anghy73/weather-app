// Fecha
const date = new Date();

const diaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayp', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Obtubre', 'Noviembre', 'Dicienbre'];

const fecha = document.getElementById('fecha');

fecha.innerHTML = `${diaSemana[date.getDay()]} ${date.getDate()} ${meses[date.getMonth()]}`

// ubicacion

const API_KEY = "401a6a721d1ec9d3924a0aa8d50039a3";
let citieLocal;

const geolocation = () => {
  if ("geolocation" in navigator) {
    function obtenerCordenadas(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .then(res => res.json())
        .then(res => {
          citieLocal = res.name;
          fetchData();
        })
    }
    navigator.geolocation.getCurrentPosition(obtenerCordenadas);
  }
}

document.addEventListener('DOMContentLoaded', geolocation());

// Obtener Datos

let city = document.getElementById('city');
let search = document.getElementById('search');

const fetchData = async () => {
  let cityValue = city.value;
  if (cityValue == '') {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citieLocal}&units=metric&appid=${API_KEY}`)
    const json = await res.json();
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
  } else {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=${API_KEY}`)
      const json = await res.json();
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
      let contentError = document.getElementById('contentError');
      contentError.classList.toggle('content--error');
      let nofound = document.getElementById('nofound');
      nofound.innerHTML = `No results for ${cityValue}`;
      let clear = document.getElementById('clear');
      clear.classList.toggle('clear');
      clear.innerHTML = 'x';
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
  high.innerHTML = `${parseInt(obj.high)}°`
  let low = document.getElementById('low');
  low.innerHTML = `${parseInt(obj.low)}°`
  let pressure = document.getElementById('pressure');
  pressure.innerHTML = `${parseInt(obj.pressure)}`
  let humidity = document.getElementById('humidity');
  humidity.innerHTML = `${parseInt(obj.humidity)}%`

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

// Clear

clear.addEventListener('click', () => {
  nofound.innerHTML = '';
  clear.innerHTML = '';
  clear.classList.toggle('clear');
  contentError.classList.toggle('content--error');
})