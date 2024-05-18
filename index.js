// Función para mostrar los datos del Pokémon
function mostrarPokemon(numero) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)
        .then(response => {
            if (response.status === 404) {
                const errorMessage = document.createElement('div');
                errorMessage.classList.add('card', 'error-card');
                errorMessage.innerHTML = `
                    <h2>Error</h2>
                    <p>No se encontró ningún Pokémon con ese número</p>
                `;
                
                const pokeCard = document.getElementById('pokeCard');
                pokeCard.innerHTML = '';
                pokeCard.appendChild(errorMessage);
                throw new Error('No se encontró ningún Pokémon con ese número');
            }
            if (isNaN(numero)) {
                const errorMessage = document.createElement('div');
                errorMessage.classList.add('card', 'error-card');
                errorMessage.innerHTML = `
                    <h2>Error</h2>
                    <p>Por favor ingresa un número válido</p>
                `;
                const pokeCard = document.getElementById('pokeCard');
                pokeCard.innerHTML = '';
                pokeCard.appendChild(errorMessage);
                throw new Error('Por favor ingresa un número válido');
            }

            return response.json();
        })
        .then(pokemon => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h1>${pokemon.name}</h1>
                <p>Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                <p>Altura: ${pokemon.height / 10} metros</p>
                <p>Peso: ${pokemon.weight / 10} kilogramos</p>
                <img src="${pokemon.sprites.front_default}" alt="Imagen del Pokémon">
            `;
            const pokeCard = document.getElementById('pokeCard');
            pokeCard.innerHTML = '';
            pokeCard.appendChild(card);
            return pokemon;
        })
        .catch(error => {
            console.error('Error al obtener los datos del Pokémon:', error.message);
        });
}