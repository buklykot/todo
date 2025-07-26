const inputElement = document.getElementById("title")
const createBtn = document.getElementById("create")
const listElement = document.getElementById("list")

const notes = [
  {
    title: "это пример задачи",
    completed: false,
  },
]
function render() {
  listElement.innerHTML = ""
  if (notes.length === 0) {
    listElement.innerHTML = "<p>Нет элементов</p>"
  }
  for (let i = 0; i < notes.length; i++) {
    listElement.insertAdjacentHTML("afterbegin", getNoteTemplate(notes[i], i))
  }
}

render()

createBtn.onclick = function () {
  if (inputElement.value.length === 0) {
    return
  }
  const newNote = {
    title: inputElement.value,
    completed: false,
  }
  notes.push(newNote)
  render()
  inputElement.value = ""
}

listElement.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = parseInt(event.target.dataset.index)
    const type = event.target.dataset.type

    if (type === "toggle") {
      notes[index].completed = !notes[index].completed
    } else if (type === "remove") {
      notes.splice(index, 1)
    }
    render()
  }
}

function getNoteTemplate(note, index) {
  return `<li
          class="list-group-item"
        >
                    <span class="btn-small btn-${
                      note.completed ? "warning" : "success"
                    }" data-index="${index}" data-type="toggle">&check;</span>
          <span class="${
            note.completed ? "text-decoration-line-through" : ""
          }">${note.title}</span>
          

            <span class="btn-small btn-danger" data-type="remove" data-index="${index}">&times;</span>
         
    </li>`
}

const output = document.getElementById("output-time")

function update() {
  const now = new Date()
  output.textContent =
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0")
}
update()
setInterval(update, 9800)

async function fetchWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Hrodna,by&APPID=f5b3adccf3a1a2d5b1442a5a066ba708&units=metric&lang=ru`
    )
    const data = await response.json()

    if (data.cod === 200) {
      const weatherInfo = `
        <p>🌡️ ${Math.round(data.main.temp)}°C (ощущается как ${Math.round(
        data.main.feels_like
      )}°C)</p>
         <p> <span id='weather-icon'></span> <span>${
           data.weather[0].description
         }<span></p>
        <p>💨 Ветер: ${data.wind.speed} м/с</p>
        <p>💧 Влажность: ${data.main.humidity}%</p>
      `
      document.getElementById("weather-info").innerHTML = weatherInfo
      const iconElement = document.getElementById("weather-icon")
      if (iconElement) {
        iconElement.innerHTML = getWeatherIcon(data.weather[0].icon)
      }
    }
  } catch (error) {
    console.error("Ошибка:", error)
    document.getElementById("weather-info").textContent =
      "Ошибка загрузки погоды"
  }
}

// Запускаем сразу и обновляем каждые 10 минут (600000 мс)
fetchWeather()
setInterval(fetchWeather, 600000)

function getWeatherIcon(weatherCode) {
  const icons = {
    "01d": "fa-sun",
    "01n": "fa-moon",
    "02d": "fa-cloud-sun",
    "02n": "fa-cloud-moon",
    "03d": "fa-cloud",
    "03n": "fa-cloud",
    "04d": "fa-cloud",
    "04n": "fa-cloud",
    "09d": "fa-cloud-rain",
    "09n": "fa-cloud-rain",
    "10d": "fa-cloud-sun-rain",
    "10n": "fa-cloud-moon-rain",
    "11d": "fa-bolt",
    "11n": "fa-bolt",
    "13d": "fa-snowflake",
    "13n": "fa-snowflake",
    "50d": "fa-smog",
    "50n": "fa-smog",
  }
  return `<i class="fas ${icons[weatherCode]}"></i>`
}

const images = [
  "images/image1.jpg",
  "images/image2.jpg",
  "images/image3.jpg",
  "images/image4.jpg",
  "images/image5.jpg",
  "images/image6.jpg",
  "images/image7.jpg",
  "images/image8.jpg",
  "images/image9.jpg",
  "images/image10.jpg",
];

function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

function updateImage() {
  const imgElement = document.getElementById("random-image");
  imgElement.src = getRandomImage();
  console.log("Картинка обновлена: ", imgElement.src);
}
updateImage();

const intervalMs = 2 * 60 * 60 * 1000; // 3 часа 
setInterval(updateImage, intervalMs);