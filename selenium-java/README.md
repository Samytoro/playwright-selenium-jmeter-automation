# Selenium Java - Tests E2E JPetStore

Tests automatizados con Selenium WebDriver + Java + TestNG para JPetStore.

## Requisitos

- Java 11 o superior
- Maven 3.6+

## Estructura del Proyecto

```
selenium-java/
├── pom.xml                          # Configuración Maven
├── testng.xml                       # Suite de tests TestNG
└── src/test/java/com/jpetstore/tests/
    ├── BaseTest.java                # Clase base con setup/teardown
    ├── FlujoACompraCompletaTest.java    # Test Flujo A: Compra
    └── FlujoBGestionCuentaTest.java     # Test Flujo B: Gestión Cuenta
```

## Ejecución de Tests

### Opción 1: Ejecutar todos los tests con Maven

```bash
cd selenium-java
mvn clean test
```

### Opción 2: Ejecutar un test específico

```bash
mvn test -Dtest=FlujoACompraCompletaTest
mvn test -Dtest=FlujoBGestionCuentaTest
```

### Opción 3: Ejecutar con TestNG directamente

```bash
mvn test -DsuiteXmlFile=testng.xml
```

## Flujos de Prueba

### Flujo A: Compra Completa
1. Navegar a JPetStore
2. Login (credenciales pre-cargadas)
3. Seleccionar categoría Fish
4. Seleccionar producto Angelfish (FI-SW-01)
5. Agregar al carrito
6. Proceder al checkout
7. Confirmar orden
8. Verificar mensaje de confirmación

### Flujo B: Gestión de Cuenta
1. Navegar a JPetStore
2. Login
3. Acceder a My Account
4. Actualizar First Name y Last Name
5. Guardar cambios
6. Verificar mensaje de éxito

## Configuración de ChromeDriver

El proyecto usa **WebDriverManager** que descarga automáticamente el ChromeDriver apropiado.

## Configuración Anti-Popup

Los tests están configurados con ChromeOptions que deshabilitan:
- Gestor de contraseñas de Chrome
- Detección de automatización
- Popup de guardar contraseña

## Grabación de Video

Para grabar la ejecución:

### macOS:
1. Abre QuickTime Player
2. File → New Screen Recording
3. Ejecuta los tests: `mvn clean test`
4. Detén la grabación cuando terminen

### Windows:
1. Usa Xbox Game Bar (Win + G)
2. O cualquier software de grabación de pantalla

## Reportes

Los reportes de TestNG se generan en:
```
selenium-java/target/surefire-reports/
```

Abre `index.html` en un navegador para ver el reporte detallado.
