const getSavedCartItems = () => {
  const savedList = localStorage.getItem('cartList');
  const cartItems = document.querySelector('.cart__items');
  cartItems.innerHTML = savedList;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
