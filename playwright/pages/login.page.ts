import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { LoginLocators } from '../locators/login.locators';
import { UserCredentials } from '../helpers/test-data';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToLogin(): Promise<void> {
    await this.navigate('/actions/Account.action?signonForm=');
  }

  async clickSignIn(): Promise<void> {
    await this.click(LoginLocators.signInLink);
    await this.waitForSelector(LoginLocators.usernameInput);
  }

  async fillLoginForm(credentials: UserCredentials): Promise<void> {
    await this.fill(LoginLocators.usernameInput, credentials.username);
    await this.fill(LoginLocators.passwordInput, credentials.password);
  }

  async clickLoginButton(): Promise<void> {
    await this.click(LoginLocators.loginButton);
    await this.wait(1000);
  }

  async login(credentials: UserCredentials): Promise<void> {
    await this.page.getByRole('link', { name: 'Sign In' }).click();
    await this.wait(500);
    await this.fill(LoginLocators.usernameInput, credentials.username);
    await this.fill(LoginLocators.passwordInput, credentials.password);
    await this.page.getByRole('button', { name: 'Login' }).click();
    await this.wait(2000);
  }

  async verifyLoginSuccess(): Promise<void> {
    const welcomeElement = this.getLocator(LoginLocators.welcomeMessage);
    await expect(welcomeElement).toBeVisible();
    
    const signOutLink = this.getLocator(LoginLocators.signOutLink);
    await expect(signOutLink).toBeVisible();
  }

  async verifyWelcomeMessage(expectedText: string = 'Welcome'): Promise<void> {
    const welcomeElement = this.getLocator(LoginLocators.welcomeMessage);
    await expect(welcomeElement).toContainText(expectedText);
  }

  async logout(): Promise<void> {
    await this.click(LoginLocators.signOutLink);
    await this.waitForSelector(LoginLocators.signInLink);
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.isVisible(LoginLocators.signOutLink);
  }

  async getWelcomeText(): Promise<string> {
    return await this.getText(LoginLocators.welcomeMessage);
  }
}
