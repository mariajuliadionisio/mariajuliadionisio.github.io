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


const formularioContato = document.getElementById('meu-formulario');
const statusMensagem = document.getElementById('form-status'); 

if (formularioContato && statusMensagem) {
    formularioContato.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const botaoSubmeter = formularioContato.querySelector('.btn-submit-form');
        const textoOriginalBotao = botaoSubmeter.textContent;
        
        botaoSubmeter.textContent = 'Enviando...';
        botaoSubmeter.disabled = true;

        statusMensagem.textContent = '';
        statusMensagem.className = 'form-status-message'; 

        const formData = new FormData(formularioContato);
        
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            botaoSubmeter.textContent = textoOriginalBotao;
            botaoSubmeter.disabled = false;

            if (data.success) {
                statusMensagem.textContent = '✅ Mensagem enviada com sucesso! Obrigada pelo contato.';
                statusMensagem.style.color = '#28a745'; 
                statusMensagem.style.marginTop = '10px';
                statusMensagem.style.fontWeight = '600';
                
                formularioContato.reset(); 
            } else {
                statusMensagem.textContent = '❌ Ops! Ocorreu um erro ao tentar enviar. Tente novamente.';
                statusMensagem.style.color = '#dc3545'; 
                statusMensagem.style.marginTop = '10px';
                statusMensagem.style.fontWeight = '600';
            }
        })
        .catch(error => {
            botaoSubmeter.textContent = textoOriginalBotao;
            botaoSubmeter.disabled = false;
            
            statusMensagem.textContent = '❌ Erro de conexão. Verifique sua internet.';
            statusMensagem.style.color = '#dc3545';
            statusMensagem.style.marginTop = '10px';
            statusMensagem.style.fontWeight = '600';
            console.error('Erro no envio:', error);
        });
    });
}