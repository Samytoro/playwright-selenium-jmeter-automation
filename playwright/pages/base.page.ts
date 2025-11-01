import { Page, Locator } from '@playwright/test';
import { TestUtils } from '../helpers/utils';

export abstract class BasePage {
  protected page: Page;
  protected baseURL: string = 'https://jpetstore.aspectran.com';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = ''): Promise<void> {
    const url = path.startsWith('http') ? path : `${this.baseURL}${path}`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await TestUtils.waitForPageLoad(this.page);
  }

  protected getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  protected async click(selector: string): Promise<void> {
    const locator = this.getLocator(selector);
    await TestUtils.waitForElement(locator);
    await locator.click();
  }

  protected async fill(selector: string, text: string): Promise<void> {
    const locator = this.getLocator(selector);
    await TestUtils.waitForElement(locator);
    await locator.clear();
    await locator.fill(text);
  }

  protected async selectOption(selector: string, value: string): Promise<void> {
    const locator = this.getLocator(selector);
    await TestUtils.waitForElement(locator);
    await locator.selectOption(value);
  }

  protected async getText(selector: string): Promise<string> {
    const locator = this.getLocator(selector);
    await TestUtils.waitForElement(locator);
    const text = await locator.textContent();
    return TestUtils.cleanText(text);
  }

  protected async isVisible(selector: string): Promise<boolean> {
    try {
      const locator = this.getLocator(selector);
      return await locator.isVisible();
    } catch {
      return false;
    }
  }

  protected async waitForSelector(selector: string, timeout = 10000): Promise<void> {
    const locator = this.getLocator(selector);
    await locator.waitFor({ state: 'visible', timeout });
  }

  async takeScreenshot(name: string): Promise<void> {
    await TestUtils.takeScreenshot(this.page, name);
  }

  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async reload(): Promise<void> {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    await TestUtils.waitForPageLoad(this.page);
  }

  protected async executeScript<T>(script: string): Promise<T> {
    return await this.page.evaluate(script) as T;
  }

  protected async wait(ms: number): Promise<void> {
    await TestUtils.wait(ms);
  }

  protected log(message: string, data?: any): void {
    TestUtils.log(`[${this.constructor.name}] ${message}`, data);
  }
}
