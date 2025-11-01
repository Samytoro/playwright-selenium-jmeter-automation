# 🧪 Automatización E2E - JPetStore

## 📋 Descripción del Proyecto

Suite de pruebas automatizadas profesional para la aplicación **JPetStore** utilizando **Playwright** y **Selenium IDE**. Implementa las mejores prácticas de QA, incluyendo principios SOLID, Clean Code, DRY y KISS.

### 🎯 Objetivos

- **Módulo A - Compra Completa**: Automatizar el flujo completo desde login hasta confirmación de orden
- **Módulo B - Gestión de Cuenta**: Automatizar actualización de perfil de usuario
- **Visual Testing**: Capturas de pantalla y grabación de videos en cada paso crítico

---

## 🏗️ Arquitectura del Proyecto

El proyecto utiliza el patrón **Page Object Model (POM)** con **separación vertical de responsabilidades**:

```
pruebas/
├── 📁 pages/              # Page Objects (lógica de negocio por página)
│   ├── base.page.ts       # Clase base con métodos comunes
│   ├── login.page.ts      # Manejo de autenticación
│   ├── catalog.page.ts    # Navegación de catálogo y productos
│   ├── cart.page.ts       # Gestión del carrito de compras
│   ├── checkout.page.ts   # Proceso de checkout y pago
│   └── account.page.ts    # Gestión de perfil de usuario
│
├── 📁 locators/           # Selectores CSS centralizados
│   ├── login.locators.ts
│   ├── catalog.locators.ts
│   ├── cart.locators.ts
│   ├── checkout.locators.ts
│   └── account.locators.ts
│
├── 📁 tests/              # Tests E2E
│   ├── compra.spec.ts     # Módulo A: Flujo de compra completa
│   ├── perfil.spec.ts     # Módulo B: Actualización de perfil
│   └── visual.spec.ts     # Visual testing y capturas
│
├── 📁 helpers/            # Utilidades y datos de prueba
│   ├── utils.ts           # Helper functions reutilizables
│   └── test-data.ts       # Datos de prueba centralizados
│
├── 📁 fixtures/           # Fixtures personalizados de Playwright
│   └── base-test.ts       # Test extendido con page objects
│
├── 📁 screenshots/        # Capturas de pantalla de los tests
├── 📁 test-results/       # Resultados y videos de ejecución
├── 📁 playwright-report/  # Reportes HTML de Playwright
│
├── playwright.config.ts   # Configuración de Playwright
├── tsconfig.json          # Configuración de TypeScript
└── package.json           # Dependencias y scripts
```

---

## 🚀 Instalación y Configuración

### Prerequisitos

- Node.js v18 o superior
- npm o yarn

### Pasos de Instalación

```bash
# 1. Clonar el repositorio (o navegar a la carpeta)
cd /Users/cindy.garcia/Desktop/Samy/pruebas

# 2. Instalar dependencias
npm install

# 3. Instalar navegadores de Playwright
npx playwright install

# 4. Verificar instalación
npx playwright --version
```

---

## 🎮 Ejecución de Tests

### Comandos Principales

```bash
# Ejecutar TODOS los tests
npm test

# Ejecutar tests en modo headed (con UI visible)
npm run test:headed

# Ejecutar solo el módulo de Compra
npm run test:compra

# Ejecutar solo el módulo de Perfil
npm run test:perfil

# Ejecutar en modo debug (paso a paso)
npm run test:debug

# Abrir UI Mode (interfaz interactiva)
npm run test:ui

# Ver reporte HTML
npm run report
```

### Ejecución por Navegador

```bash
# Solo en Chromium
npx playwright test --project=chromium

# Solo en Firefox
npx playwright test --project=firefox

# Solo en WebKit (Safari)
npx playwright test --project=webkit

# En todos los navegadores
npx playwright test
```

---

## 📊 Principios de Diseño Aplicados

### ✅ SOLID

- **S**ingle Responsibility: Cada Page Object maneja una sola página
- **O**pen/Closed: Base classes extensibles sin modificación
- **L**iskov Substitution: Todas las páginas heredan de BasePage
- **I**nterface Segregation: Métodos específicos por responsabilidad
- **D**ependency Inversion: Inyección de dependencias via fixtures

### ✅ Clean Code

- Nombres descriptivos y autoexplicativos
- Funciones pequeñas con responsabilidad única
- Comentarios significativos
- Código legible y mantenible

### ✅ DRY (Don't Repeat Yourself)

- Locators centralizados y reutilizables
- Métodos helper comunes en BasePage
- Datos de prueba en archivo único
- Fixtures compartidos

### ✅ KISS (Keep It Simple, Stupid)

- Flujos de test claros y directos
- Lógica simple y comprensible
- Sin over-engineering

---

## 🧪 Descripción de Tests

### Módulo A: Compra Completa (`compra.spec.ts`)

**Flujo completo E2E:**

