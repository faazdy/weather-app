import { useState, useEffect } from 'react'

function App() {
  const [city, setCity] = useState('London');
  const [dataApi, setDataApi] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  useEffect (() =>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`)
    .then(response => response.json())
    .then(data => setDataApi(data))
  .catch(error => console.error('Error fetching weather data:', error));
  }, [apiKey, city]);
  if (!dataApi) {
    return <div>Cargando...</div>;
  }
  console.log(dataApi);
  
  const weatherMain = dataApi.weather[0].main
  console.log(weatherMain.toLowerCase());

  return (
    <main className={`bg-${weatherMain.toLowerCase()}`}>
      <section className="card-weather">
        <h1>{dataApi ? dataApi.name : 'Cargando'}</h1>
        <div className="img">
          <img src={dataApi ? `http://openweathermap.org/img/wn/${dataApi.weather[0].icon}@2x.png` : ''}  />
        </div>
        <h2>{dataApi ? dataApi.weather[0].main : 'Loading'}</h2>
        <div className="data-w">
          <div className='data-w-icon'>
            <img src="./icons/temp.png" alt="icon" />
            <h4>{dataApi ? `${dataApi.main.temp} C` : 'Loading'}</h4>
          </div>
          <div className='data-w-icon'>
            <img src="./icons/cloudy.png" alt="icon" />
            <h4>{dataApi ? `Humidity: ${dataApi.main.humidity}%` : 'Loading'}</h4>
          </div>
          <div className='data-w-icon'>
            <img src="./icons/wind.png" alt="icon" />
            <h4>{dataApi ? `Wind: ${dataApi.wind.speed} m/s` : 'Loading'}</h4>
          </div>
        </div>
        <div className="input-city">
          <select name="" id="" onChange={(e) => setCity(e.target.value)}>
            <option value="London" onClick={() => setCity('London')}>London</option>
            <option value="bogota" onClick={() => setCity('Bogota')}>Bogota</option>
            <option value="New York" onClick={() => setCity('New York')}>New York</option>
            <option value="Madrid" onClick={() => setCity('Madrid')}>Madrid</option>
            <option value="Tokyo" onClick={() => setCity('Tokyo')}>Tokyo</option>
            <option value="Paris" onClick={() => setCity('Paris')}>Paris</option>
            <option value="Berlin" onClick={() => setCity('Berlin')}>Berlin</option>
            <option value="Rome" onClick={() => setCity('Rome')}>Rome</option>
            <option value="Moscow" onClick={() => setCity('Moscow')}>Moscow</option>
          </select>
        </div>
      </section>
    </main>
  )
}

export default App
