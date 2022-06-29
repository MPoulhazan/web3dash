export const formatBalance = (value: string, decimal: number): string => {
  if (value === '0') return '0';

  const dotPosition = value.length - decimal;

  if (dotPosition > 6) {
    return (
      value.slice(0, dotPosition - 6) +
      '.' +
      value.slice(dotPosition - 6, dotPosition - 3) +
      'M'
    );
  } else if (dotPosition > 3) {
    return (
      value.slice(0, dotPosition - 3) +
      '.' +
      value.slice(dotPosition - 3, dotPosition) +
      'K'
    );
  }

  if (dotPosition < 1) return '0$';
  return (
    value.slice(0, dotPosition) +
    '.' +
    value.slice(dotPosition, dotPosition + 3)
  );
};

export const formatQuote = (quote: Number) => {
  const quoteArr = ('' + quote).split('.');
  return formatBalance(('' + quote).replace('.', ''), quoteArr[1]?.length || 0);
};
