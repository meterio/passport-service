import BigNumber from 'bignumber.js';

import { UNIT_WEI } from '../const';

export const blockIDtoNum = (blockID: string) => {
  if (typeof blockID === 'string' && !/^0x[0-9a-fA-f]{64}$/i.test(blockID)) {
    throw new Error('bytes32 required as param but got: ' + blockID);
  }

  return parseInt(blockID.slice(0, 10), 16);
};

export const bufferToHex = (val: Buffer) => {
  return '0x' + val.toString('hex');
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const displayID = (blockID: string) => {
  return `${blockIDtoNum(blockID)}...${blockID.slice(58)}`;
};

export const sanitizeHex = (val: string) => {
  if (val.startsWith('0x')) {
    val = val.slice(2);
  }
  if (val.length % 2) {
    val = '0' + val;
  }
  return val;
};

export const hexToBuffer = (val: string) => {
  if (!/^0x[0-9a-fA-f]+/i.test(val)) {
    throw new Error('hex string required as param but got: ' + val);
  }

  return Buffer.from(sanitizeHex(val), 'hex');
};

export const isBytes32 = (val: string) => {
  return /^0x[0-9a-fA-f]{64}/i.test(val);
};
export class InterruptedError extends Error {
  constructor() {
    super('interrupted');
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InterruptedError.prototype);
  }
}

export const fromWei = (val: string | number | BigNumber, precision: number | undefined = undefined) => {
  return new BigNumber(val).dividedBy(UNIT_WEI).toFixed(precision);
};

export const toWei = (val: string | number | BigNumber) => {
  return new BigNumber(val).times(UNIT_WEI).toFixed();
};

export class WaitNextTickError extends Error {
  constructor() {
    super();
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, WaitNextTickError.prototype);
  }
}

export function getRebateAmount(bridgeFee: BigNumber, fromUSD: number, toUSD: number, rate: number) {
  // return (Number(bridgeFee) * fromUSD * rate / toUSD).toFixed(2);
  return bridgeFee.times(fromUSD).times(rate).dividedBy(toUSD).dividedBy(UNIT_WEI).toFixed(2);
}

WaitNextTickError.prototype.name = 'WaitNextTickError';
InterruptedError.prototype.name = 'InterruptedError';

export const isHex = (str: string): boolean => {
  return /^[a-f0-9]+$/i.test(str.toLowerCase());
};

export const snakeToCamel = (s) => s.toLowerCase().replace(/(_\w)/g, (k) => k[1].toUpperCase());

export const upperFirst = (s) => s[0].toUpperCase() + s.slice(1);
