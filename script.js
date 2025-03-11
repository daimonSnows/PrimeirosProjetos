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
