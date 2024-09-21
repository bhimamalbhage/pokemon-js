let pokemonList = [
    {name: 'Bulbasaur', height: '0.7', types: ['grass', 'poison']},
    {name: 'Charizard', height: '0.6', types: ['fire', 'flying']},
    {name: 'Spearow', height: '0.3', types: ['flying', 'normal']},
];

for (let i = 0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i];
    let message = pokemon.height >= 0.7 ? ' | Wow, that’s big!' : ''; 
    document.write('<p>' + pokemon.name + ' | height: ' + pokemon.height + message + '</p>');
}
