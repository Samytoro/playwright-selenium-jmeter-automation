import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { AccountLocators } from '../locators/account.locators';
import { UserProfile } from '../helpers/test-data';

export class AccountPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToAccount(): Promise<void> {
    await this.navigate('/actions/Account.action?editAccountForm=');
  }

  async clickMyAccount(): Promise<void> {
    await this.click(AccountLocators.myAccountLink);
    await this.wait(1500);
  }

  async verifyAccountPage(): Promise<void> {
    const pageTitle = this.getLocator(AccountLocators.pageTitle);
    await expect(pageTitle).toBeVisible();
  }

  async updateProfile(profile: Partial<UserProfile>): Promise<void> {
    const fieldMap: Record<keyof UserProfile, string> = {
      firstName: AccountLocators.firstNameInput,
      lastName: AccountLocators.lastNameInput,
      email: AccountLocators.emailInput,
      phone: AccountLocators.phoneInput,
      address1: AccountLocators.address1Input,
      address2: AccountLocators.address2Input,
      city: AccountLocators.cityInput,
      state: AccountLocators.stateInput,
      zip: AccountLocators.zipInput,
      country: AccountLocators.countryInput
    };

    for (const [field, value] of Object.entries(profile)) {
      if (value && fieldMap[field as keyof UserProfile]) {
        await this.fill(fieldMap[field as keyof UserProfile], value);
      }
    }
  }

  async updateTwoFields(
    field1: keyof UserProfile,
    value1: string,
    field2: keyof UserProfile,
    value2: string
  ): Promise<void> {
    const profile: Partial<UserProfile> = {
      [field1]: value1,
      [field2]: value2
    };
    
    await this.updateProfile(profile);
  }

  async saveAccount(): Promise<void> {
    await this.click(AccountLocators.saveAccountButton);
    await this.wait(2000);  
  }

  async verifySuccessMessage(expectedMessage: string = 'Your account has been updated'): Promise<void> {
    const successMessage = this.getLocator(AccountLocators.successMessage);
    await expect(successMessage).toBeVisible({ timeout: 10000 });
    await expect(successMessage).toContainText(expectedMessage);
  }

  async getFieldValue(fieldName: keyof typeof AccountLocators): Promise<string> {
    const selector = AccountLocators[fieldName as keyof typeof AccountLocators];
    if (typeof selector !== 'string') return '';
    
    const input = this.getLocator(selector);
    const value = await input.inputValue();
    
    return value;
  }

  async verifyFieldValue(fieldName: string, expectedValue: string): Promise<void> {
    const fieldMap: Record<string, string> = {
      firstName: AccountLocators.firstNameInput,
      lastName: AccountLocators.lastNameInput,
      email: AccountLocators.emailInput,
      phone: AccountLocators.phoneInput,
      address1: AccountLocators.address1Input,
      city: AccountLocators.cityInput,
      state: AccountLocators.stateInput,
      zip: AccountLocators.zipInput,
      country: AccountLocators.countryInput
    };
    
    const selector = fieldMap[fieldName];
    if (!selector) return;
    
    const input = this.getLocator(selector);
    await expect(input).toHaveValue(expectedValue);
  }

  async updateTwoFieldsAndSave(
    field1: keyof UserProfile,
    value1: string,
    field2: keyof UserProfile,
    value2: string
  ): Promise<void> {
    await this.updateTwoFields(field1, value1, field2, value2);
    await this.saveAccount();
    await this.verifySuccessMessage();
  }

  async navigateUpdateAndSave(profile: Partial<UserProfile>): Promise<void> {
    await this.navigateToAccount();
    await this.updateProfile(profile);
    await this.saveAccount();
    await this.verifySuccessMessage();
  }
}
