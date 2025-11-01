export const CheckoutLocators = {
  pageTitle: '#Catalog h2',
  
  paymentSection: '#Catalog form',
  
  cardTypeSelect: 'select[name="order.cardType"]',
  cardTypeVisa: 'option[value="Visa"]',
  cardTypeMasterCard: 'option[value="MasterCard"]',
  cardTypeAmex: 'option[value="American Express"]',
  
  cardNumberInput: 'input[name="order.creditCard"]',
  
  expiryDateInput: 'input[name="order.expiryDate"]',
  
  firstNameInput: 'input[name="order.billToFirstName"]',
  lastNameInput: 'input[name="order.billToLastName"]',
  address1Input: 'input[name="order.billAddress1"]',
  address2Input: 'input[name="order.billAddress2"]',
  cityInput: 'input[name="order.billCity"]',
  stateInput: 'input[name="order.billState"]',
  zipInput: 'input[name="order.billZip"]',
  countryInput: 'input[name="order.billCountry"]',
  
  shipToFirstNameInput: 'input[name="order.shipToFirstName"]',
  shipToLastNameInput: 'input[name="order.shipToLastName"]',
  shipAddress1Input: 'input[name="order.shipAddress1"]',
  shipAddress2Input: 'input[name="order.shipAddress2"]',
  shipCityInput: 'input[name="order.shipCity"]',
  shipStateInput: 'input[name="order.shipState"]',
  shipZipInput: 'input[name="order.shipZip"]',
  shipCountryInput: 'input[name="order.shipCountry"]',
  
  shippingAddressCheckbox: 'input[name="shippingAddressRequired"]',
  
  continueButton: 'input[name="newOrder"][value="Continue"]',
  confirmButton: 'input[name="confirmed"][value="Confirm"]',
  
  orderSummary: '#Catalog table',
  orderItemRow: 'tr',
  
  confirmationMessage: '#Catalog > ul.messages > li',
  confirmationText: 'li:has-text("Thank you")',
  orderNumber: '#Catalog table tr:has-text("Order #") td',
  
  orderDate: 'td:has-text("Date")',
  orderStatus: 'td:has-text("Status")',
  
  orderTotal: 'td:has-text("Total")'
} as const;