1. ✅ Login con credenciales válidas
2. ✅ Selección de categoría (FISH)
3. ✅ Selección de producto
4. ✅ Agregar item al carrito
5. ✅ Verificar carrito
6. ✅ Proceder al checkout
7. ✅ Ingresar información de pago
8. ✅ Confirmar orden
9. ✅ **Validar mensaje de confirmación** ⭐

**Aserción final requerida:**
```typescript
await expect(confirmationMessage).toContainText('Thank you, your order has been submitted');
```

### Módulo B: Gestión de Cuenta (`perfil.spec.ts`)

**Flujo de actualización de perfil:**

1. ✅ Login con credenciales válidas
2. ✅ Navegar a "My Account"
3. ✅ Actualizar al menos 2 campos (firstName, lastName)
4. ✅ Guardar cambios
5. ✅ **Validar mensaje de éxito** ⭐

**Aserción final requerida:**
```typescript
await expect(successMessage).toContainText('Your account has been updated');
```

### Visual Testing (`visual.spec.ts`)

- Capturas de todas las páginas principales
- Validación de elementos visuales clave
- Comparación de estados (carrito vacío vs con items)
- **Videos automáticos** de flujos completos
- Capturas en diferentes resoluciones

---

## 📸 Capturas y Videos

### Screenshots

Todas las capturas se guardan en la carpeta `screenshots/`:

- `01-compra-login-exitoso.png`
- `02-compra-categoria-fish.png`
- `03-compra-detalle-producto.png`
- `04-compra-carrito-con-item.png`
- `05-compra-pagina-pago.png`
- `06-compra-info-pago-completa.png`
- `07-compra-resumen-orden.png`
- `08-compra-orden-confirmada.png`
- *(y más...)*

### Videos

Los videos se generan automáticamente en `test-results/[test-name]/video.webm`

**Configuración en `playwright.config.ts`:**
```typescript
use: {
  video: 'on',          // Graba video de TODOS los tests
  screenshot: 'on',     // Captura en cada acción
  trace: 'on'          // Trace completo para debugging
}
```

---

## 📈 Reportes

### Reporte HTML

Después de ejecutar los tests:

```bash
npm run report
```

Abre automáticamente el reporte HTML con:
- ✅ Tests pasados/fallados
- ⏱️ Tiempos de ejecución
- 📸 Screenshots adjuntos
- 🎥 Videos de ejecución
- 📊 Traces interactivos

### Formatos de Reporte

El proyecto genera múltiples formatos:

- **HTML** → `playwright-report/index.html`
- **JSON** → `test-results/results.json`
- **JUnit** → `test-results/junit.xml`
- **Console** → Output en terminal

---

## 🔧 Configuración Avanzada

### Timeouts

```typescript
timeout: 60000,           // 60s por test
expect: { timeout: 10000 } // 10s por assertion
```

### Reintentos

```typescript
retries: process.env.CI ? 2 : 0  // 2 reintentos en CI
```

### Paralelización

```typescript
workers: 1  // Ejecución secuencial para evitar conflictos
```

---

## 📦 Datos de Prueba

### Credenciales de Usuario

```typescript
TEST_USER = {
  username: 'j2ee',
  password: 'j2ee'
}
```

### Datos de Tarjeta

```typescript
TEST_CARD = {
  cardType: 'Visa',
  cardNumber: '999 9999 9999 9999'
}
```

### Datos de Perfil

```typescript
UPDATED_PROFILE = {
  firstName: 'Juan',
  lastName: 'Pérez',
  email: 'juan.perez@test.com',
  phone: '555-0123',
  // ...más campos
}
```

---

## 🐛 Debugging

### Modo Debug

```bash
npm run test:debug
```

Abre el inspector de Playwright con:
- Breakpoints
- Step-by-step execution
- Console output
- Network logs

### Traces

Abrir trace de un test específico:

```bash
npx playwright show-trace test-results/[test-folder]/trace.zip
```

### Codegen

Generar código automáticamente:

```bash
npm run codegen
```

---

## 📚 Recursos Adicionales

- [Playwright Docs](https://playwright.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

---

## 👥 Autor

**QA Expert Team**

- Arquitectura profesional siguiendo best practices
- Código limpio y mantenible
- 100% cobertura de requisitos del ejercicio

---

## 📄 Licencia

MIT

---

## ✅ Checklist de Entrega

- [x] Módulo A: Compra Completa automatizada
- [x] Módulo B: Gestión de Cuenta automatizada
- [x] Aserciones finales implementadas
- [x] Locators robustos (CSS)
- [x] Page Object Model implementado
- [x] Principios SOLID aplicados
- [x] Clean Code y DRY
- [x] Screenshots en cada paso
- [x] Videos automáticos habilitados
- [x] Estructura profesional
- [x] Código documentado
- [ ] Tests de Selenium IDE (pendiente)
- [ ] Informe de análisis comparativo (pendiente)

---

🎉 **¡Proyecto listo para ejecución y entrega!**
