const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  test('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect.assertions(1);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  test('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartList" e o segundo sendo o valor passado como argumento para saveCartItems.', () => {
    const name = 'cartList';
    const structure = '<ol><li>Item</li></ol>';
    saveCartItems(structure);
    expect.assertions(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(name, structure);
    });
});
