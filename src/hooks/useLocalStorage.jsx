function useLocalStorage() {
  
  function setLocalStorage(key, item) {
    // Hämta hela localStorage
    // Gör om det till en array
    let localStorageItem = getLocalStorage(key);

    // Om localStorageItem är null, sätt den till en tom array!
    if (!localStorageItem) {
      localStorageItem = [];
    }
    const existingItemIndex = localStorageItem.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex >= 0) {
      localStorageItem[existingItemIndex].quantity += 1;
    } else {
      // Gör om item:et (menuItem) till ett item för carten (med quantity)
      const cartItem = {
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        image: item.image,
        quantity: 1, // Om det redan finns en sån med samma title, öka istället med 1
      };
      // Lägg till det nya objektet i den befintliga carten
      localStorageItem.push(cartItem);
    }
    // Spara den uppdaterade carten till local storage
    localStorage.setItem(key, JSON.stringify(localStorageItem));
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

  //MED DENNA TAS rätt sak bort
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

  function clearLocalStorage(key) {
    localStorage.setItem(key, JSON.stringify([]));
  }

  //chat gpt ang ändra kvantitet
  function updateQuantityInLocalStorage(key, itemId, newQuantity) {
    console.log(
      "Updating quantity in local storage:",
      key,
      itemId,
      newQuantity
    );
    // Hämta hela localStorage-----DETTA FUNGERAR
    let localStorageItem = getLocalStorage(key);

    // Avsluta om det inte finns någon cart i localStorage
    if (!localStorageItem) return;

    // Uppdatera siffran för den produkten jag klickat på
    localStorageItem = localStorageItem.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Spara den uppdaterade carten till localStorage
    localStorage.setItem(key, JSON.stringify(localStorageItem));
  }
  return {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    updateQuantityInLocalStorage,
    clearLocalStorage,
  };
}

export default useLocalStorage;
