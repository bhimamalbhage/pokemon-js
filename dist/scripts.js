let pokemonRepository=function(){let t=[],e=document.getElementById("pokemonModal"),n=new bootstrap.Modal(e),o=document.getElementById("pokemonModalLabel"),i=document.getElementById("pokemonHeight"),a=document.getElementById("pokemonImage");function r(e){"object"==typeof e?"name"in e?t.push(e):console.error("Invalid Pokemon object. It must contain 'name'."):console.error("The parameter must be an object.")}function l(){return t}function s(t){return fetch(t.detailsUrl).then(function(t){return t.json()}).then(function(e){t.imageUrl=e.sprites.other["official-artwork"].front_default||e.sprites.front_default,t.height=e.height,t.types=e.types.map(t=>c(t.type.name)).join(", ")}).catch(function(t){console.error(t)})}function m(t){s(t).then(function(){o.textContent=t.name,i.textContent=`Height: ${t.height}`,a.src=t.imageUrl,a.alt=`${t.name} image`,n.show()})}function c(t){return t.charAt(0).toUpperCase()+t.slice(1)}return{add:r,getAll:l,findByName:function e(n){return t.filter(t=>t.name.toLowerCase()===n.toLowerCase())},addListItem:function t(e){let n=document.querySelector(".pokemon-list"),o=document.createElement("li");o.classList.add("list-group-item");let i=document.createElement("button");i.innerText=e.name,i.classList.add("btn","btn-primary","w-100"),i.setAttribute("data-bs-toggle","modal"),i.setAttribute("data-bs-target","#pokemonModal"),i.setAttribute("aria-label",`View details of ${e.name}`),i.addEventListener("click",function(){m(e)}),o.appendChild(i),n.appendChild(o)},loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){r({name:c(t.name),detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:s,showDetails:m}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});