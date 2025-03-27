function saveToLocalStorage(pokemonName: string) {
    let favoritesListArr = getFromLocalStorage();

    if (!favoritesListArr.includes(pokemonName)) {
        favoritesListArr.push(pokemonName);
    }

    localStorage.setItem('Favorites', JSON.stringify(favoritesListArr));
}

function getFromLocalStorage() {
    let localStorageData = localStorage.getItem('Favorites');

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(inputPokemonName: string) {
    let localStorageData = getFromLocalStorage();

    let idToRemove = localStorageData.indexOf(inputPokemonName);

    localStorageData.splice(idToRemove, 1);

    localStorage.setItem('Favorites', JSON.stringify(localStorageData));
    // if(inputPokemonName == pokemonName.innerText) {
    //     addToFavoritesBtn.classList.add("grayscale");
    //     addToFavoritesBtn.classList.add("opacity-50");
    // }
}
