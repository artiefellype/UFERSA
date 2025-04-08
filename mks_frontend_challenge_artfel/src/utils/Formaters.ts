export function formatPrice(price: number) {
  const value = Number(price);

  const hasDecimal = Number.isInteger(value);

  const options = {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: hasDecimal ? 0 : 2,
    maximumFractionDigits: hasDecimal ? 0 : 2,
  };

  return value.toLocaleString("pt-BR", options);
}
