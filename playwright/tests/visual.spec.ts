import { test, expect } from '../fixtures/base-test';

test.describe('Visual Testing - Capturas y Smoke Tests', () => {

  test('Visual: Capturar todas las páginas principales de la aplicación', async ({ page }) => {
    await test.step('Captura: Home Page', async () => {
      await page.goto('https://jpetstore.aspectran.com');
      await page.waitForLoadState('networkidle');
      await page.screenshot({ 
        path: 'screenshots/visual-01-home-page.png',
        fullPage: true 
      });
    });

    await test.step('Captura: Login Page', async () => {
      await page.getByRole('link', { name: 'Sign In' }).click();
      await page.waitForLoadState('networkidle');
      await page.screenshot({ 
        path: 'screenshots/visual-02-login-page.png',
        fullPage: true 
      });
    });

    await test.step('Captura: Login y Categorías del catálogo', async () => {
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForTimeout(2000);
      
      await page.locator('#SidebarContent').getByRole('link', { name: 'Fish' }).click();
      await page.waitForLoadState('networkidle');
      await page.screenshot({ 
        path: 'screenshots/visual-03-catalog-fish.png',
        fullPage: true 
      });
    });

    await test.step('Captura: Account Page', async () => {
      await page.getByTitle('My Account').click();
      await page.waitForTimeout(500);
      await page.getByRole('link', { name: 'My Account' }).click();
      await page.waitForLoadState('networkidle');
      await page.screenshot({ 
        path: 'screenshots/visual-05-account-page.png',
        fullPage: true 
      });
    });
  });

  test('Visual: Comparar carrito con productos', async ({ page }) => {
    await page.goto('https://jpetstore.aspectran.com');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(2000);

    await test.step('Agregar item y capturar carrito', async () => {
      await page.locator('#SidebarContent').getByRole('link', { name: 'Fish' }).click();
      await page.waitForLoadState('networkidle');
      await page.getByRole('link', { name: 'FI-SW-01' }).click();
      await page.waitForLoadState('networkidle');
      await page.getByRole('link', { name: 'Add to Cart' }).first().click();
      await page.waitForLoadState('networkidle');
      
      await page.screenshot({ 
        path: 'screenshots/visual-07-cart-with-item.png',
        fullPage: true 
      });
    });
  });

  test('Visual: Capturar flujo completo en video (configurado automáticamente)', async ({ page }) => {
    await page.goto('https://jpetstore.aspectran.com');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(2000);
    
    await page.locator('#SidebarContent').getByRole('link', { name: 'Birds' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: 'AV-CB-01' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: 'Add to Cart' }).first().click();
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'screenshots/visual-09-video-flow-complete.png',
      fullPage: true 
    });
  });

  test('Visual: Capturar diferentes resoluciones de pantalla', async ({ page }) => {
    const viewports = [
      { name: 'desktop-hd', width: 1920, height: 1080 },
      { name: 'desktop', width: 1366, height: 768 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'mobile', width: 375, height: 667 }
    ];

    await page.goto('https://jpetstore.aspectran.com');
    await page.waitForLoadState('networkidle');
    
    for (const viewport of viewports) {
      await test.step(`Captura en ${viewport.name}`, async () => {
        await page.setViewportSize({ 
          width: viewport.width, 
          height: viewport.height 
        });
        
        await page.waitForTimeout(500);
        
        await page.screenshot({ 
          path: `screenshots/visual-viewport-${viewport.name}.png`,
          fullPage: true 
        });
      });
    }
  });

});
