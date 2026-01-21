// ============================================
// MODELO B: FINDER MODERNO
// ============================================

// Dados de exemplo (em produção, viriam de uma API)
const imoveis = [
    {
        id: 1,
        tipo: 'apartamento',
        objetivo: ['morar', 'investir'],
        regiao: 'jardins',
        preco: 2800000,
        titulo: 'Apartamento Premium - Jardins',
        quartos: 3,
        suites: 2,
        area: 150,
        imagem: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    },
    {
        id: 2,
        tipo: 'cobertura',
        objetivo: ['investir', 'segunda'],
        regiao: 'vila-madalena',
        preco: 3200000,
        titulo: 'Cobertura Moderna - Vila Madalena',
        quartos: 2,
        suites: 2,
        area: 180,
        imagem: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'
    },
    {
        id: 3,
        tipo: 'casa',
        objetivo: ['morar', 'segunda'],
        regiao: 'alto-pinheiros',
        preco: 4500000,
        titulo: 'Casa com Jardim - Alto de Pinheiros',
        quartos: 4,
        suites: 3,
        area: 350,
        imagem: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
    },
    {
        id: 4,
        tipo: 'apartamento',
        objetivo: ['investir'],
        regiao: 'faria-lima',
        preco: 650000,
        titulo: 'Studio Executivo - Faria Lima',
        quartos: 1,
        suites: 0,
        area: 45,
        imagem: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    },
    {
        id: 5,
        tipo: 'apartamento',
        objetivo: ['morar', 'investir'],
        regiao: 'jardins',
        preco: 1900000,
        titulo: 'Apartamento 2 Quartos - Jardins',
        quartos: 2,
        suites: 1,
        area: 95,
        imagem: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop'
    },
    {
        id: 6,
        tipo: 'cobertura',
        objetivo: ['segunda', 'investir'],
        regiao: 'vila-olimpia',
        preco: 5200000,
        titulo: 'Cobertura Duplex - Vila Olímpia',
        quartos: 3,
        suites: 3,
        area: 280,
        imagem: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop'
    },
    {
        id: 7,
        tipo: 'apartamento',
        objetivo: ['morar'],
        regiao: 'alto-pinheiros',
        preco: 2200000,
        titulo: 'Apartamento 3 Quartos - Alto de Pinheiros',
        quartos: 3,
        suites: 2,
        area: 120,
        imagem: 'https://images.unsplash.com/photo-1600585152915-d0bec72a2885?w=800&h=600&fit=crop'
    },
    {
        id: 8,
        tipo: 'casa',
        objetivo: ['morar', 'segunda'],
        regiao: 'jardins',
        preco: 6800000,
        titulo: 'Casa Moderna - Jardins',
        quartos: 5,
        suites: 4,
        area: 450,
        imagem: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop'
    }
];

// Estado do wizard
let wizardState = {
    step: 1,
    perfil: null,
    faixa: null,
    tipo: null
};

// Comparador e Salvar
let comparadorItems = [];
let salvosItems = [];

function toggleSalvar(imovelId) {
    const index = salvosItems.indexOf(imovelId);
    const button = document.querySelector(`.resultado-card-save[data-id="${imovelId}"]`);
    
    if (index > -1) {
        salvosItems.splice(index, 1);
        if (button) button.classList.remove('selected');
    } else {
        salvosItems.push(imovelId);
        if (button) button.classList.add('selected');
    }
    
    // Salva no localStorage
    localStorage.setItem('imoveisSalvos', JSON.stringify(salvosItems));
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Carrega salvos do localStorage
    const salvos = localStorage.getItem('imoveisSalvos');
    if (salvos) {
        salvosItems = JSON.parse(salvos);
    }
    
    initWizard();
    initFilters();
    initComparador();
    
    // Lazy loading de imagens
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// ============================================
// WIZARD DE BUSCA
// ============================================

function initWizard() {
    const panels = document.querySelectorAll('.busca-wizard-panel');
    const steps = document.querySelectorAll('.busca-wizard-step');
    const btnProximo = document.getElementById('btn-proximo');
    const btnVoltar = document.getElementById('btn-voltar');
    const options = document.querySelectorAll('.busca-wizard-option');
    
    // Seleção de opções
    options.forEach(option => {
        option.addEventListener('click', function() {
            const panel = this.closest('.busca-wizard-panel');
            const panelNumber = parseInt(panel.dataset.panel);
            
            // Remove seleção de outras opções do mesmo painel
            panel.querySelectorAll('.busca-wizard-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Seleciona a opção clicada
            this.classList.add('selected');
            
            // Salva o valor
            switch(panelNumber) {
                case 1:
                    wizardState.perfil = this.dataset.value;
                    break;
                case 2:
                    wizardState.faixa = this.dataset.value;
                    break;
                case 3:
                    wizardState.tipo = this.dataset.value;
                    break;
            }
            
            // Habilita botão próximo
            if (btnProximo) {
                btnProximo.disabled = false;
            }
        });
    });
    
    // Botão Próximo
    if (btnProximo) {
        btnProximo.addEventListener('click', () => {
            if (wizardState.step < 3) {
                wizardState.step++;
                updateWizard();
            } else {
                // Último passo - buscar
                buscarImoveis();
            }
        });
    }
    
    // Botão Voltar
    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => {
            if (wizardState.step > 1) {
                wizardState.step--;
                updateWizard();
            }
        });
    }
}

