export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface CardInfo {
  cardType: string;
  cardNumber: string;
}

export const TEST_USER: UserCredentials = {
  username: 'j2ee',
  password: 'j2ee'
};

export const UPDATED_PROFILE: Partial<UserProfile> = {
  firstName: 'Juan',
  lastName: 'Pérez',
  email: 'juan.perez@test.com',
  phone: '555-0123',
  address1: 'Calle Principal 123',
  city: 'Madrid',
  state: 'Madrid',
  zip: '28001',
  country: 'España'
};


export const TEST_CARD: CardInfo = {
  cardType: 'Visa',
  cardNumber: '999 9999 9999 9999'
};


export enum ProductCategory {
  FISH = 'FISH',
  DOGS = 'DOGS',
  CATS = 'CATS',
  REPTILES = 'REPTILES',
  BIRDS = 'BIRDS'
}

export const EXPECTED_MESSAGES = {
  ORDER_CONFIRMATION: 'Thank you, your order has been submitted',
  ACCOUNT_UPDATED: 'Your account has been updated',
  LOGIN_SUCCESS: 'Welcome',
  CART_EMPTY: 'Your cart is empty'
};

export const APP_URLS = {
  HOME: '/',
  LOGIN: '/actions/Account.action?signonForm=',
  CATALOG: '/actions/Catalog.action',
  CART: '/actions/Cart.action',
  ACCOUNT: '/actions/Account.action?editAccountForm='
};
