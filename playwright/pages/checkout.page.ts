import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { CheckoutLocators } from '../locators/checkout.locators';
import { CardInfo } from '../helpers/test-data';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async verifyPaymentInformationPage(): Promise<void> {
    const pageTitle = this.getLocator(CheckoutLocators.pageTitle);
    await expect(pageTitle).toBeVisible();
  }

  async selectCardType(cardType: string): Promise<void> {
    await this.selectOption(CheckoutLocators.cardTypeSelect, cardType);
  }

  async fillCardNumber(cardNumber: string): Promise<void> {
    await this.fill(CheckoutLocators.cardNumberInput, cardNumber);
  }

  async fillExpiryDate(expiryDate: string): Promise<void> {
    await this.fill(CheckoutLocators.expiryDateInput, expiryDate);
  }

  async fillBillingInformation(billingInfo: {
    firstName?: string;
    lastName?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  }): Promise<void> {
    const fieldMap: Record<string, string> = {
      firstName: CheckoutLocators.firstNameInput,
      lastName: CheckoutLocators.lastNameInput,
      address1: CheckoutLocators.address1Input,
      address2: CheckoutLocators.address2Input,
      city: CheckoutLocators.cityInput,
      state: CheckoutLocators.stateInput,
      zip: CheckoutLocators.zipInput,
      country: CheckoutLocators.countryInput
    };

    for (const [field, value] of Object.entries(billingInfo)) {
      if (value && fieldMap[field]) {
        await this.fill(fieldMap[field], value);
      }
    }
  }

  async fillCardInformation(cardInfo: CardInfo): Promise<void> {
    await this.selectCardType(cardInfo.cardType);
    await this.fillCardNumber(cardInfo.cardNumber);
    
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 2);
    const expiryDate = `12/${futureDate.getFullYear()}`;
    await this.fillExpiryDate(expiryDate);
  }

  async clickContinue(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.wait(2000);
  }

  async verifyOrderSummary(): Promise<void> {
    const orderSummary = this.getLocator(CheckoutLocators.orderSummary);
    await expect(orderSummary).toBeVisible();
  }

  async confirmOrder(): Promise<void> {
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    await this.wait(3000);
  }

  async verifyOrderConfirmation(expectedMessage: string = 'Thank you, your order has been submitted'): Promise<void> {
    const confirmationMessage = this.page.locator(CheckoutLocators.confirmationMessage);
    await expect(confirmationMessage).toContainText(expectedMessage);
  }

  async getOrderNumber(): Promise<string> {
    const orderRow = this.page.locator('tr').filter({ hasText: /Order\s*#/ });
    const orderCell = orderRow.locator('td').last();
    const orderNumber = await orderCell.textContent();
    
    return orderNumber?.trim() || '';
  }

  async completeCheckoutWithMinimalData(cardInfo: CardInfo): Promise<void> {
    await this.fillCardInformation(cardInfo);
    await this.clickContinue();
    await this.verifyOrderSummary();
    await this.confirmOrder();
  }

  async completeCheckoutWithFullData(
    cardInfo: CardInfo,
    billingInfo: {
      firstName?: string;
      lastName?: string;
      address1?: string;
      address2?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
    }
  ): Promise<void> {
    await this.fillCardInformation(cardInfo);
    await this.fillBillingInformation(billingInfo);
    await this.clickContinue();
    await this.verifyOrderSummary();
    await this.confirmOrder();
  }

  async verifyOrderComplete(): Promise<string> {
    await this.verifyOrderConfirmation();
    return await this.getOrderNumber();
  }
}
