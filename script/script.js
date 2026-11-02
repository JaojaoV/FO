
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
let cor = '#ba6565ff';

const endpoint = 'https://ejikqsbtnyqljgilsqfv.supabase.co/rest/v1/personagem?order=id.asc';
const endpointcru = 'https://ejikqsbtnyqljgilsqfv.supabase.co/rest/v1/personagem';
const endpointrunas = 'https://ejikqsbtnyqljgilsqfv.supabase.co/rest/v1/runas';
const endpointpaginas = 'https://ejikqsbtnyqljgilsqfv.supabase.co/rest/v1/paginas';
const apiKey = 'sb_publishable_1FxEcEhiinLicoKaerN8Wg_9MxAfA2L';
// const apiKey = 'sb_secret_9QO92fwpN2MsnruBSLuh3A_0rFReqb9';
pericias = [
  "Atletismo",
  "Busca",
  "Ciências",
  "Crime",
  "Interação",
  "Luta",
  "Mira",
  "Misticismo",
  "Ofício",
  "Sobrevivência",
  "Tecnologia",
  "Vontade"
];

const corpo = document.getElementById('corpov');
const mente = document.getElementById('mentev');
const espirito = document.getElementById('espiritov');
const titulo = document.querySelector('.titulo');
const h1 = document.getElementById('1');
const h2 = document.getElementById('2');
const h3 = document.getElementById('3');
const l1 = document.getElementById('4');
const l2 = document.getElementById('5');
const l3 = document.getElementById('6');
const itens = document.getElementById('itens');
const listai = document.getElementById('listai');
const colorpicker = document.getElementById('colorpicker');
const paginasdiv = document.getElementById('paginas');
const divview = document.getElementById('fotoAbrida');
const fundoescuro = document.getElementById('black-overlay');
const imgcapa = document.getElementById('capa');

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

var cadernoAberto = false;
function AbrirCaderno() {
  if (imgcapa) imgcapa.innerHTML = '';
  imgcapa.appendChild(document.createElement('img')).src = '/imagens/capa_pingente.png';
  delay(300).then(() => {
    if (paginasdiv) paginasdiv.style.display = 'flex';
    if (imgcapa) imgcapa.style.display = 'none';

    cadernoAberto = true;
  })
}
function FecharCaderno() {
  if (cadernoAberto === true) {
    if (paginasdiv) paginasdiv.style.display = 'none';
    if (imgcapa) imgcapa.style.display = 'block';
    if (pingentearr) pingentearr.style.display = 'block';
    if (pingentesair) pingentesair.style.display = 'none'
    cadernoAberto = false;
  }

}
async function CarregarPaginas() {
  try {
    const resposta = await fetch(endpointpaginas, {
      method: 'GET',
      headers: {
        'apikey': apiKey,
        'Content-Type': 'application/json'
      }
    })
    paginas = await resposta.json();
    console.log("resposta: ", resposta);
    console.log("paginas: ", paginas);

    exibir = paginas.filter(item => item.status === true);
    exibir.forEach(pagina => {
      const paginad = document.createElement('div');
      paginad.classList.add('pagina')
      const imgpage = document.createElement('img')
      imgpage.src = pagina.imagem;
      const btn = document.createElement('button');
      btn.classList.add('btn-pagina');
      btn.setAttribute('onclick', `AbrirPagina('${pagina.imagem}')`);

      btn.appendChild(imgpage);
      paginad.appendChild(btn);
      paginasdiv.appendChild(paginad);

    })

    console.log("Exibir: ", exibir)

  }
  catch (error) {
    console.error('Erro:', error);
  }
}

function MoverCarrossel(direcao) {
    const paginas = document.getElementById('paginas');

    const larguraPagina = paginas.clientWidth / 2;

    // Remove animações anteriores
    paginas.classList.remove(
        'virando-direita',
        'virando-esquerda'
    );

    // Força o navegador a reiniciar a animação
    void paginas.offsetWidth;

    // Adiciona a animação correspondente
    if (direcao > 0) {
        paginas.classList.add('virando-direita');
    } else {
        paginas.classList.add('virando-esquerda');
    }

    // Passa as páginas
    paginas.scrollBy({
        left: larguraPagina * direcao,
        behavior: 'smooth'
    });

    // Remove a classe depois da animação
    setTimeout(() => {
        paginas.classList.remove(
            'virando-direita',
            'virando-esquerda'
        );
    }, 450);
}

let imgaberto = false;
function AbrirPagina(url) {

  if (divview) divview.style.display = 'block';
  if (fundoescuro) fundoescuro.style.display = 'block';
  const fotoAberta = document.createElement('img');
  fotoAberta.classList.add('fotoAberta');
  divview.appendChild(fotoAberta);
  fotoAberta.src = url;
  imgaberto = true;
}

