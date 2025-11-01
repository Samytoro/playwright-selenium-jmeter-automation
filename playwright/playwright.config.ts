import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  
  timeout: 60000, // 60 segundos por test
  expect: {
    timeout: 10000 // 10 segundos para assertions
  },

  /* Configuración de ejecución */
  fullyParallel: false, // Secuencial para evitar conflictos
  forbidOnly: !!process.env.CI, // No permitir .only en CI
  retries: process.env.CI ? 2 : 0, // Reintentos en CI
  workers: process.env.CI ? 1 : 1, // Workers para paralelización
  
  /* Configuración de reportes */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list']
  ],

  /* Configuración compartida para todos los tests */
  use: {
    /* URL base */
    baseURL: 'https://jpetstore.aspectran.com',
    
    /* Trace on - mantiene traces para debugging */
    trace: 'on',
    
    /* Screenshot en cada acción para visual testing */
    screenshot: 'on',
    
    /* Video para todos los tests */
    video: 'on',
    
    /* Configuración de navegación */
    navigationTimeout: 30000,
    actionTimeout: 15000,
    
    /* Viewport */
    viewport: { width: 1920, height: 1080 },
    
    /* Ignorar errores de HTTPS */
    ignoreHTTPSErrors: true,
    
    /* Headers personalizados */
    extraHTTPHeaders: {
      'Accept-Language': 'es-ES,es;q=0.9'
    }
  },

  /* Proyectos de navegadores */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--start-maximized']
        }
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Tests móviles */
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  /* Configuración de web server local (si se necesita) */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
