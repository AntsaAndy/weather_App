
        // Replace with your actual OpenWeatherMap API key
        const API_KEY = '125222fab2e0f7c5f96b39c10c7ba3ce';
        let currentUnit = 'metric';

        // DOM elements
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        const locationBtn = document.getElementById('locationBtn');
        const unitToggle = document.getElementById('unitToggle');
        const errorMessage = document.getElementById('errorMessage');
        const loadingDiv = document.getElementById('loadingDiv');
        const weatherContent = document.getElementById('weatherContent');
        const body = document.getElementById('body');

        // Weather icon mapping
        const getWeatherIcon = (icon) => {
            const iconMap = {
                '01d': '<svg class="w-full h-full text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
                '01n': '<svg class="w-full h-full text-blue-300" fill="currentColor" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
                '02d': '<svg class="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
                '02n': '<svg class="w-full h-full text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
                '03d': '<svg class="w-full h-full text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
                '03n': '<svg class="w-full h-full text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
                '04d': '<svg class="w-full h-full text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
                '04n': '<svg class="w-full h-full text-gray-700" fill="currentColor" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
                '09d': '<svg class="w-full h-full text-blue-500" fill="currentColor" viewBox="0 0 24 24"><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path></svg>',
                '09n': '<svg class="w-full h-full text-blue-600" fill="currentColor" viewBox="0 0 24 24"><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path></svg>',
                '10d': '<svg class="w-full h-full text-blue-500" fill="currentColor" viewBox="0 0 24 24"><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path></svg>',
                '10n': '<svg class="w-full h-full text-blue-600" fill="currentColor" viewBox="0 0 24 24"><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path></svg>',
                '11d': '<svg class="w-full h-full text-yellow-600" fill="currentColor" viewBox="0 0 24 24"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon></svg>',
                '11n': '<svg class="w-full h-full text-yellow-700" fill="currentColor" viewBox="0 0 24 24"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon></svg>',
                '13d': '<svg class="w-full h-full text-blue-200" fill="currentColor" viewBox="0 0 24 24"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line></svg>',
                '13n': '<svg class="w-full h-full text-blue-300" fill="currentColor" viewBox="0 0 24 24"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line></svg>',
                '50d': '<svg class="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
                '50n': '<svg class="w-full h-full text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>'
            };
            return iconMap[icon] || iconMap['01d'];
        };

        // Background gradient mapping
        const getWeatherBackground = (icon) => {
            if (icon.includes('01')) return 'from-yellow-400 via-orange-500 to-red-500';
            if (icon.includes('02') || icon.includes('03')) return 'from-blue-400 via-purple-500 to-purple-600';
            if (icon.includes('04')) return 'from-gray-400 via-gray-500 to-gray-600';
            if (icon.includes('09') || icon.includes('10')) return 'from-blue-600 via-blue-700 to-blue-800';
            if (icon.includes('11')) return 'from-gray-700 via-gray-800 to-black';
            if (icon.includes('13')) return 'from-blue-200 via-blue-300 to-blue-400';
            if (icon.includes('50')) return 'from-gray-300 via-gray-400 to-gray-500';
            return 'from-blue-400 via-blue-500 to-blue-600';
        };

        // Show/hide elements
        const showElement = (element) => element.classList.remove('hidden');
        const hideElement = (element) => element.classList.add('hidden');

        // Show error
        const showError = (message) => {
            errorMessage.textContent = message;
            showElement(errorMessage);
            hideElement(loadingDiv);
            hideElement(weatherContent);
        };

        // Show loading
        const showLoading = () => {
            hideElement(errorMessage);
            showElement(loadingDiv);
            hideElement(weatherContent);
        };

        // Fetch weather data
        const fetchWeather = async (query) => {
            if (API_KEY === 'YOUR_API_KEY_HERE') {
                showError('Please replace YOUR_API_KEY_HERE with your actual OpenWeatherMap API key in the code');
                return;
            }

            showLoading();

            try {
                const weatherResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=${currentUnit}`
                );
                
                if (!weatherResponse.ok) {
                    throw new Error('City not found');
                }

                const weatherData = await weatherResponse.json();
                
                const forecastResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${API_KEY}&units=${currentUnit}`
                );
                
                const forecastData = await forecastResponse.json();

                displayWeather(weatherData, forecastData);
            } catch (err) {
                showError(err.message || 'An error occurred');
            }
        };

        // Display weather data
        const displayWeather = (weatherData, forecastData) => {
            // Update background
            const backgroundGradient = getWeatherBackground(weatherData.weather[0].icon);
            body.className = `min-h-screen bg-gradient-to-br ${backgroundGradient} transition-all duration-1000`;

            // Current weather
            document.getElementById('location').textContent = `${weatherData.name}, ${weatherData.sys.country}`;
            document.getElementById('temperature').textContent = `${Math.round(weatherData.main.temp)}°`;
            document.getElementById('description').textContent = weatherData.weather[0].description;
            document.getElementById('feelsLike').textContent = `Feels like ${Math.round(weatherData.main.feels_like)}°`;
            document.getElementById('weatherIcon').innerHTML = getWeatherIcon(weatherData.weather[0].icon);
            document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
            });

            // Weather details
            document.getElementById('windSpeed').textContent = `${weatherData.wind.speed} ${currentUnit === 'metric' ? 'm/s' : 'mph'}`;
            document.getElementById('windDirection').textContent = `${weatherData.wind.deg}°`;
            document.getElementById('humidity').textContent = `${weatherData.main.humidity}%`;
            document.getElementById('pressure').textContent = weatherData.main.pressure;
            document.getElementById('visibility').textContent = (weatherData.visibility / 1000).toFixed(1);

            // 5-day forecast
            const dailyForecast = forecastData.list
                .filter((_, index) => index % 8 === 0)
                .slice(0, 5)
                .map(item => ({
                    date: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
                    temp: Math.round(item.main.temp),
                    tempMin: Math.round(item.main.temp_min),
                    tempMax: Math.round(item.main.temp_max),
                    description: item.weather[0].description,
                    icon: item.weather[0].icon
                }));

            const forecastHTML = dailyForecast.map(day => `
                <div class="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-200">
                    <p class="text-white/80 font-medium mb-2">${day.date}</p>
                    <div class="flex justify-center mb-2 w-8 h-8 mx-auto">
                        ${getWeatherIcon(day.icon)}
                    </div>
                    <p class="text-white font-bold text-lg">${day.temp}°</p>
                    <p class="text-white/70 text-sm">${day.tempMin}° / ${day.tempMax}°</p>
                    <p class="text-white/60 text-xs mt-1 capitalize">${day.description}</p>
                </div>
            `).join('');

            document.getElementById('forecast').innerHTML = forecastHTML;

            hideElement(errorMessage);
            hideElement(loadingDiv);
            showElement(weatherContent);
        };

        // Get current location
        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        showLoading();
                        
                        try {
                            const response = await fetch(
                                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${currentUnit}`
                            );
                            
                            if (response.ok) {
                                const data = await response.json();
                                searchInput.value = data.name;
                                fetchWeather(data.name);
                            }
                        } catch (err) {
                            showError('Unable to get current location weather');
                        }
                    },
                    () => {
                        showError('Location access denied');
                    }
                );
            }
        };

        // Toggle temperature unit
        const toggleUnit = () => {
            currentUnit = currentUnit === 'metric' ? 'imperial' : 'metric';
            unitToggle.textContent = `°${currentUnit === 'metric' ? 'C' : 'F'}`;
            
            if (searchInput.value.trim()) {
                fetchWeather(searchInput.value.trim());
            }
        };

        // Event listeners
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (searchInput.value.trim()) {
                fetchWeather(searchInput.value.trim());
            }
        });

        locationBtn.addEventListener('click', getCurrentLocation);
        unitToggle.addEventListener('click', toggleUnit);

        // Initialize with Madagascar (Antananarivo) as default
        window.addEventListener('load', () => {
            searchInput.value = 'Antananarivo';
            fetchWeather('Antananarivo');
        });
