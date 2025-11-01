import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { CartLocators } from '../locators/cart.locators';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToCart(): Promise<void> {
    await this.navigate('/actions/Cart.action?viewCart=');
  }

  async verifyCartNotEmpty(): Promise<void> {
    const cartTable = this.getLocator(CartLocators.cartTable);
    await expect(cartTable).toBeVisible();
    
    const cartRows = this.page.locator(CartLocators.cartRow);
    const count = await cartRows.count();
    
    expect(count).toBeGreaterThan(1);
  }

  async verifyCartTitle(): Promise<void> {
    const titleElement = this.getLocator(CartLocators.cartTitle);
    await expect(titleElement).toContainText('Shopping Cart');
  }

  async getSubtotal(): Promise<string> {
    const subtotalRow = this.page.locator('tr').filter({ hasText: 'Sub Total' });
    const subtotalCell = subtotalRow.locator('td').last();
    const subtotal = await subtotalCell.textContent();
    
    return this.cleanText(subtotal || '');
  }

  async updateItemQuantity(index: number, quantity: number): Promise<void> {
    const quantityInput = this.page.locator(CartLocators.quantityInput).nth(index);
    await quantityInput.clear();
    await quantityInput.fill(quantity.toString());
    await this.click(CartLocators.updateCartButton);
    await this.wait(1500); 
  }

  async removeItem(index: number): Promise<void> {
    const removeButton = this.page.locator(CartLocators.removeButton).nth(index);
    await removeButton.click();
    await this.wait(1500);
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.getByRole('link', { name: 'Proceed to Checkout' }).click();
    await this.wait(2000);
  }

  async verifyCheckoutButtonVisible(): Promise<void> {
    const checkoutButton = this.getLocator(CartLocators.proceedToCheckoutButton);
    await expect(checkoutButton).toBeVisible();
  }

  async getItemCount(): Promise<number> {
    const rows = this.page.locator(CartLocators.cartRow);
    const count = await rows.count();
    
    return Math.max(0, count - 2);
  }

  async getItemDescription(index: number): Promise<string> {
    const descriptionCell = this.page
      .locator(CartLocators.cartRow)
      .nth(index + 1)
      .locator(CartLocators.descriptionColumn);
    
    const description = await descriptionCell.textContent();
    return this.cleanText(description || '');
  }

  async verifyItemInCart(partialDescription: string): Promise<void> {
    const itemRow = this.page.locator(CartLocators.cartRow).filter({ 
      hasText: partialDescription 
    });
    
    await expect(itemRow).toBeVisible();
  }

  private cleanText(text: string): string {
    return text.trim().replace(/\s+/g, ' ');
  }
}
