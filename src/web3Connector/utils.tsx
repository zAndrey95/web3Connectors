export const normalizeEth = (wei: any) => {
  if (!wei) return 0;
  const dot = wei.indexOf('.');
  return wei.slice(0, dot+3);
}

export const normalizeAccount = (address: string) => {
  if (!address) return '0x00000...0000';
  const dot = address.indexOf('x');
  return `${address.slice(0, dot+6)}...${address.slice(-4)}`;
}