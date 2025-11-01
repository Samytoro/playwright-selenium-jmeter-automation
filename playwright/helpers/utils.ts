import { Page, Locator } from '@playwright/test';

export class TestUtils {
  
  static async waitForElement(locator: Locator, timeout = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  static async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  static async takeScreenshot(page: Page, name: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ 
      path: `screenshots/${name}-${timestamp}.png`,
      fullPage: true 
    });
  }

  static async waitForPageLoad(page: Page): Promise<void> {
    await page.waitForLoadState('load');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
  }


  static getUniqueTimestamp(): string {
    return Date.now().toString();
  }

  static async assertTextVisible(page: Page, text: string): Promise<boolean> {
    const content = await page.textContent('body');
    return content?.includes(text) || false;
  }

  static async retryAction<T>(
    action: () => Promise<T>,
    maxRetries = 3,
    delay = 1000
  ): Promise<T> {
    let lastError: Error | undefined;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await action();
      } catch (error) {
        lastError = error as Error;
        if (i < maxRetries - 1) {
          await this.wait(delay);
        }
      }
    }
    
    throw lastError;
  }

  static async wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static cleanText(text: string | null): string {
    return text?.trim().replace(/\s+/g, ' ') || '';
  }

  static log(message: string, data?: any): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`, data || '');
  }
}
