// export const truncateAddress = (address) => {
//   if (!address) return "No Account";
//   const match = address.match(
//     /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
//   );
//   if (!match) return address;
//   return `${match[1]}…${match[2]}`;
// };

// export const toHex = (num) => {
//   const val = Number(num);
//   return "0x" + val.toString(16);
// };

export const shortAddress = (address) => {
  if (typeof address !== "string") {
    address = "" + address;
  }
  return `${address.slice(0, 7)}...${address.slice(-4)}`;
};

// export const normalizeAccount = (address) => {
//   if (!address) return "0x00000...0000";
//   const dot = address.indexOf("x");
//   return `${address.slice(0, dot + 6)}...${address.slice(-4)}`;
// };

export const convertToNormal = (value, decimal, fixed) =>
  parseFloat(
    fixed ? (value / +`1E${decimal}`).toFixed(fixed) : value / +`1E${decimal}`
  );
