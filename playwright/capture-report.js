import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Abrir el reporte de JMeter
  await page.goto('file:///Users/cindy.garcia/Desktop/Samy/pruebas/jmeter/report/index.html');
  
  // Esperar a que cargue completamente
  await page.waitForTimeout(3000);
  
  // Tomar screenshot de la página completa
  await page.screenshot({ 
    path: '/Users/cindy.garcia/Desktop/Samy/pruebas/jmeter/jmeter-dashboard-screenshot.png',
    fullPage: true 
  });
  
  console.log('✓ Screenshot del dashboard guardado');
  
  // Intentar navegar a la sección de estadísticas si existe
  try {
    // Buscar link o botón de Statistics
    const statsLink = page.locator('text=Statistics').or(page.locator('text=Table')).first();
    if (await statsLink.isVisible({ timeout: 2000 })) {
      await statsLink.click();
      await page.waitForTimeout(2000);
      
      await page.screenshot({ 
        path: '/Users/cindy.garcia/Desktop/Samy/pruebas/jmeter/jmeter-statistics-screenshot.png',
        fullPage: true 
      });
      
      console.log('✓ Screenshot de estadísticas guardado');
    }
  } catch (e) {
    console.log('⚠ No se encontró sección de estadísticas separada');
  }
  
  await browser.close();
  console.log('✅ Screenshots completados');
})();
