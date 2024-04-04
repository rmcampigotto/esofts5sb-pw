function queryObj() {
    const searchParams = new URLSearchParams(location.search);

    return searchParams.get('evolucao');
}
var myParam = queryObj();

document.title += ' ' + myParam

const req = fetch("https://pokeapi.co/api/v2/pokemon/wartortle").then(
    data => {
        return data.json()
    }
).then(
    img =>{
        const image =  document.querySelector("img")
        image.src = img.sprites.front_default
    }
)


