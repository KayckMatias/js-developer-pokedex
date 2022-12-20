const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0
var loaded = false

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    if(loaded = true){
        pokemonList.innerHTML = ""
    }

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
        pokeApi.loadingToggle(false)
    })
}

function createLoadingItems(){
    var loadingItem = `<li class="pokemon-loading">
    <span class="number">#1</span>
    <span class="name">bulbasaur</span>

    <div class="detail">
        <ol class="types">
            <li class="type grass">grass</li><li class="type poison">poison</li>
        </ol>

        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="bulbasaur">
    </div>
    </li>`
    loaded = true
    for(i=0;i<10;i++){
        pokemonList.innerHTML += loadingItem
    }
}

createLoadingItems();

setTimeout(() => {  
    loadPokemonItens(offset, limit)
}, 500)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})