function FecharPagina() {
  if (divview) divview.style.display = 'none';
  if (fundoescuro) fundoescuro.style.display = 'none';
  divview.innerHTML = "";
  imgaberto = false;
}
async function carregarDados() {
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'apikey': apiKey,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const apiData = await response.json();
    const boneco = apiData.find(personagem => String(personagem.id) === String(id));
    corpo.innerText = `: ${boneco.corpo}`;
    mente.innerText = `: ${boneco.mente}`;
    espirito.innerText = `: ${boneco.espirito}`;
    cor = `${boneco.cor}`;
    titulo.innerText = `${boneco.nome}`;
    // titulo.style.color = cor;
    const root = document.documentElement;
    root.style.setProperty('--cor', `${cor}`);

    h1.innerText = `${pericias[boneco.habilidades[0]]} +1d8`;

    h2.innerText = `${pericias[boneco.habilidades[1]]} +1d6`;
    h3.innerText = `${pericias[boneco.habilidades[2]]} +1d4`;
    l1.innerText = `• ${pericias[boneco.limitacoes[0]]}`;
    l2.innerText = `• ${pericias[boneco.limitacoes[1]]}`;
    l3.innerText = `• ${pericias[boneco.limitacoes[2]]}`;
    colorpicker.value = `${boneco.cor}`;
    boneco.itens.forEach(element => {
      const item = document.createElement('div');
      item.classList.add('item')
      item.innerText = `•${element.quantidade}x ${element.nome}`;
      const btnmenos = document.createElement('button');
      btnmenos.innerText = '-';
      btnmenos.setAttribute('onclick', `diminuirQuantidadeItem('${element.nome}')`);
      btnmenos.classList.add('item_menos')
      item.appendChild(btnmenos);
      listai.appendChild(item)
      itens.appendChild(listai);

    });

    console.log(boneco.runas)
    buscarRunas(boneco.runas);


  } catch (error) {
    console.error('Erro:', error);

  }
}

carregarDados();
CarregarPaginas();

async function TrocarCor(cornova) {
  const resPatch = await fetch(`${endpointcru}?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'apikey': apiKey,
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({
      cor: cornova
    })

  });
  carregarDados();
  limparitens();
}

function limparitens() {
  listai.innerHTML = "";
}

const botao = document.querySelectorAll('titulo-btn');

const corpocont = document.getElementById('corpo');
const mentecont = document.getElementById('mente');
const espiritocont = document.getElementById('espirito');

function adicionarMarca(nome) {

  const area = document.getElementById(nome);


  triggerDamageFlash();


  if (area.children.length < 5) {
    // const Marca = document.createElement('p');
    // Marca.innerText = "X";
    const Marca = document.createElement('img');
    Marca.classList.add('marca');
    Marca.src = "../imagens/x.png";
    // Marca.innerText = "X";

    Marca.style.color = `${cor}`

    area.appendChild(Marca);
    triggerDamageFlash();
  }
  if (corpocont.children.length >= 4) {

    setCriticalHealth(true);
  }
  else {
    setCriticalHealth(false)
  }
  if (mentecont.children.length >= 4) {
    setCriticalMental(true);
  }
  else {
    setCriticalMental(false);
  }


}
function removerMarca(nome) {
  const area = document.getElementById(nome);


  if (area.children.length > 0) {
    const Marca = area.querySelectorAll('img');
    Marca[0].remove();
  }

  if (corpocont.children.length >= 4) {

    setCriticalHealth(true);
  }
  else {
    setCriticalHealth(false)
  }

  if (mentecont.children.length >= 4) {
    setCriticalMental(true);
  }
  else {
    setCriticalMental(false);
  }

}
let c = 0;
let m = 0;
let e = 0;
let add = 0;
let timer = null


function addValor(id) {



  const area = document.getElementById(id);
  area.innerText = "";
  if (id == 'corpoadd') {
    c++;
    add = c;
  }
  if (id == 'menteadd') {
    m++;
    add = m;
  }
  if (id == 'espiritoadd') {
    e++;
    add = e;
  }
  console.log('+')

  if (add == 0) {
    area.innerText = null;
  }
  else if (add > 0) {
    area.innerText = `+${add}`;
    area.style.color = cor;
  }
  else {
    area.innerText = `${add}`;
    area.style.color = 'red';

  }
}
function addVal(id) {
  clearTimeout(timer);

  timer = setTimeout(() => {
    addValor(id);
  }, 250);
}
function subValor(id) {

  const area = document.getElementById(id);
  area.innerText = "";
  if (id == 'corpoadd') {
    c--;
    add = c;
  }
  if (id == 'menteadd') {
    m--;
    add = m;
  }
  if (id == 'espiritoadd') {
    e--;
    add = e;
  }
  console.log('-')

  if (add == 0) {
    area.innerText = null;
  }
  else if (add > 0) {
    area.innerText = `+${add}`;
    area.innerText = `+${add}`;

  }
  else {
    area.innerText = `${add}`;
    area.style.color = 'red';

  }

}
function subVal(id) {
  clearTimeout(timer);

  subValor(id);
}


async function adicionarItem(novoItem) {
  try {
    // 1. Busca os itens atuais do personagem
    const resGet = await fetch(`${endpointcru}?id=eq.${id}&select=itens`, {
      method: 'GET',
      headers: {
        'apikey': apiKey,
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!resGet.ok) throw new Error(`Erro ao buscar: ${resGet.status}`);
    const [personagem] = await resGet.json();

    // 2. Adiciona o novo item ao array
    const itensAtualizados = [...(personagem.itens || []), novoItem];

    // 3. Atualiza a coluna via PATCH (requer a Policy de UPDATE)
    const resPatch = await fetch(`${endpointcru}?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'apikey': apiKey,
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ itens: itensAtualizados })
    });

    if (!resPatch.ok) throw new Error(`Erro no update: ${resPatch.status}`);

    // Recarrega a interface
    // window.location.reload();
    limparitens();
    carregarDados();

  } catch (error) {
    console.error('Erro ao adicionar item:', error);
  }
}

