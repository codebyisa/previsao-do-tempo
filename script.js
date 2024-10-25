const apiKey = '95d278066d25ae37a11017aabfab3cae';

document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);  //verificar os dados no console

            if (data.cod === "404") {
                document.getElementById('weather-result').innerHTML = `<p>Cidade não encontrada!</p>`;
                return;
            }

            //limpa os resultados anteriores
            const forecastContainer = document.querySelector('.forecast-container');
            forecastContainer.innerHTML = '';

            //previsão atual (primeiro item da lista)
            const currentForecast = data.list[0];
            const temp = Math.round(currentForecast.main.temp);
            const minTemp = Math.round(currentForecast.main.temp_min);
            const maxTemp = Math.round(currentForecast.main.temp_max);
            const weatherDescription = currentForecast.weather[0].description;
            const icon = currentForecast.weather[0].icon;

            //cartão para o clima atual
            const currentCard = document.createElement('div');
            currentCard.className = 'forecast-card';
            currentCard.innerHTML = `
                <h3>Clima Atual - ${city}</h3>
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">
                <p>${temp} °C</p>
                <p>Min: ${minTemp} °C</p>
                <p>Max: ${maxTemp} °C</p>
                <p>Condição: ${weatherDescription}</p>
            `;

            forecastContainer.appendChild(currentCard);

            //dados para os próximos 2 dias, pulando de 24h em 24h
            for (let i = 8; i <= 16; i += 8) {
                const forecast = data.list[i];
                const date = new Date(forecast.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' });
                const dayTemp = Math.round(forecast.main.temp);
                const dayMinTemp = Math.round(forecast.main.temp_min);
                const dayMaxTemp = Math.round(forecast.main.temp_max);
                const dayDescription = forecast.weather[0].description;
                const dayIcon = forecast.weather[0].icon;

                //cartão para cada dia
                const dayCard = document.createElement('div');
                dayCard.className = 'forecast-card';
                dayCard.innerHTML = `
                    <h4>${date}</h4>
                    <img src="http://openweathermap.org/img/wn/${dayIcon}.png" alt="weather icon">
                    <p>${dayTemp} °C</p>
                    <p>Min: ${dayMinTemp} °C</p>
                    <p>Max: ${dayMaxTemp} °C</p>
                    <p>${dayDescription}</p>
                `;

                forecastContainer.appendChild(dayCard);
            }
        })
        .catch(error => {
            console.log('Erro:', error);
            document.getElementById('weather-result').innerHTML = `<p>Ocorreu um erro ao buscar a previsão do tempo.</p>`;
        });
});













