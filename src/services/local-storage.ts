function saveToLocalStorage(pokemonName: string) {
    if (typeof window === 'undefined') return;

    let favoritesListArr = getFromLocalStorage();

    if (!favoritesListArr.includes(pokemonName)) {
        favoritesListArr.push(pokemonName);
    }

    localStorage.setItem('Favorites', JSON.stringify(favoritesListArr));
}

function getFromLocalStorage() {
    if (typeof window === 'undefined') return [];
    let localStorageData = localStorage.getItem('Favorites');

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(inputPokemonName: string) {
    if (typeof window === 'undefined') return;
    let localStorageData = getFromLocalStorage();

    let idToRemove = localStorageData.indexOf(inputPokemonName);

    localStorageData.splice(idToRemove, 1);

    localStorage.setItem('Favorites', JSON.stringify(localStorageData));
}
