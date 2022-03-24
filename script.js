const sectionItems = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');

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

function cartItemClickListener({ target }) {
  if (target.classList.contains('cart__item')) {
    cartItems.removeChild(target);
    saveCartItems(cartItems);
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

sectionItems.addEventListener('click', async ({ target }) => {
  if (target.classList.contains('item__add')) {
    const parent = target.parentNode;
    const fisrtChildText = getSkuFromProductItem(parent);
    const item = await fetchItem(fisrtChildText);
    const { id, title, price } = item;
    cartItems.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
    saveCartItems(cartItems);
  }
});

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
 };
