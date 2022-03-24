const fetchItem = async (itemId) => {
  const url = `https://api.mercadolibre.com/items/${itemId}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
