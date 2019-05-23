import Vue from 'vue';

const formatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
});

export const toCurrencyFilter = (value) => {
  return formatter.format(value);
};

Vue.filter('toCurrency', toCurrencyFilter);
