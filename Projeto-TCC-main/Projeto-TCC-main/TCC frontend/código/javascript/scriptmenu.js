/*
 scriptmenu.js
 --------------
 Contém funções que desenham gráficos customizados no canvas HTML
 sem uso de bibliotecas externas (ex.: Chart.js). Cada função abaixo
 é responsável por um tipo de gráfico:
 - drawNpsChart: donut segmentado com labels e percentuais
 - drawSatisfacaoChart: gráfico de barras simples
 - drawGaugeChart: indicador tipo gauge mostrando porcentagem

 As funções são chamadas ao carregar e ao redimensionar a janela.
*/

/* ============================================
    GRÁFICO NPS (DONUT)
    Desenha um donut com seções representando categorias e seus valores.
    Cada fatia é rotulada com o rótulo e o percentual correspondente.
    ============================================ */

function drawNpsChart() {
    const canvas = document.getElementById('npsChart');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 70;
    const innerRadius = 45;

    // Dados do gráfico
    const data = [
        { label: 'Promotores', value: 45, color: '#4169E1' },
        { label: 'Passivos', value: 30, color: '#6495ED' },
        { label: 'Detratores', value: 15, color: '#1E40AF' },
        { label: 'Marketing', value: 10, color: '#0F172A' }
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -Math.PI / 2;

    // Limpar canvas antes de redesenhar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar segmentos (fatias) do donut
    data.forEach((item, index) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;

        // Desenhar segmento externo (arco entre ângulos atuais)
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.lineTo(centerX + innerRadius * Math.cos(currentAngle + sliceAngle), centerY + innerRadius * Math.sin(currentAngle + sliceAngle));
        ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();

        // Desenhar label centralizado na fatia com rótulo e valor
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelRadius = (radius + innerRadius) / 2;
        const labelX = centerX + labelRadius * Math.cos(labelAngle);
        const labelY = centerY + labelRadius * Math.sin(labelAngle);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.label, labelX, labelY - 5);
        ctx.fillText(item.value + '%', labelX, labelY + 8);

        currentAngle += sliceAngle;
    });
}

/* ============================================
    GRÁFICO DE BARRAS - SATISFAÇÃO POR SETOR
    Desenha barras verticais com valores percentuais e labels. O estilo
    (cores, fontes) é definido aqui para combinar com o tema.
    ============================================ */

function drawSatisfacaoChart() {
    const canvas = document.getElementById('satisfacaoChart');
    const ctx = canvas.getContext('2d');

    const data = [
        { label: 'entrega ', value: 75 },
        { label: 'atendimento ', value: 60 },
        { label: 'empresa ', value: 90 },
        { label: 'qualidade ', value: 45 }
    ];

    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const barWidth = chartWidth / (data.length * 1.5);
    const maxValue = 100;

    // Limpar canvas antes de desenhar o gráfico
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar eixo Y (linha e ticks)
    ctx.strokeStyle = '#1a2f52';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();

    // Desenhar eixo X
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Desenhar labels do eixo Y e linhas de grade para facilitar leitura
    ctx.fillStyle = '#1a2f52';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 100; i += 20) {
        const y = canvas.height - padding - (i / maxValue) * chartHeight;
        ctx.fillText(i, padding - 10, y + 4);
        
        // Grid lines
        ctx.strokeStyle = 'rgba(26, 47, 82, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    }

    // Desenhar barras correspondentes aos dados
    data.forEach((item, index) => {
        const x = padding + index * (chartWidth / data.length) + (chartWidth / data.length - barWidth) / 2;
        const barHeight = (item.value / maxValue) * chartHeight;
        const y = canvas.height - padding - barHeight;

        // Barra (com cor condicional para destacar uma barra específica)
        ctx.fillStyle = index === 2 ? '#1E40AF' : (index === 1 ? '#4169E1' : '#6495ED');
        ctx.fillRect(x, y, barWidth, barHeight);

        // Label
        ctx.fillStyle = '#1a2f52';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, x + barWidth / 2, canvas.height - padding + 20);

        // Valor na barra (texto centralizado sobre a vertical)
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(item.value, x + barWidth / 2, y + barHeight / 2);
    });
}

/* ============================================
    GAUGE DE SATISFAÇÃO MÉDIA
    Desenha um semicírculo preenchido proporcional ao valor (porcentagem).
    O restante do semicirculo é desenhado com tom mais claro para indicar
    a parte não preenchida.
    ============================================ */

function drawGaugeChart() {
    const canvas = document.getElementById('gaugeChart');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 35;
    const value = 67; // 67%

    // Limpar canvas antes de desenhar o gauge
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar fundo do gauge (linha base do semicirculo)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
    ctx.stroke();

    // Desenhar gauge preenchido de acordo com o valor percentual
    const angle = Math.PI + (value / 100) * Math.PI;
    ctx.strokeStyle = '#1E40AF';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, angle);
    ctx.stroke();

    // Desenhar texto central com a porcentagem
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(value + '%', centerX, centerY);
}

/* ============================================
    INICIALIZAÇÃO
    Chama as funções de desenho ao carregar a página e ao redimensionar
    para manter os gráficos responsivos.
    ============================================ */

window.addEventListener('load', () => {
    drawNpsChart();
    drawSatisfacaoChart();
    drawGaugeChart();
});

/* ============================================
   REDIMENSIONAMENTO DA JANELA
   ============================================ */

window.addEventListener('resize', () => {
    drawNpsChart();
    drawSatisfacaoChart();
    drawGaugeChart();
});

/* ============================================
   INTERATIVIDADE - NAVEGAÇÃO
   ============================================ */

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

/* ============================================
   INTERATIVIDADE - ÍCONES DE ESTRELA
   ============================================ */

document.querySelectorAll('.star-icon').forEach(star => {
    star.addEventListener('click', function() {
        this.style.color = this.style.color === 'rgb(255, 215, 0)' ? '#b0c4de' : '#ffd700';
    });
});