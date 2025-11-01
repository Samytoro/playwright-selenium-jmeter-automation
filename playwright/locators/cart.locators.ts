
export const CartLocators = {
  cartTitle: '#Catalog h2',
  
  cartTable: '#Cart table',
  cartRow: 'tr',
  
  itemIdColumn: 'td:nth-child(1)',
  productIdColumn: 'td:nth-child(2)',
  descriptionColumn: 'td:nth-child(3)',
  quantityColumn: 'td:nth-child(5)',
  totalPriceColumn: 'td:nth-child(6)',
  
  quantityInput: 'input[name*="quantity"]',
  updateCartButton: 'input[name="updateCartQuantities"]',
  
  removeButton: 'a[href*="removeItemFromCart"]',
  proceedToCheckoutButton: 'a[href*="newOrderForm"]',
  
  subtotalRow: 'tr:has(td:has-text("Sub Total"))',
  subtotalAmount: 'td:last-child',
  
  emptyCartMessage: '#Catalog',
  
  continueShoppingLink: 'a[href*="Catalog"]'
} as const;
