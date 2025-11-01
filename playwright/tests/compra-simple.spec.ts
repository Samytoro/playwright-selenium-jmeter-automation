import { test, expect } from '@playwright/test';

test.describe('Compra Completa - Flujo Grabado', () => {
  
  test('Debe completar el flujo de compra con el código grabado', async ({ page }) => {
    await page.goto('https://jpetstore.aspectran.com/');
    
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'screenshots/simple-01-login-exitoso.png',
      fullPage: true 
    });
    
    await page.locator('#SidebarContent').getByRole('link', { name: 'Fish' }).click();
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'screenshots/simple-02-categoria-fish.png',
      fullPage: true 
    });
    
    await page.getByRole('link', { name: 'FI-SW-01' }).click();
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'screenshots/simple-03-producto-angelfish.png',
      fullPage: true 
    });
    
    await page.getByRole('link', { name: 'Add to Cart' }).first().click();
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'screenshots/simple-04-carrito.png',
      fullPage: true 
    });
    
    await page.getByRole('link', { name: 'Proceed to Checkout' }).click();
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'screenshots/simple-05-checkout.png',
      fullPage: true 
    });
    
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'screenshots/simple-06-confirmacion.png',
      fullPage: true 
    });
    
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'screenshots/simple-07-orden-completada.png',
      fullPage: true 
    });
    
    const confirmationMessage = page.locator('ul.messages li');
    await expect(confirmationMessage).toContainText('Thank you, your order has been submitted');
  });

});
