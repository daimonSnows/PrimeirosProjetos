function atualizarRelogio() {
    const agora = new Date();
    const horas = agora.getHours().toString().padStart(2, '0');
    const minutos = agora.getMinutes().toString().padStart(2, '0');
    const segundos = agora.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').innerText = `${horas}:${minutos}:${segundos}`;
}

setInterval(atualizarRelogio, 1000);

/*aqui é a onde faz o relogio "funcionar" e a parte de animação*/
