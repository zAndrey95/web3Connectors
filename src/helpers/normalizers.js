export const convertToNormal = (value, decimal, fixed) =>
  parseFloat(
    fixed
      ? (value / +`1E${decimal}`).toFixedDown(fixed)
      : value / +`1E${decimal}`,
  );

export const convertValue = value =>
  Math.round(+value * 10000).toString() + '00000000000000';

export const reduceValue = value => +value / 1e18;

export const convertValueUSDT = value =>
  Math.round(+value * 10000).toString() + '00';
export const reduceValueUSDT = value => +value / 1e6;

export const toFixed0 = value => {
  const newVal = +value;
  return newVal.toFixed(0);
};

export const toFixed2 = value => {
  const newVal = +value;
  return newVal.toFixed(2);
};

export const toFixed4 = value => {
  const newVal = +value;
  return newVal.toFixed(4);
};

export const shortAddress = address => {
  if (typeof address !== 'string') {
    address = '' + address;
  }
  return `${address.slice(0, 7)}...${address.slice(-4)}`;
};
