/*
 pag2.js
 ---------
 Script responsável por inicializar os gráficos de visualização na página
 de dashboard. Utiliza a biblioteca Chart.js para renderizar:
 - Donut (NPS por setores)
 - Bar (Satisfação por setor)
 - Donut/Gauge simplificado (Satisfação média)

 Os dados aqui são estáticos (hard-coded) e servem como exemplo/dados
 mock para o protótipo. Para uso em produção, substituir pelos dados
 dinâmicos vindos do backend ou de uma API.
*/

document.addEventListener('DOMContentLoaded', function() {
    // Define a paleta de cores usada pelos gráficos, facilitando alteração
    const colors = {
        darkBlue: '#003399',
        mediumBlue: '#3366cc',
        lightBlue: '#6699ff',
        mutedBlue: '#4a76a8',
        grayBlue: '#1e2a44'
    };

    // NPS Chart (Donut)
    // - labels: setores analisados
    // - datasets.data: valores percentuais fictícios
    const npsCtx = document.getElementById('npsChart').getContext('2d');
    new Chart(npsCtx, {
        type: 'doughnut',
        data: {
            labels: ['Vendas', 'Finanças', 'Marketing', 'RH'],
            datasets: [{
                data: [55, 25, 15, 5],
                backgroundColor: [colors.mediumBlue, colors.darkBlue, colors.mutedBlue, colors.grayBlue],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#ffffff',
                        font: { size: 10 }
                    }
                }
            },
            cutout: '60%'
        }
    });

    // Sector Chart (Barras)
    // - mostra a pontuação por critério/área
    const sectorCtx = document.getElementById('sectorChart').getContext('2d');
    new Chart(sectorCtx, {
        type: 'bar',
        data: {
            labels: ['entrega', 'atendimento', 'limpeza', 'qualidade'],
            datasets: [{
                data: [60, 45, 80, 35],
                backgroundColor: [colors.darkBlue, colors.lightBlue, colors.mutedBlue, colors.mediumBlue],
                borderRadius: 10,
                barThickness: 40
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { color: '#ffffff', font: { size: 10 } },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                x: {
                    ticks: { color: '#ffffff', font: { size: 10 } },
                    grid: { display: false }
                }
            }
        }
    });

    // Gauge Chart (Satisfação Média)
    // - representa a média como um donut parcialmente preenchido
    const gaugeCtx = document.getElementById('gaugeChart').getContext('2d');
    new Chart(gaugeCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [67, 33],
                backgroundColor: [colors.darkBlue, 'rgba(255, 255, 255, 0.1)'],
                borderWidth: 0,
                circumference: 180,
                rotation: 270
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            cutout: '80%'
        }
    });
});