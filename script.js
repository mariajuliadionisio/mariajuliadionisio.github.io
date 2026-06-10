document.addEventListener('DOMContentLoaded', () => {
    
    const botaoTema = document.getElementById('btn-tema');

    if (botaoTema) {
        if (document.documentElement.classList.contains('dark-mode')) {
            botaoTema.textContent = '☀️';
        } else {
            botaoTema.textContent = '🌙';
        }

        botaoTema.addEventListener('click', () => {
            const mudouParaEscuro = document.documentElement.classList.toggle('dark-mode');
            
            if (mudouParaEscuro) {
                botaoTema.textContent = '☀️';
                localStorage.setItem('tema', 'dark');
            } else {
                botaoTema.textContent = '🌙';
                localStorage.setItem('tema', 'light');
            }
        });
    }

    const frases = [
        "O único modo de fazer um excelente trabalho é amar o que você faz. - Steve Jobs",
        "Código é como humor. Quando você tem que explicar, é ruim. - Cory House",
        "Simplicidade é a sofisticação máxima. - Leonardo da Vinci",
        "Sempre parece impossível até que seja feito. - Nelson Mandela"
    ];

    const botaoMensagem = document.getElementById('btn-mensagem');
    const paragrafoMensagem = document.getElementById('mensagem-dinamica');

    if (botaoMensagem && paragrafoMensagem) {
        botaoMensagem.addEventListener('click', () => {
            const indiceAleatorio = Math.floor(Math.random() * frases.length);
            paragrafoMensagem.textContent = frases[indiceAleatorio];
            
            paragrafoMensagem.style.opacity = 0;
            setTimeout(() => {
                paragrafoMensagem.style.opacity = 1;
                paragrafoMensagem.style.transition = 'opacity 0.4s';
            }, 50);
        });
    }
});