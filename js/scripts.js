let pokemonRepository = (function () {
  let pokemonList = [];
  let modalContainer = document.querySelector('#modal-container');
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
            name: item.name,
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
    let pokemon_list = document.querySelector(".pokemon-list");
    let pokemon_li = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-name");
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
    pokemon_li.appendChild(button);
    pokemon_list.appendChild(pokemon_li);
  }

  function loadDetails(element) {
    let url = element.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        element.imageUrl = details.sprites.front_default;
        element.height = details.height;
        element.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
        showModal(
        pokemon.name, 
        'Height: ' + pokemon.height,
        pokemon.imageUrl
       );
    });
}

  function showModal(title, height, img) {

    modalContainer.innerHTML = '';

    let modalDiv = document.createElement('div');
    modalDiv.classList.add('modal');

    let closeBtn = document.createElement('button');
    closeBtn.classList.add('modal-close');
    closeBtn.innerText = "Close";
    closeBtn.addEventListener('click', hideModal);

    let pokemonName = document.createElement('h1');
    pokemonName.innerText = title;

    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = height;

    let pokemonImage = document.createElement('img');
    pokemonImage.setAttribute('src', img);
    pokemonImage.setAttribute("width", "100%");
    pokemonImage.setAttribute("height", "100%");

    modalDiv.appendChild(closeBtn);
    modalDiv.appendChild(pokemonName);
    modalDiv.appendChild(pokemonHeight);
    modalDiv.appendChild(pokemonImage);
    modalContainer.appendChild(modalDiv);

    modalContainer.classList.add('is-visible');

    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            hideModal();
        }
    });
}

function hideModal() {
    modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
});

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