function novoItem(nome, qnd) {
  adicionarItem({ nome: `${nome}`, quantidade: `${qnd}` });
  limparcampos()
}

function limparcampos() {
  const localnome = document.getElementById('nomeItem');
  localnome.value = "";
  const localqnd = document.getElementById('quantidadeItem');
  localqnd.value = "1";
  const valshow = document.getElementById('valQuant');
  valshow.innerText = localqnd.value;
}

// 1. Função para remover 1 da quantidade do item
async function diminuirQuantidadeItem(nomeDoItem) {
  try {
    const resGet = await fetch(`${endpointcru}?id=eq.${id}&select=itens`, {
      method: 'GET',
      headers: {
        'apikey': apiKey,
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!resGet.ok) throw new Error(`Erro ao buscar: ${resGet.status}`);
    const [personagem] = await resGet.json();

    const itensAtuais = personagem.itens || [];

    // Mapeia e decrementa a quantidade, removendo o item se chegar <= 0
    const itensAtualizados = itensAtuais.reduce((acc, item) => {
      if (item.nome === nomeDoItem) {
        const novaQtd = parseInt(item.quantidade, 10) - 1;
        if (novaQtd > 0) {
          acc.push({ ...item, quantidade: String(novaQtd) });
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

    const resPatch = await fetch(`${endpointcru}?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'apikey': apiKey,
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ itens: itensAtualizados })
    });

    if (!resPatch.ok) throw new Error(`Erro no update: ${resPatch.status}`);

    limparitens();
    carregarDados();

  } catch (error) {
    console.error('Erro ao diminuir quantidade do item:', error);
  }
}

const bloodOverlay = document.getElementById('blood-overlay');

// Função 1: Disparo rápido ao tomar dano (Flash)
function triggerDamageFlash() {
  bloodOverlay.classList.remove('pulse');
  bloodOverlay.classList.add('active');

  // Esconde após 500ms
  setTimeout(() => {
    bloodOverlay.classList.remove('active');
  }, 500);
}

// Função 2: Efeito contínuo quando a vida estiver baixa (ex: < 25%)
function setCriticalHealth(isCritical) {
  if (isCritical) {
    bloodOverlay.classList.add('active', 'pulse');
  } else {
    bloodOverlay.classList.remove('active', 'pulse');
  }
}

const mentalOverlay = document.getElementById('mental-overlay');

function triggerDamageFlashMental() {
  mentalOverlay.classList.remove('pulse');
  mentalOverlay.classList.add('active');

  // Esconde após 500ms
  setTimeout(() => {
    mentalOverlay.classList.remove('active');
  }, 500);
}


function setCriticalMental(isCritical) {
  if (isCritical) {
    mentalOverlay.classList.add('active', 'pulse');
  } else {
    mentalOverlay.classList.remove('active', 'pulse');
  }
}

const runasdiv = document.getElementById('runas');
async function buscarRunas(runas) {
  try {
    const response = await fetch(endpointrunas, {
      method: 'GET',
      headers: {
        'apikey': apiKey,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const listarunas = await response.json();
    runas.forEach(element => {
      const runa = listarunas.find(item => item.id === element);
      const runad = document.createElement('div');
      const nome = document.createElement('input');
      const img = document.createElement('img');
      runad.classList.add('runa');
      nome.classList.add('nome')
      if (runa.nome != '[Sem nome]') {
        nome.style.color = `${cor}`;
      }
      nome.id = `${runa.id}`;
      nome.onchange = () => {
        UpdateNomeRuna(nome.value, nome.id);
      };

      nome.value = `${runa.nome}`;
      img.src = `${runa.imagem}`;

      runad.appendChild(img);
      runad.appendChild(nome);
      runasdiv.appendChild(runad);

    });
    console.log(listarunas);



  } catch (error) {
    console.error('Erro:', error);

  }
}

function UpdateNomeRuna(nome, id) {
  console.log(nome, id);
  atualizarNome(id, nome)
}


async function atualizarNome(id, novoNome) {
  const resPatch = await fetch(`${endpointrunas}?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'apikey': apiKey,
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ nome: novoNome })
  });
  console.log(resPatch)
}

function mudarRuna(direcao) {
  const container = document.getElementById('runas');
  // Rola uma largura total do container por vez
  const larguraItem = container.clientWidth;

  container.scrollBy({
    left: direcao * larguraItem,
    behavior: 'smooth'
  });
}



