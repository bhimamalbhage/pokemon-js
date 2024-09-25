let pokemonRepository = (function () {
    let pokemonList = [
      { name: "Bulbasaur", height: "0.7", types: ["grass", "poison"] },
      { name: "Charizard", height: "0.6", types: ["fire", "flying"] },
      { name: "Spearow", height: "0.3", types: ["flying", "normal"] },
    ];
  
    function add(pokemon) {
      if (typeof pokemon === 'object') {
        let requiredKeys = ['name', 'height', 'types'];
        let pokemonKeys = Object.keys(pokemon);
  
        let hasAllKeys = requiredKeys.every(key => pokemonKeys.includes(key));
  
        if (hasAllKeys) {
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
  
    return {
      add: add,
      getAll: getAll,
      findByName: findByName,
    };
  })();

  pokemonRepository.add({ name: "Pikachu", height: "0.4", types: ["electric"] });

  //   Trying to add an invalid Pokemon
  pokemonRepository.add("Just a string");
  
  let pokemons = pokemonRepository.getAll();
  pokemons.forEach((pokemon) => {
    let message = pokemon.height >= 0.7 ? " | Wow, that’s big!" : "";
    document.write(
      "<p>" + pokemon.name + " | height: " + pokemon.height + message + "</p>"
    );
  });
  
  // Searching for a Pokemon by name
  let foundPokemon = pokemonRepository.findByName("Bulbasaur");
  console.log(foundPokemon);
  