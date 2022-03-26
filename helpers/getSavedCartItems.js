const getSavedCartItems = () => localStorage.getItem('cartList');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
