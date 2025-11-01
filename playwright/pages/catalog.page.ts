import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { CatalogLocators } from '../locators/catalog.locators';
import { ProductCategory } from '../helpers/test-data';

export class CatalogPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToCatalog(): Promise<void> {
    await this.navigate('/actions/Catalog.action');
  }

  async selectCategory(category: ProductCategory): Promise<void> {
    const categoryName = category.charAt(0) + category.slice(1).toLowerCase();
    await this.page.locator('#SidebarContent').getByRole('link', { name: categoryName }).click();
    await this.wait(1000);
  }

  private getCategorySelector(category: ProductCategory): string {
    const categoryMap: Record<ProductCategory, string> = {
      [ProductCategory.FISH]: CatalogLocators.fishCategory,
      [ProductCategory.DOGS]: CatalogLocators.dogsCategory,
      [ProductCategory.CATS]: CatalogLocators.catsCategory,
      [ProductCategory.REPTILES]: CatalogLocators.reptilesCategory,
      [ProductCategory.BIRDS]: CatalogLocators.birdsCategory
    };
    
    return categoryMap[category];
  }

  async selectProductById(productId: string): Promise<void> {
    const productSelector = `a[href*="productId=${productId}"]`;
    await this.click(productSelector);
    await this.wait(1000);
  }

  async selectFirstProduct(): Promise<void> {
    const firstProduct = this.page.locator(CatalogLocators.productLink).first();
    await firstProduct.click();
    await this.wait(1000);
  }

  async selectAngelfishProduct(): Promise<void> {
    await this.page.getByRole('link', { name: 'FI-SW-01' }).click();
    await this.wait(1000);
  }

  async addFirstItemToCart(): Promise<void> {
    await this.page.getByRole('link', { name: 'Add to Cart' }).first().click();
    await this.wait(1500);
  }

  async addItemToCartByIndex(index: number): Promise<void> {
    const addToCartButton = this.page.locator(CatalogLocators.addToCartButton).nth(index);
    await addToCartButton.click();
    await this.wait(1500);
  }

  async searchProduct(keyword: string): Promise<void> {
    await this.fill(CatalogLocators.searchInput, keyword);
    await this.click(CatalogLocators.searchButton);
    await this.wait(1000);
  }

  async verifyProductListDisplayed(): Promise<void> {
    const productList = this.getLocator(CatalogLocators.productList);
    await expect(productList).toBeVisible();
  }

  async verifyItemListDisplayed(): Promise<void> {
    const itemList = this.getLocator(CatalogLocators.itemList);
    await expect(itemList).toBeVisible();
  }

  async getProductCount(): Promise<number> {
    const products = this.page.locator(CatalogLocators.productLink);
    return await products.count();
  }

  async getItemCount(): Promise<number> {
    const items = this.page.locator(CatalogLocators.addToCartButton);
    return await items.count();
  }

  async selectCategoryAndAddFirstItem(category: ProductCategory): Promise<void> {
    await this.selectCategory(category);
    await this.selectFirstProduct();
    await this.addFirstItemToCart();
  }
}
