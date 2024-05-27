function useLocalStorage() {
  function setLocalStorage(key, item) {
    // Hämta hela localStorage
    // Gör om det till en array
    let localStorageItem = getLocalStorage(key);

    // Om localStorageItem är null, sätt den till en tom array!
    if (!localStorageItem) {
      localStorageItem = [];
    }

    console.log("PUTTING IN CART: ", item);
    console.log("EXISTING CART: ", localStorageItem);

    const cartItem = item;

    // Lägg till det nya objektet i den befintliga carten
    localStorageItem.push(cartItem);

    // Spara den uppdaterade carten till local storage
    localStorage.setItem("cart", JSON.stringify(localStorageItem));
  }

  function getLocalStorage(key) {
    const localStorageItem = localStorage.getItem(key);
    
    return JSON.parse(localStorageItem);
  }

  function removeLocalStorage(key) {
    console.log("Removing...");
    localStorage.removeItem(key);
    console.log("deleting", key)
  }
//chat gpt
// function removeLocalStorage(key, updatedData) {
//   console.log("Removing...");
//   localStorage.setItem(key, JSON.stringify(updatedData)); // Spara den uppdaterade datan tillbaka i local storage
//   console.log("Deleting everything from", key);
// }

  return { setLocalStorage, getLocalStorage, removeLocalStorage };
}

export default useLocalStorage;
