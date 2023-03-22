const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

const formatName = (category) => category[0].toUpperCase() + category.slice(1);

export { formatPrice, formatName }