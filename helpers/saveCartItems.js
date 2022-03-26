const saveCartItems = (itens) => {
  localStorage.setItem('cartList', itens);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
