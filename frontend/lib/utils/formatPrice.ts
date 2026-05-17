export function formatPrice(amount: number, currency = 'DZD'): string {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' ' + currency;
}

export function formatPriceNumber(amount: number): string {
  return new Intl.NumberFormat('fr-DZ').format(amount);
}
