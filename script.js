function queryObj() {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('evolucao');
}

var myParam = queryObj()

document.title += ' ' + myParam

document.querySelector('#h1_id').innerHTML = myParam


const req = fetch(`https://pokeapi.co/api/v2/pokemon/${myParam}`).then(
    data => {
        return data.json()
    }
).then(
    img =>{
        const image =  document.querySelector("img")
        image.src = img.sprites.front_default
    }
)


