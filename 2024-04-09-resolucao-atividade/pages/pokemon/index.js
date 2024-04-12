/*function changePageTitle(title) {
  document.title = title
}

function generateInfoSection(src, pokemonName) {
  const h2 = document.createElement('h2')
  h2.id = "info-pokemon-label"
  h2.textContent = `Informações sobre ${pokemonName}`

  const img = document.querySelector('img')
  img.src = src.sprites.front_default
  img.alt = `Imagem do pokemon ${pokemonName}`

  img.addEventListener("click", () => {
  })

  const section = document.querySelector('#info-pokemon')

  section.appendChild(h2)
  section.appendChild(img)
}

async function getPokemonData(name) {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

    const jsonData = await data.json()

    generateInfoSection(jsonData, name)
  } catch (error) {
    console.error(error)
  }
}

function getSearchParams() {
  // Early return -> Caso location search, não faz nada.
  if (!location.search) {
    return
  }

  // URLSearchParams é uma classe que facilita a manipulação de query strings
  const urlSearchParams = new URLSearchParams(location.search)

  // Pegando o valor do parâmetro name
  const pokemonName = urlSearchParams.get('name')

  changePageTitle(`Pagina do ${pokemonName}`)
  getPokemonData(pokemonName)
}

document.addEventListener('DOMContentLoaded', function () {
  getSearchParams()
  visitas()
})

let date = new Date()

function visitas() {
  let key = 'visitas'
  let busca = localStorage.getItem(key)
  busca = JSON.parse(busca)

  date = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric" }).format(date)

  if(busca.contador == null || busca.contador == 0){
    cont = 1
  }else{
    cont = busca.contador + 1
  }

  let object = JSON.stringify({
    contador: cont,
    data: date
  })
  
  console.log(busca)
  localStorage.setItem(key, object)

  busca = localStorage.getItem(key)
  busca = JSON.parse(busca)
  AddFooter(busca.contador, busca.data)
}

function AddFooter(contador, data){
  const p = document.createElement('p')
  p.id = "visita"
  p.textContent = `Esta página foi visitada ${contador} vezes. A última visita foi: ${data}`

  const footer = document.querySelector('#rodape')

  footer.appendChild(p)
}
*/

function changePageTitle(title) {
  document.title = title;
}

function generateInfoSection(spritesArray, pokemonName) {
  const h2 = document.createElement('h2');
  h2.id = 'info-pokemon-label';
  h2.textContent = `Informações sobre ${pokemonName}`;

  const img = document.querySelector('img');
  img.src = spritesArray[0]; // Display first image by default
  img.alt = `Imagem do Pokémon ${pokemonName}`;

  img.addEventListener('click', () => {
    let currentIndex = spritesArray.findIndex((url) => url === img.src);
    let nextIndex = (currentIndex + 1) % spritesArray.length;
    img.src = spritesArray[nextIndex];
  });

  const section = document.querySelector('#info-pokemon');
  section.appendChild(h2);
  section.appendChild(img);
}

async function getPokemonData(name) {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const jsonData = await data.json();

    if (!jsonData.sprites) {
      // Handle missing sprites object
      console.error(`Sprites not found for Pokémon: ${name}`);
      return;
    }

    const spritesArray = Object.values(jsonData.sprites).filter(
      (sprite) => typeof sprite === 'string'
    );

    generateInfoSection(spritesArray, jsonData.name);
  } catch (error) {
    console.error(error);
  }
}

function getSearchParams() {
  // Early return if no search parameters
  if (!location.search) {
    return;
  }

  const urlSearchParams = new URLSearchParams(location.search);
  const pokemonName = urlSearchParams.get('name');

  changePageTitle(`Página do ${pokemonName}`);
  getPokemonData(pokemonName);
}

document.addEventListener('DOMContentLoaded', function () {
  getSearchParams();
  visitas();
});

let date = new Date();

function visitas() {
  let key = 'visitas';
  let busca = localStorage.getItem(key);
  busca = JSON.parse(busca);

  date = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);

  if (!busca || !busca.contador || busca.contador === 0) {
    busca = {
      contador: 1,
      data: date,
    };
  } else {
    busca.contador++;
  }

  localStorage.setItem(key, JSON.stringify(busca));

  AddFooter(busca.contador, busca.data);
}

function AddFooter(contador, data) {
  const p = document.createElement('p');
  p.id = 'visita';
  p.textContent = `Esta página foi visitada ${contador} vezes. A última visita foi: ${data}`;

  const footer = document.querySelector('#rodape');
  footer.appendChild(p);
}
