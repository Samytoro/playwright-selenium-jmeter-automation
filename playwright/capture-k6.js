import { chromium } from '@playwright/test';
import { readFileSync } from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Leer el output de K6
  const k6Output = readFileSync('/Users/cindy.garcia/Desktop/Samy/pruebas/k6/output.txt', 'utf-8');
  
  // Crear una página HTML con el output de K6 formateado
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>K6 Performance Test Results - JPetStore</title>
  <style>
    body {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
      background: #1e1e1e;
      color: #d4d4d4;
      padding: 20px;
      margin: 0;
      font-size: 13px;
      line-height: 1.5;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: #252526;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    }
    h1 {
      color: #4ec9b0;
      border-bottom: 2px solid #4ec9b0;
      padding-bottom: 10px;
      margin-top: 0;
    }
    pre {
      background: #1e1e1e;
      padding: 20px;
      border-radius: 5px;
      overflow-x: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
      border-left: 4px solid #4ec9b0;
    }
    .success {
      color: #4ec9b0;
    }
    .metric {
      color: #dcdcaa;
    }
    .value {
      color: #b5cea8;
    }
    .header {
      color: #569cd6;
      font-weight: bold;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #3e3e42;
      color: #858585;
      font-size: 11px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 K6 Performance Test Results - JPetStore Catalog</h1>
    <pre>${k6Output.replace(/\n/g, '\n')}</pre>
    <div class="footer">
      Generated: ${new Date().toLocaleString()}<br>
      Test: 50 Virtual Users | Ramp-up: 10s | Target: /catalog/categories/FISH
    </div>
  </div>
</body>
</html>
  `;
  
  await page.setContent(html);
  await page.setViewportSize({ width: 1400, height: 1200 });
  
  await page.screenshot({ 
    path: '/Users/cindy.garcia/Desktop/Samy/pruebas/k6/k6-results-screenshot.png',
    fullPage: true 
  });
  
  console.log('✓ Screenshot de K6 guardado');
  
  await browser.close();
  console.log('✅ Screenshot completado');
})();
