export function saveToLocalStorage(pokemonName: string) {
    if (typeof window === 'undefined') return;

    const favoritesListArr = getFromLocalStorage();

    if (!favoritesListArr.includes(pokemonName)) {
        favoritesListArr.push(pokemonName);
    }

    localStorage.setItem('Favorites', JSON.stringify(favoritesListArr));
}

export function getFromLocalStorage() {
    if (typeof window === 'undefined') return [];
    const localStorageData = localStorage.getItem('Favorites');

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);
}

export function removeFromLocalStorage(inputPokemonName: string) {
    if (typeof window === 'undefined') return;
    const localStorageData = getFromLocalStorage();

    const idToRemove = localStorageData.indexOf(inputPokemonName);

    localStorageData.splice(idToRemove, 1);

    localStorage.setItem('Favorites', JSON.stringify(localStorageData));
}
