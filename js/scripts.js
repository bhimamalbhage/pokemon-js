let pokemonRepository = (function () {
    let pokemonList = [
      { name: "Bulbasaur", height: "0.7", types: ["grass", "poison"] },
      { name: "Charizard", height: "0.6", types: ["fire", "flying"] },
      { name: "Spearow", height: "0.3", types: ["flying", "normal"] },
    ];
  
    function add(pokemon) {
      if (typeof pokemon === 'object') {
        if (
            'name' in pokemon &&
            'height' in pokemon &&
            'types' in pokemon
        ) {
          pokemonList.push(pokemon);
        } else {
          console.error("Invalid Pokemon object. It must contain 'name', 'height', and 'types'.");
        }
      } else {
        console.error("The parameter must be an object.");
      }
    }
  
    function getAll() {
      return pokemonList;
    }
  
    function findByName(name) {
      return pokemonList.filter(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
    }

    function addListItem(pokemon) {
        let pokemon_list = document.querySelector('.pokemon-list');
        let pokemon_li = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button');
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
        pokemon_li.appendChild(button);
        pokemon_list.appendChild(pokemon_li);
    }
    
    function showDetails(pokemon) {
        console.log(pokemon.name);
    }
  
    return {
      add: add,
      getAll: getAll,
      findByName: findByName,
      addListItem: addListItem
    };
  })();

  pokemonRepository.add({ name: "Pikachu", height: "0.4", types: ["electric"] });
  
  // Searching for a Pokemon by name
  let foundPokemon = pokemonRepository.findByName("Bulbasaur");
  console.log(foundPokemon);

  pokemonRepository.getAll().forEach(function (pokemon) { 
    pokemonRepository.addListItem(pokemon);
});
  