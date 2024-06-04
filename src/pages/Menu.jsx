import React, { useState, useEffect} from "react"; 
import useLocalStorage from "../hooks/useLocalStorage"; //FIXA så att modalen stänger sig självt
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCheck } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [filter, setFilter] = useState("");
  const [cart, setCart] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  //const [favourite, setFavourite] = [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null); //för att se om knapparna ska synas
  //   const [order, setOrder] = useState([]);
  const { setLocalStorage, getLocalStorage, removeLocalStorage } =
    useLocalStorage();
    
//Hämtar hela menyn
  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
    //ha ngn error grej??
  }, []);

  //HÄMTAR ALLT JAG HAR I MIN CART
  useEffect(() => {
    const itemsInCart = getLocalStorage("cart");
    if (itemsInCart) {
      setCart(itemsInCart);
    }
  }, []);

  //kollar om ngn är inloggad i ls
  useEffect(() => {
    const lsUserId = localStorage.getItem("loggedInUserId");
    if (lsUserId) {
      setLoggedInUser(true);
    } else {
      setLoggedInUser(false);
    }
  }, []);

  function filterList(category) {
    setFilter(category);
  }
  const filteredMenu = filter
    ? menu.filter((item) => item.category === filter)
    : menu;

  // LÄGG TILL I LOCAL STORAGE
  const addToCart = (menuItem) => {
    setLocalStorage("cart", menuItem);
    setModalMessage("Added to cart"); 
    setIsModalOpen(true); //öppna modalen- cart
  };
  // LÄGG TILL favoriter I DB.JSON
  const addToFavourite = (menuItem) => {
    const userId = localStorage.getItem("loggedInUserId");

    const favourite = {
      id: menuItem.id,
      title: menuItem.title,
      price: menuItem.price,
      description: menuItem.description,
      category: menuItem.category,
      image: menuItem.image,
    };
    fetch(`http://localhost:3000/users/${userId}`)
      .then((response) => response.json())
      .then((userData) => {
        // Hämta användarens befintliga favoritlista
        const favorites = userData.favorites;

        // Lägg till den nya favoriten i favoritlistan
        favorites.push(favourite);

        const patchOptions = {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ favorites: favorites }),
        };

        return fetch(`http://localhost:3000/users/${userId}`, patchOptions);
      })
      .then((response) => {
        if (response.ok) {
          console.log("Favorite added");
          setModalMessage("Added to favourites");
          setIsModalOpen(true); //öppna modal - favo
        } else {
          console.error("Failed to add favorite.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });      
  };

const toggleModal = () => {
  setIsModalOpen(!isModalOpen);
};

  return (
    <>
      <div>
        <div className="color-wrapper">
          <h1 className="cart-text">Our menu</h1>
          <div className="menu-btn-container">
            <button className="menu-btn" onClick={() => filterList("")}>
              All
            </button>
            <div className="menu-btn-wrapper">
              <button
                className="menu-btn"
                onClick={() => filterList("burgers")}
              >
                <img className="menu-btn-img" src="/images/burger 1.png" />
                Burgers
              </button>
            </div>
            <button className="menu-btn" onClick={() => filterList("sides")}>
              <img className="menu-btn-img" src="/images/sides 1.png" />
              Sides
            </button>
            <button className="menu-btn" onClick={() => filterList("drinks")}>
              <img className="menu-btn-img" src="/images/drink 5.png" />
              Drinks
            </button>
            <button className="menu-btn" onClick={() => filterList("desserts")}>
              <img className="menu-btn-img" src="/images/dessert 1.png" />
              Desserts
            </button>
          </div>
          <div className="menu-container">
            {filteredMenu.map((m) => (
              <div key={m.id} className="menu-card">
                <img className="menu-image" src={`${m.image}`} />
                <h3 className="menu-card-title menu-card-text">{m.title}</h3>

                <h3 className="menu-card-description menu-card-text">
                  {m.description}
                </h3>
                <h3 className="menu-card-price menu-card-text">${m.price}</h3>
                <div className="add-to-cart-link-and-btn">
                  <button
                    onClick={() => addToCart(m)}
                    className="payment-btn"
                    // to={`/cart/${m.id}`}
                  >
                    Add to cart
                  </button>

                  {loggedInUser && (
                    <button
                      onClick={() => addToFavourite(m)}
                      className="heart-btn"
                    >
                      <FontAwesomeIcon icon={faHeart} className="heart-shape" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        message={modalMessage}
      />
    </>
  );
}

export default Menu;
