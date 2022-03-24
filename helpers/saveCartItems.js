const saveCartItems = (itens) => {
  localStorage.setItem('cartList', itens.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
