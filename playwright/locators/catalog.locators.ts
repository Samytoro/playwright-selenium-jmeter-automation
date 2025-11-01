export const CatalogLocators = {
  fishCategory: 'a[href*="categoryId=FISH"]',
  dogsCategory: 'a[href*="categoryId=DOGS"]',
  catsCategory: 'a[href*="categoryId=CATS"]',
  reptilesCategory: 'a[href*="categoryId=REPTILES"]',
  birdsCategory: 'a[href*="categoryId=BIRDS"]',
  
  categoryImage: 'img[src*="fish"]',
  
  productList: '#Catalog table',
  productRow: 'tr',
  productLink: 'a[href*="productId"]',
  
  angelfishProduct: 'a[href*="productId=FI-SW-01"]',
  
  itemList: '#Catalog table',
  itemRow: 'tr',
  itemIdCell: 'td:nth-child(1)',
  itemDescriptionCell: 'td:nth-child(2)',
  itemPriceCell: 'td:nth-child(3)',
  addToCartButton: 'a[href*="addItemToCart"]',
  
  searchInput: 'input[name="keyword"]',
  searchButton: 'input[type="submit"][name="searchProducts"]',
  
  breadcrumb: '#Catalog',
  
  pageTitle: '#Catalog h2',
  
  quickLinks: '#QuickLinks a'
} as const;
