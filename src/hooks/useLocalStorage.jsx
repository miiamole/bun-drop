function useLocalStorage() {
  function setLocalStorage() {
    console.log("SETTING local storage from custom hook");
  }

  function getLocalStorage() {
    console.log("GETTING local storage from custom hook");
  }

  return { setLocalStorage, getLocalStorage };
}

export default useLocalStorage;
