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

function cartItemClickListener() {

}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const getItemToTheCart = async () => {
  const item = await fetchItem(cartItemClickListener({ target }));
  createCartItemElement({ sku: id, name: title, salePrice: price });
};

const itens = async () => {
  const results = await fetchProducts();
  results.forEach((obj) => {
    const { id, title, thumbnail } = obj;
    sectionItems.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
};

sectionItems.addEventListener('click', async ({ target }) => {
  if (target.classList.contains('item__add')) {
    const parent = target.parentNode;
    const parentFirstChild = parent.firstChild;
    const fisrtChildText = parentFirstChild.innerText;
    const item = await fetchItem(fisrtChildText);
    const { id, title, price } = item;
    cartItems.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
  }
});

window.onload = async () => {
  await itens();
 };
