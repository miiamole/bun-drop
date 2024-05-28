function useLocalStorage() {
  //HUR HADE JAG LYCKATS FÅ IN NULL I LOCAL STORAGE???
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
//MED DENNA TAS HELA CARTEN BORT
  //   function removeLocalStorage(key) {
  //    
  //     localStorage.removeItem(key);
  //     console.log("deleting", key)
  //   }

  //MED DENNA TAS INGET BORT
  function removeLocalStorage(key, itemToDelete) {
    console.log("deleting", itemToDelete);
    //hämta hela cart:en
    let localStorageItem = localStorage.getItem(key);
    localStorageItem = JSON.parse(localStorageItem);

    //avsluta om det ej finns ngn cart
    if (!localStorageItem) return;

    //filtrera bort den som klickats på
    const updatedCart = localStorageItem.filter(
      (item) => item.id !== itemToDelete.id
    );

    // Lägg tillbaka den uppdaterade carten tillbaka till local storage
    localStorage.setItem(key, JSON.stringify(updatedCart));
  }

  return { setLocalStorage, getLocalStorage, removeLocalStorage };
}

export default useLocalStorage;
