// Configuración global para los gráficos
Chart.defaults.font.family = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
Chart.defaults.color = '#334155';

let chartPagosInstance = null;
let chartResultadosInstance = null;

function showTab(tabId) {
    // Ocultar todos los contenidos
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Desactivar todos los botones
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Activar pestaña actual
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');

    // Renderizar gráfico correspondiente
    if(tabId === 'tab1') {
        renderChartPagos();
    } else if(tabId === 'tab2') {
        renderChartResultados();
    }
}

// Gráfico 1: Correlación de Pagos vs Retraso
function renderChartPagos() {
    const ctx = document.getElementById('chartPagos').getContext('2d');
    
    if (chartPagosInstance) chartPagosInstance.destroy();

    const data = [
        {x: 20, y: 5}, {x: 45, y: 12}, {x: 70, y: 25}, 
        {x: 90, y: 45}, {x: 120, y: 75}, {x: 150, y: 110}
    ];

    chartPagosInstance = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Tiempo de Retraso vs Volumen',
                data: data,
                backgroundColor: '#0284c7',
                borderColor: '#0284c7',
                pointRadius: 8,
                pointHoverRadius: 12,
                showLine: true,
                fill: false,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: {
                    labels: { font: { size: 16, weight: 'bold' } }
                },
                tooltip: {
                    titleFont: { size: 16 },
                    bodyFont: { size: 16 },
                    padding: 15,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.x + ' Comprobantes | ' + context.parsed.y + ' min de retraso';
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Volumen de Comprobantes (Unidades)', font: { size: 16, weight: 'bold' } },
                    ticks: { font: { size: 14 } }
                },
                y: {
                    title: { display: true, text: 'Retraso de Verificación (Minutos)', font: { size: 16, weight: 'bold' } },
                    ticks: { font: { size: 14 } }
                }
            }
        }
    });
}

// Gráfico 2: Correlación de Exámenes vs Tiempo de Envío
function renderChartResultados() {
    const ctx = document.getElementById('chartResultados').getContext('2d');
    
    if (chartResultadosInstance) chartResultadosInstance.destroy();

    const data = [
        {x: 10, y: 15}, {x: 30, y: 50}, {x: 50, y: 95}, 
        {x: 80, y: 145}, {x: 110, y: 210}, {x: 140, y: 270}
    ];

    chartResultadosInstance = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Tiempo Invertido vs Exámenes',
                data: data,
                backgroundColor: '#0ea5e9',
                borderColor: '#0ea5e9',
                pointRadius: 8,
                pointHoverRadius: 12,
                showLine: true,
                fill: false,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeOutBounce'
            },
            plugins: {
                legend: {
                    labels: { font: { size: 16, weight: 'bold' } }
                },
                tooltip: {
                    titleFont: { size: 16 },
                    bodyFont: { size: 16 },
                    padding: 15,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.x + ' Exámenes | ' + context.parsed.y + ' min invertidos';
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Exámenes Validados (Unidades)', font: { size: 16, weight: 'bold' } },
                    ticks: { font: { size: 14 } }
                },
                y: {
                    title: { display: true, text: 'Tiempo de Envío Manual (Minutos)', font: { size: 16, weight: 'bold' } },
                    ticks: { font: { size: 14 } }
                }
            }
        }
    });
}

// Iniciar renderizando el primer gráfico al cargar la página
window.onload = () => {
    renderChartPagos();
};