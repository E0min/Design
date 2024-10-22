document.addEventListener("DOMContentLoaded", () => {
    const apiKey = config.apiKey;  // config.js에서 API 키 가져오기

    // Geolocation API를 사용해 브라우저의 위치 정보 가져오기
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // OpenWeatherMap API URL
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

                // Fetch API를 사용하여 GET 요청 보내기
                fetch(apiUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP 오류! 상태: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        // API 응답 처리
                        console.log("날씨 데이터:", data);
                        displayWeather(data, lat, lon);
                        displayDateTime();
                    })
                    .catch(error => {
                        // 요청 중 발생한 오류 처리
                        console.error("날씨 데이터를 가져오는 중 오류 발생:", error);
                    });
            },
            error => {
                console.error("위치 정보 오류:", error);
                document.querySelector('.location').innerHTML = '위치 정보를 가져올 수 없습니다.';
            }
        );
    } else {
        document.querySelector('.location').innerHTML = '이 브라우저에서는 위치 정보가 지원되지 않습니다.';
    }

    // 날씨와 위치 데이터를 화면에 표시하는 함수
    function displayWeather(data, lat, lon) {
        const weatherKor = document.querySelector('.weatherKor');
        const weatherEng = document.querySelector('.weatherEng');
        const temperatureDiv = document.querySelector('.temperature');
        const latitudeElement = document.querySelector('.latitude');
        const longitudeElement = document.querySelector('.longitude');
        const locationElement = document.querySelector('.location');
        
        const { name, weather, main } = data;
        const state = weather[0].main;
        const temperature = (main.temp - 273.15).toFixed(2); // 켈빈에서 섭씨로 변환
        if(state=="Rain"){
            weatherKor.innerHTML = "비" ;     
        }else if(state=="Clear"){
            weatherKor.innerHTML = "맑음";
        }else if(state=="Clouds"){
            weatherKor.innerHTML = "흐림";
        }else if(state=="Snow"){
            weatherKor.innerHTML = "눈";
        }
        // 도시 이름, 날씨 상태, 온도를 HTML에 출력
        weatherEng.innerHTML = state;     // 날씨 상태 출력
        temperatureDiv.innerHTML = `${temperature} °C`;  // 온도 출력

        // 위도와 경도 출력
        latitudeElement.innerHTML = `${lat}`;
        longitudeElement.innerHTML = `${lon}`;

        // 도시 이름 설정
        locationElement.innerHTML = name;

        // 날씨 상태에 따라 data-weather 속성 동적으로 설정
        document.documentElement.setAttribute('data-weather', state.toLowerCase());
    }

    // 현재 날짜와 시간을 표시하는 함수
    function displayDateTime() {
        const now = new Date();

        // 월, 일, 시간 추출
        const month = now.getMonth() + 1;  // getMonth()는 0부터 시작하므로 +1 필요
        const day = now.getDate();
        const hours = now.getHours().toString().padStart(2, '0'); // 두 자리 숫자로 맞춤
        const minutes = now.getMinutes().toString().padStart(2, '0'); // 두 자리 숫자로 맞춤

        // 현재 월과 일을 화면에 표시
        document.querySelector('.month').textContent = month;
        document.querySelector('.day').textContent = day;

        // 현재 시간을 화면에 표시
        document.querySelector('.time').textContent = `${hours}:${minutes}`;
    }
});