function updateWizard() {
    const panels = document.querySelectorAll('.busca-wizard-panel');
    const steps = document.querySelectorAll('.busca-wizard-step');
    const btnProximo = document.getElementById('btn-proximo');
    const btnVoltar = document.getElementById('btn-voltar');
    
    // Atualiza painéis
    panels.forEach((panel, index) => {
        if (index + 1 === wizardState.step) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });
    
    // Atualiza steps
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber < wizardState.step) {
            step.classList.add('completed');
        } else if (stepNumber === wizardState.step) {
            step.classList.add('active');
        }
    });
    
    // Atualiza botões
    if (btnVoltar) {
        btnVoltar.disabled = wizardState.step === 1;
    }
    
    const btnBuscar = document.getElementById('btn-buscar');
    
    if (btnProximo) {
        if (wizardState.step === 3) {
            btnProximo.style.display = 'none';
            if (btnBuscar) btnBuscar.style.display = 'block';
        } else {
            btnProximo.style.display = 'block';
            if (btnBuscar) btnBuscar.style.display = 'none';
        }
        btnProximo.disabled = !hasSelectionForStep(wizardState.step);
    }
    
    if (btnBuscar) {
        btnBuscar.addEventListener('click', () => {
            buscarImoveis();
        });
        btnBuscar.disabled = !hasSelectionForStep(3);
    }
}

function hasSelectionForStep(step) {
    switch(step) {
        case 1: return wizardState.perfil !== null;
        case 2: return wizardState.faixa !== null;
        case 3: return wizardState.tipo !== null;
        default: return false;
    }
}

