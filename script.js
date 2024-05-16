// Função para calcular o custo total
function calcularCustoTotal() {
    var distanciaInput = document.getElementById('distance');
    var consumoInput = document.getElementById('consumption');
    var precoCombustivelInput = document.getElementById('fuelPrice');
    var capacidadeTanqueInput = document.getElementById('fuelTankCapacity');

    // Validar campos
    if (!validarCampos([distanciaInput, consumoInput, precoCombustivelInput, capacidadeTanqueInput])) {
        return;
    }

    // Remover a classe "empty" se os campos estiverem preenchidos
    distanciaInput.classList.remove('empty');
    consumoInput.classList.remove('empty');
    precoCombustivelInput.classList.remove('empty');
    capacidadeTanqueInput.classList.remove('empty');

    var distancia = parseFloat(distanciaInput.value);
    var consumoPorLitro = parseFloat(consumoInput.value);
    var precoCombustivel = parseFloat(precoCombustivelInput.value);
    var capacidadeTanque = parseFloat(capacidadeTanqueInput.value);

    var consumoDiario = distancia / consumoPorLitro;
    var custoDiario = consumoDiario * precoCombustivel;
    var custoMensal = custoDiario * 20;

    // Calcular custo por dia e por mês
    var custoDiarioFormatado = custoDiario.toFixed(2);
    var custoMensalFormatado = custoMensal.toFixed(2);

    // Exibir resultado
    var resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = `
        Considerando os valores inseridos, o custo total calculado é de R$${custoMensalFormatado} por mês.
        <br>
        Isso equivale a aproximadamente R$${custoDiarioFormatado} por dia.
    `;
    resultadoElement.classList.add('mostrar');

    // Calcular e exibir informações sobre o tanque
    var litrosNecessarios = (distancia / consumoPorLitro).toFixed(2);
    var tanquesNecessarios = Math.ceil(litrosNecessarios / capacidadeTanque);

    document.getElementById("info-capacidade").innerText = capacidadeTanque;
    document.getElementById("info-tanques").innerText = tanquesNecessarios;

    // Criação do gráfico
    criarGrafico(custoDiario, 20);

    // Exibir botão de compartilhamento
    document.getElementById("compartilhar").style.display = "block";
}

// Função para validar os campos
function validarCampos(inputs) {
    var isValid = true;

    inputs.forEach(function (input) {
        if (input.value === '') {
            input.classList.add('empty');
            isValid = false;
        } else {
            input.classList.remove('empty');
        }
    });

    return isValid;
}

// Função para criar ou atualizar o gráfico
// Função para criar ou atualizar o gráfico
function criarGrafico(custoDiario, diasPorMes) {
    var ctx = document.getElementById('graficoCustoMensal').getContext('2d');

    // Limpa o gráfico anterior
    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'bar',  // Altere o tipo para 'bar' para criar um gráfico de barras
        data: {
            labels: Array.from({ length: diasPorMes }, (_, i) => `Dia ${i + 1}`),
            datasets: [{
                label: 'Custo Diário ao Longo do Mês',
                data: Array.from({ length: diasPorMes }, (_, i) => custoDiario * (i + 1)),
                backgroundColor: 'rgba(70, 130, 180, 0.5)',  // Cor de fundo azul
            borderColor: 'rgba(70, 130, 180, 1)',        // Cor da borda azul
            borderWidth: 2
        }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function copiarNumeroPix() {
    /* Seleciona apenas o conteúdo do elemento strong */
    const chavePix = document.getElementById("chavePix");
    const textoSelecionado = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(chavePix);
    textoSelecionado.removeAllRanges();
    textoSelecionado.addRange(range);
    
    /* Copia o texto selecionado */
    document.execCommand("copy");
  
    /* Limpa a seleção */
    textoSelecionado.removeAllRanges();
  
    /* Mostra uma mensagem ou feedback ao usuário */
    alert("Número da Chave Pix copiado para a área de transferência!");
  }
  
  

// Função para compartilhar o resultado
function compartilharResultado() {
    var resultadoElement = document.getElementById('resultado');
    var mensagemCompartilhamento = `Confira meu resultado na Calculadora de Consumo de Combustível: ${resultadoElement.innerText}`;
    var urlCompartilhamento = window.location.href;

    // Verifica se o navegador suporta a API Web Share
    if (navigator.share) {
        navigator.share({
            title: 'Resultado da Calculadora de Consumo de Combustível',
            text: mensagemCompartilhamento,
            url: urlCompartilhamento
        })
            .then(() => console.log('Conteúdo compartilhado com sucesso.'))
            .catch((error) => console.error('Erro ao compartilhar:', error));
    } else {
        // Se a API não for suportada, exibe opções de compartilhamento
        var opcoesCompartilhamento = `
            <div>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${urlCompartilhamento}" target="_blank" rel="noopener noreferrer">Compartilhar no Facebook</a>
            </div>
            <div>
                <a href="https://twitter.com/intent/tweet?text=${mensagemCompartilhamento}&url=${urlCompartilhamento}" target="_blank" rel="noopener noreferrer">Compartilhar no Twitter</a>
            </div>
            <div>
                <a href="https://www.linkedin.com/sharing/share-offsite/?url=${urlCompartilhamento}" target="_blank" rel="noopener noreferrer">Compartilhar no LinkedIn</a>
            </div>
            <div>
                <a href="https://api.whatsapp.com/send?text=${mensagemCompartilhamento}" target="_blank" rel="noopener noreferrer">Compartilhar no WhatsApp</a>
            </div>
            <div>
                <a href="mailto:?subject=Resultado da Calculadora de Consumo de Combustível&body=${mensagemCompartilhamento}" target="_blank" rel="noopener noreferrer">Compartilhar por E-mail</a>
            </div>
        `;

        // Exibe as opções de compartilhamento
        alert("Escolha uma opção para compartilhar:\n\n" + opcoesCompartilhamento);
    }
}





