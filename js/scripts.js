let pokemonList = [
    {name: 'Bulbasaur', height: '0.7', types: ['grass', 'poison']},
    {name: 'Charizard', height: '0.6', types: ['fire', 'flying']},
    {name: 'Spearow', height: '0.3', types: ['flying', 'normal']},
];

for (let i = 0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i];
    document.write('<p>' + pokemon.name + ' | height: ' + pokemon.height + '</p>');
    if (pokemon.height >= 0.7) {
        document.write('Wow, that’s big!');
    }
}