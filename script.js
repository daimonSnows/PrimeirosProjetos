function atualizarRelogio() {
    const agora = new Date();
    const horas = agora.getHours().toString().padStart(2, '0');
    const minutos = agora.getMinutes().toString().padStart(2, '0');
    const segundos = agora.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').innerText = `${horas}:${minutos}:${segundos}`;
}

setInterval(atualizarRelogio, 1000);

/*aqui é a onde faz o relogio "funcionar" e a parte de animação*/
// Função que atualiza o relógio
function updateClock() {
    const clock = document.getElementById("clock");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

let alarmTime = null;
let alarmSound = new Audio('Shinunoga.mp3'); // Certifique-se de que o caminho do arquivo está correto
let alarmPlaying = false; // Variável para controlar se o alarme está tocando

// Função para configurar o alarme
function setAlarm() {
    alarmTime = document.getElementById("alarmTime").value;
    alert(`Alarme configurado para: ${alarmTime}`);
}

// Função para checar se o horário atual corresponde ao horário do alarme
function checkAlarm() {
    let currentTime = new Date();
    let formattedTime = currentTime.toISOString().substr(11, 5); // Pega a hora no formato HH:mm

    // Verifica se a hora atual é igual ao horário do alarme
    if (formattedTime === alarmTime && !alarmPlaying) {
        alarmPlaying = true;
        alarmSound.play(); // Toca a música
        document.getElementById("stopButton").style.display = 'block'; // Mostra o botão de parar alarme
    }
}

// Função para parar o alarme
function stopAlarm() {
    alarmSound.pause(); // Pausa a música
    alarmSound.currentTime = 0; // Reseta a música para começar do início
    alarmPlaying = false; // Marca que a música parou
    document.getElementById("stopButton").style.display = 'none'; // Esconde o botão de parar alarme
}

// Checa o alarme a cada 1 segundo
setInterval(checkAlarm, 1000);

// Função para exibir a data e hora
function updateDate() {
    const dateElement = document.getElementById("date");
    const now = new Date();
    
    // Formatação da data (Exemplo: 12 de Março de 2025)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('pt-BR', options);

    dateElement.textContent = formattedDate;
}

// Função para atualizar o fundo de vídeo com base na hora do dia
function updateBackground() {
    const hour = new Date().getHours();
    const video = document.getElementById("background-video");
    const videoSource = document.getElementById("video-source");
    let videoOptions = [];

    // Verifica o horário e atribui os vídeos correspondentes
    if (hour >= 5 && hour < 12) {
        // Manhã
        videoOptions = ["fundos/manha 1.mp4"];
    } else if (hour >= 12 && hour < 17) {
        // Tarde
        videoOptions = ["fundos/tarde 1.mp4", "fundos/tarde 2.mp4"];
    } else if (hour >= 17 && hour < 23) {
        // Noite
        videoOptions = ["fundos/noite 1.mp4", "fundos/noite 2.mp4"];
    } else {
        // Madrugada
        videoOptions = ["fundos/noite 1.mp4", "fundos/noite 2.mp4"];
    }

    // Escolhe aleatoriamente um dos vídeos da lista
    const randomVideo = videoOptions[Math.floor(Math.random() * videoOptions.length)];

    // Se o vídeo for diferente do atual, trocamos
    if (videoSource.src !== window.location.origin + "/" + randomVideo) {
        video.pause(); // Pausa antes de trocar
        videoSource.src = randomVideo; // Atualiza o src do vídeo
        video.load();  // Carrega o novo vídeo
        video.play().catch(error => console.error("Erro ao iniciar o vídeo:", error));  // Inicia a reprodução e captura erro se houver
    }
}

// Função para atualizar tanto a data quanto o fundo de vídeo
function updateAll() {
    updateDate();  // Atualiza a data
    updateBackground();  // Atualiza o fundo de vídeo
}

// Atualiza a data e o fundo ao carregar a página
window.onload = function() {
    updateAll();  // Atualiza tudo ao carregar

    // Atualiza a cada 1 hora (3600000 ms)
    setInterval(updateBackground, 3600000); 
    setInterval(updateDate, 60000);  // Atualiza a data a cada 1 minuto (60000 ms)
};




// Chave da API WeatherAPI
const apiKey = 'd592d4ea7c72482f94e163828251203';
const cidade = 'São Paulo';  // Aqui você pode usar a cidade que deseja
const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidade}&lang=pt`;

// Função para obter as informações meteorológicas
function obterClima() {
    fetch(url)
        .then(response => response.json())  // Converter resposta em JSON
        .then(data => {
            // Acessando os dados
            const temperatura = data.current.temp_c;  // Temperatura em °C
            const condicao = data.current.condition.text;  // Condição do clima (ex: Ensolarado)
            const icone = data.current.condition.icon;  // Ícone do clima

            // Exibindo os dados na página
            document.getElementById('temperatura').innerText = `Temperatura: ${temperatura}°C`;
            document.getElementById('condicao').innerText = `Condição: ${condicao}`;
            document.getElementById('icone-clima').src = `https:${icone}`;  // Atualiza o ícone
        })
        .catch(error => console.log('Erro ao obter dados do clima:', error));
}

// Chama a função para obter as informações do clima
obterClima();


function aplicarTema(tema) {
    document.body.classList.remove("tema-claro", "tema-escuro");
    document.body.classList.add(tema);
}

// Função para definir tema automaticamente
function ajustarTemaAutomaticamente() {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 18) {
        aplicarTema("tema-claro"); // Manhã e Tarde
    } else {
        aplicarTema("tema-escuro"); // Noite e Madrugada
    }
}

// Executa ao carregar a página
ajustarTemaAutomaticamente();


function aplicarTema(tema) {
    document.body.classList.remove("tema-claro", "tema-escuro");
    document.body.classList.add(tema);
}

// Troca o fundo corretamente
function trocarPapelDeParede() {
    const hora = new Date().getHours();
    const video = document.getElementById("background-video");

    if (hora >= 6 && hora < 12) {
        aplicarTema("tema-claro");
        video.src = "manha 1.mp4"; // Caminho do vídeo da manhã
    } else if (hora >= 12 && hora < 18) {
        aplicarTema("tema-escuro");
        video.src = "tarde.mp4"; // Caminho do vídeo da tarde
    } else {
        aplicarTema("tema-escuro");
        video.src = "noite.mp4"; // Caminho do vídeo da noite
        
    }
}

// Executa ao carregar a página
trocarPapelDeParede();
