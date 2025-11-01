import { test, expect } from '@playwright/test';

test.describe('Gestión de Cuenta - Flujo Grabado', () => {
  
  test('Debe actualizar al menos dos campos del perfil y validar mensaje de éxito', async ({ page }) => {
    await page.goto('https://jpetstore.aspectran.com/');
    
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: 'screenshots/perfil-simple-01-login-exitoso.png',
      fullPage: true 
    });
    
    await page.getByTitle('My Account').click();
    await page.waitForTimeout(500);
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'screenshots/perfil-simple-02-pagina-cuenta.png',
      fullPage: true 
    });
    
    const firstName = 'Juan_' + Date.now();
    await page.locator('input[name="firstName"]').click();
    await page.locator('input[name="firstName"]').fill(firstName);
    
    const lastName = 'Pérez_' + Date.now();
    await page.locator('input[name="lastName"]').click();
    await page.locator('input[name="lastName"]').fill(lastName);
    
    await page.screenshot({ 
      path: 'screenshots/perfil-simple-03-campos-actualizados.png',
      fullPage: true 
    });
    
    await page.getByRole('button', { name: 'Save Account Information' }).click();
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'screenshots/perfil-simple-04-guardado.png',
      fullPage: true 
    });
  });

  test('Debe actualizar múltiples campos del perfil', async ({ page }) => {
    await page.goto('https://jpetstore.aspectran.com/');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');
    
    await page.getByTitle('My Account').click();
    await page.waitForTimeout(500);
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('networkidle');
    
    const timestamp = Date.now();
    
    await page.locator('input[name="firstName"]').fill(`Carlos_${timestamp}`);
    await page.locator('input[name="lastName"]').fill(`Rodríguez_${timestamp}`);
    await page.locator('input[name="email"]').fill(`carlos${timestamp}@test.com`);
    await page.locator('input[name="phone"]').fill('555-0123');
    
    await page.screenshot({ 
      path: 'screenshots/perfil-simple-05-multiples-campos.png',
      fullPage: true 
    });
    
    await page.getByRole('button', { name: 'Save Account Information' }).click();
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'screenshots/perfil-simple-06-guardado-multiple.png',
      fullPage: true 
    });
  });

});
