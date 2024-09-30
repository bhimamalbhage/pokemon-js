let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  const modalElement = document.getElementById("pokemonModal");
  const modal = new bootstrap.Modal(modalElement);
  const modalTitle = document.getElementById("pokemonModalLabel");
  const modalHeight = document.getElementById("pokemonHeight");
  const modalImage = document.getElementById("pokemonImage");

  function add(pokemon) {
    if (typeof pokemon === "object") {
      if ("name" in pokemon) {
        pokemonList.push(pokemon);
      } else {
        console.error("Invalid Pokemon object. It must contain 'name'.");
      }
    } else {
      console.error("The parameter must be an object.");
    }
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: capitalizeFirstLetter(item.name),
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function getAll() {
    return pokemonList;
  }

  function findByName(name) {
    return pokemonList.filter(
      (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
    );
  }

  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let pokemonItem = document.createElement("li");
    pokemonItem.classList.add("list-group-item");

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-primary", "w-100");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#pokemonModal");
    button.setAttribute("aria-label", `View details of ${pokemon.name}`);
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });

    pokemonItem.appendChild(button);
    pokemonListElement.appendChild(pokemonItem);
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.imageUrl =
          details.sprites.other["official-artwork"].front_default ||
          details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types
          .map((typeInfo) => capitalizeFirstLetter(typeInfo.type.name))
          .join(", ");
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      modalTitle.textContent = pokemon.name;
      modalHeight.textContent = `Height: ${pokemon.height}`;
      modalImage.src = pokemon.imageUrl;
      modalImage.alt = `${pokemon.name} image`;
      modal.show();
    });
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return {
    add: add,
    getAll: getAll,
    findByName: findByName,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
