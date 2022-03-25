const sectionItems = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const totalPrice = document.createElement('h3');
const cart = document.querySelector('.cart');
const emptyCartBtn = document.querySelector('.empty-cart');

totalPrice.className = 'total-price';
totalPrice.innerText = '0';
totalPrice.style.textAlign = 'center';
totalPrice.style.marginBottom = '20px';

cart.insertBefore(totalPrice, emptyCartBtn);

// const addLoadingScreen = () => {
//   const loading = document.createElement('h2');
//   loading.innerText = 'Loading...';
//   loading.style.background = 'black';
//   loading.style.color = 'white';
  
// };

const localStorageChecker = () => {
  if (localStorage.length > 0) {
    const localStorageCost = localStorage.getItem('cartCost').split('$');
    return Number(localStorageCost[1]);
  } return 0;
};

let cost = localStorageChecker();

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const priceUp = (price) => {
  cost += price;
  return cost;
};

const priceDown = (price) => {
  cost -= price;
  return cost;
};

const saveCost = () => {
  localStorage.setItem('cartCost', totalPrice.innerHTML);
};

function cartItemClickListener({ target }) {
  if (target.classList.contains('cart__item')) {
    cartItems.removeChild(target);
    const splitted = target.innerText.split('$');
    const itemPrice = Number(splitted[1]);
    const newPrice = priceDown(itemPrice);
    totalPrice.innerText = newPrice;
    saveCartItems(cartItems);
    saveCost();
  }
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const itens = async () => {
  const response = await fetchProducts();
  const result = response.results;
  result.forEach((obj) => {
    const { id, title, thumbnail } = obj;
    sectionItems.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
};

const cartClear = () => {
 const cartItem = document.querySelectorAll('.cart__item');
 cartItem.forEach((li) => {
  cartItems.removeChild(li);
 });
 localStorage.removeItem('cartList');
 cost = 0;
 totalPrice.innerText = cost;
 saveCost();
};

emptyCartBtn.addEventListener('click', cartClear);

sectionItems.addEventListener('click', async ({ target }) => {
  if (target.classList.contains('item__add')) {
    const parent = target.parentNode;
    const fisrtChildText = getSkuFromProductItem(parent);
    const item = await fetchItem(fisrtChildText);
    const { id, title, price } = item;
    const totalCost = priceUp(price);
    totalPrice.innerText = totalCost;
    cartItems.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
    saveCartItems(cartItems);
    saveCost();
  }
});

const getSavedCost = () => {
  const totalCost = localStorage.getItem('cartCost');
  totalPrice.innerHTML = totalCost; 
};
const getRidOf = () => {
  getSavedCartItems();
  const li = document.querySelectorAll('li.cart__item');
  li.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
};

window.onload = async () => {
  await itens();
  getRidOf();
  getSavedCost();
 };