function buscarImoveis() {
    // Filtra imóveis baseado no wizardState
    let resultados = imoveis.filter(imovel => {
        // Perfil (mapeia para objetivo existente)
        if (wizardState.perfil) {
            const perfilMap = {
                'familia': 'morar',
                'investidor': 'investir',
                'primeira-compra': 'morar',
                'alto-padrao': 'morar'
            };
            const objetivoMapeado = perfilMap[wizardState.perfil];
            if (objetivoMapeado && !imovel.objetivo.includes(objetivoMapeado)) {
                return false;
            }
        }
        
        // Tipo
        if (wizardState.tipo && imovel.tipo !== wizardState.tipo) {
            return false;
        }
        
        // Faixa de preço
        if (wizardState.faixa) {
            const preco = imovel.preco;
            switch(wizardState.faixa) {
                case 'ate-1m':
                    if (preco > 1000000) return false;
                    break;
                case '1m-2m':
                    if (preco < 1000000 || preco > 2000000) return false;
                    break;
                case '2m-4m':
                    if (preco < 2000000 || preco > 4000000) return false;
                    break;
                case 'acima-4m':
                    if (preco < 4000000) return false;
                    break;
            }
        }
        
        return true;
    });
    
    // Exibe resultados
    exibirResultados(resultados);
    
    // Scroll para resultados
    const resultadosSection = document.getElementById('resultados');
    if (resultadosSection) {
        resultadosSection.style.display = 'block';
        resultadosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ============================================
// EXIBIÇÃO DE RESULTADOS
// ============================================

function exibirResultados(resultados) {
    const grid = document.getElementById('resultados-grid');
    const count = document.getElementById('resultados-total');
    
    if (!grid) return;
    
    // Atualiza contador
    if (count) {
        count.textContent = resultados.length;
    }
    
    // Limpa grid
    grid.innerHTML = '';
    
    // Adiciona cards
    resultados.forEach(imovel => {
        const card = criarCardImovel(imovel);
        grid.appendChild(card);
    });
    
    // Se não houver resultados
    if (resultados.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-light);">Nenhum imóvel encontrado com os critérios selecionados. Tente ajustar sua busca.</p>';
    }
}

function criarCardImovel(imovel) {
    const card = document.createElement('article');
    card.className = 'resultado-card';
    card.dataset.id = imovel.id;
    
    const precoFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0
    }).format(imovel.preco);
    
    // Verifica se está salvo
    const isSalvo = salvosItems.includes(imovel.id);
    const isComparando = comparadorItems.includes(imovel.id);
    
    card.innerHTML = `
        <img src="${imovel.imagem}" alt="${imovel.titulo}" class="resultado-card-image" loading="lazy">
        <div class="resultado-card-content">
            <h3 class="resultado-card-headline">Apartamento bem localizado, com planta funcional.</h3>
            <div class="resultado-card-info">
                <span>${imovel.quartos} quartos</span>
                ${imovel.suites > 0 ? `<span>${imovel.suites} suítes</span>` : ''}
                <span>${imovel.area}m²</span>
                <span>Bairro consolidado</span>
            </div>
            <div class="resultado-card-actions">
                <button class="resultado-card-action primary" onclick="window.location.href='imovel.html?id=${imovel.id}'">Ver imóvel</button>
                <a href="#" class="resultado-card-action secondary" target="_blank" data-whatsapp data-model="B" data-type="result" data-property-title="${imovel.titulo}" style="text-decoration: none; display: inline-block; text-align: center;">WhatsApp</a>
                <button class="resultado-card-save ${isSalvo ? 'selected' : ''}" data-id="${imovel.id}" onclick="toggleSalvar(${imovel.id})">
                    <span>💾</span> Salvar
                </button>
                <button class="resultado-card-compare ${isComparando ? 'selected' : ''}" data-id="${imovel.id}" onclick="toggleComparador(${imovel.id})">
                    <span>+</span> Comparar
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// ============================================
// FILTROS
// ============================================

function initFilters() {
    const filters = document.querySelectorAll('.resultados-filter');
    
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            filters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            const tipo = this.dataset.filter;
            filtrarPorTipo(tipo);
        });
    });
}

function filtrarPorTipo(tipo) {
    const cards = document.querySelectorAll('.resultado-card');
    
    cards.forEach(card => {
        if (tipo === 'todos') {
            card.style.display = 'block';
        } else {
            // Aqui você pode adicionar lógica para filtrar por tipo
            // Por enquanto, apenas mostra todos
            card.style.display = 'block';
        }
    });
}

// ============================================
// COMPARADOR
// ============================================

function initComparador() {
    const comparador = document.getElementById('comparador');
    const comparadorClose = document.getElementById('comparador-close');
    const comparadorLimpar = document.getElementById('comparador-limpar');
    const comparadorComparar = document.getElementById('comparador-comparar');
    
    if (comparadorClose) {
        comparadorClose.addEventListener('click', () => {
            comparador.classList.remove('active');
        });
    }
    
    if (comparadorLimpar) {
        comparadorLimpar.addEventListener('click', () => {
            comparadorItems = [];
            atualizarComparador();
        });
    }
    
    if (comparadorComparar) {
        comparadorComparar.addEventListener('click', () => {
            if (comparadorItems.length > 0) {
                // Aqui você pode abrir uma página de comparação detalhada
                alert(`Comparando ${comparadorItems.length} imóveis`);
            }
        });
    }
}

function toggleComparador(imovelId) {
    const index = comparadorItems.indexOf(imovelId);
    const comparador = document.getElementById('comparador');
    
    if (index > -1) {
        // Remove
        comparadorItems.splice(index, 1);
    } else {
        // Adiciona (máximo 3)
        if (comparadorItems.length < 3) {
            comparadorItems.push(imovelId);
        } else {
            alert('Você pode comparar no máximo 3 imóveis');
            return;
        }
    }
    
    atualizarComparador();
    
    // Mostra comparador se tiver itens
    if (comparadorItems.length > 0) {
        comparador.classList.add('active');
    } else {
        comparador.classList.remove('active');
    }
}

function atualizarComparador() {
    const grid = document.getElementById('comparador-grid');
    const count = document.getElementById('comparador-count');
    
    if (!grid) return;
    
    if (count) {
        count.textContent = comparadorItems.length;
    }
    
    grid.innerHTML = '';
    
    comparadorItems.forEach(id => {
        const imovel = imoveis.find(i => i.id === id);
        if (imovel) {
            const item = document.createElement('div');
            item.className = 'comparador-item';
            
            const precoFormatado = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0
            }).format(imovel.preco);
            
            item.innerHTML = `
                <img src="${imovel.imagem}" alt="${imovel.titulo}" class="comparador-item-image">
                <div class="comparador-item-title">${imovel.titulo}</div>
                <div style="font-size: 0.875rem; margin-bottom: 0.5rem; color: var(--text-light);">
                    ${imovel.quartos} quartos • ${imovel.area}m²
                </div>
                <div style="font-weight: 600; margin-bottom: 0.5rem;">${precoFormatado}</div>
                <button class="comparador-item-remove" onclick="toggleComparador(${imovel.id})">Remover</button>
            `;
            
            grid.appendChild(item);
        }
    });
}

// Função global para agendar visita (usa mensagem pré-preenchida)
function agendarVisita(imovelId) {
    const imovel = imoveis.find(i => i.id === imovelId);
    if (imovel && typeof getWhatsAppLink === 'function') {
        const link = getWhatsAppLink({
            model: 'B',
            type: 'result',
            propertyTitle: imovel.titulo
        });
        window.open(link, '_blank');
    }
}

