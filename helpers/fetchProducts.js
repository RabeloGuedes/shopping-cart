const fetchProducts = async () => {
  const query = 'computador';
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result.results;
  } catch (err) {
    console.log(err);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
