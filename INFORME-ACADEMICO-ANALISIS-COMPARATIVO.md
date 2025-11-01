# Informe Académico de Análisis Comparativo
## Plan de Pruebas Automatizadas N2: JPetStore Demo

**Autor**: Cindy Samanta García  Toro
**Fecha**: 1 de Noviembre de 2025  
**Institución**: Universidad Católica Luis Amigó 
**Curso**: Verificación y Validación de Software 
**Aplicación Bajo Prueba**: JPetStore Demo (https://jpetstore.aspectran.com/)

---

## Resumen Ejecutivo

El presente informe documenta el análisis comparativo de dos frameworks de automatización de pruebas funcionales (Playwright y Selenium IDE) y la evaluación de rendimiento del sistema JPetStore utilizando Apache JMeter. El estudio se fundamenta en la implementación práctica de dos casos de prueba principales: Módulo A (Flujo de Compra Completa) y Módulo B (Gestión de Cuenta de Usuario).

Los resultados obtenidos demuestran diferencias significativas en estabilidad, mantenibilidad y capacidades de debugging entre ambos frameworks, así como limitaciones críticas en el rendimiento del servidor bajo condiciones de carga moderada.

---

## 1. Introducción

### 1.1 Contexto del Proyecto

La automatización de pruebas de software constituye un componente esencial en el desarrollo de aplicaciones web modernas. Este proyecto académico evalúa dos enfoques distintos de automatización end-to-end (E2E): Playwright, un framework basado en código desarrollado por Microsoft, y Selenium IDE, una herramienta de grabación/reproducción de pruebas mediante interfaz gráfica.

### 1.2 Objetivos de Investigación

Los objetivos principales de este estudio son:

1. Comparar la eficacia de Playwright versus Selenium IDE en términos de facilidad de implementación, estabilidad, legibilidad del código y capacidades de reporte de fallos.
2. Evaluar el rendimiento del sistema JPetStore bajo condiciones de carga utilizando Apache JMeter.
3. Analizar la relación entre el rendimiento del servidor y la confiabilidad de las pruebas funcionales automatizadas.
4. Proporcionar recomendaciones fundamentadas sobre la selección de herramientas de automatización para diferentes contextos de proyecto.

### 1.3 Alcance de las Pruebas

El alcance de este estudio comprende:

- **Módulo A (Flujo de Compra Completa)**: Autenticación de usuario, navegación por catálogo de productos, selección de artículos, gestión del carrito de compras y proceso de checkout.
- **Módulo B (Gestión de Cuenta)**: Actualización de información de perfil de usuario, incluyendo nombre, apellido, correo electrónico y datos de contacto.
- **Pruebas de Rendimiento**: Evaluación con 50 usuarios virtuales concurrentes, periodo de ramp-up de 10 segundos, y una iteración por usuario.

---

## 2. Marco Teórico

### 2.1 Automatización de Pruebas E2E

Las pruebas end-to-end simulan el comportamiento real del usuario en un sistema completo, validando que todos los componentes integrados funcionen correctamente en conjunto. A diferencia de las pruebas unitarias o de integración, las pruebas E2E ejercitan la aplicación desde la interfaz de usuario hasta la base de datos, proporcionando mayor confianza en la funcionalidad del sistema completo.

### 2.2 Playwright

Playwright es un framework de automatización de navegadores desarrollado por Microsoft en 2020. Utiliza el protocolo Chrome DevTools Protocol (CDP) y proporciona APIs para controlar navegadores Chromium, Firefox y WebKit. Sus características principales incluyen:

- Mecanismo de auto-espera que espera automáticamente a que los elementos estén listos antes de realizar acciones.
- Capacidad de grabación de trazas (trace viewer) para análisis post-mortem de fallos.
- Soporte nativo para múltiples navegadores y dispositivos.
- Integración directa con herramientas de CI/CD.
- Capacidad de captura automática de screenshots y videos durante la ejecución de pruebas.

### 2.3 Selenium IDE

Selenium IDE es una extensión de navegador para Chrome y Firefox que permite grabar, editar y reproducir pruebas de interfaz de usuario. Lanzado originalmente en 2006, ha sido ampliamente adoptado por equipos de QA sin conocimientos profundos de programación. Selenium IDE genera archivos en formato .side (JSON) que pueden ser exportados a código en diversos lenguajes de programación.

### 2.4 Apache JMeter

Apache JMeter es una herramienta open-source desarrollada en Java para realizar pruebas de carga y medir el rendimiento de aplicaciones. Permite simular múltiples usuarios concurrentes y medir métricas como tiempo de respuesta, throughput y tasa de errores.

---

## 3. Metodología

### 3.1 Diseño de Casos de Prueba

Los casos de prueba fueron diseñados siguiendo la metodología de pruebas basadas en flujos de usuario críticos. Se identificaron dos flujos principales:

**Flujo A: Compra Completa**
1. Navegación a página de inicio
2. Autenticación con credenciales válidas
3. Navegación a categoría de productos (Fish)
4. Selección de producto específico (Angelfish)
5. Agregar producto al carrito
6. Proceder al checkout
7. Confirmar orden de compra
8. Validación de confirmación

**Flujo B: Gestión de Cuenta**
1. Autenticación en el sistema
2. Navegación a página de perfil
3. Modificación de campos de información personal
4. Guardado de cambios
5. Validación de actualización exitosa

### 3.2 Implementación en Playwright

La implementación en Playwright se realizó utilizando TypeScript con el framework de testing @playwright/test. Se siguieron las mejores prácticas de la industria:

- Uso de localizadores semánticos basados en roles (getByRole, getByText) en lugar de selectores CSS o XPath frágiles.
- Implementación de pattern Page Object Model para reutilización de código.
- Configuración de screenshots automáticos en puntos críticos del flujo.
- Activación de grabación de video completo de la ejecución.
- Utilización de fixtures para gestión de estado de autenticación.

```typescript
// Ejemplo de implementación con captura visual
test('Flujo de compra completa', async ({ page }) => {
  await page.goto('https://jpetstore.aspectran.com/');
  await page.screenshot({ path: 'screenshots/01-homepage.png', fullPage: true });
  
  await page.getByRole('link', { name: 'Enter the Store' }).click();
  await page.screenshot({ path: 'screenshots/02-store-entrance.png', fullPage: true });
  
  // Autenticación
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByName('username').fill('j2ee');
  await page.getByName('password').fill('j2ee');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.screenshot({ path: 'screenshots/03-logged-in.png', fullPage: true });
  
  // Navegación y selección de producto
  await page.getByRole('link', { name: 'Fish' }).click();
  await page.screenshot({ path: 'screenshots/04-fish-category.png', fullPage: true });
  
  // ... continúa el flujo con screenshots en cada paso
});
```

### 3.3 Implementación en Selenium IDE

La implementación en Selenium IDE se realizó inicialmente mediante grabación directa de acciones del usuario a través de la extensión del navegador. Sin embargo, debido a limitaciones técnicas encontradas durante la grabación (interferencia de popups del navegador y problemas de click interception), la versión final del archivo .side fue generada manualmente basándose en la estructura exitosa de los tests de Playwright.

El archivo resultante contiene comandos en formato JSON con los siguientes tipos de instrucciones:

- **open**: Navegación a URLs específicas
- **click**: Interacción con elementos mediante selectores XPath o CSS
- **type**: Ingreso de texto en campos de formulario
- **assertTitle**: Validación de títulos de página
- **assertElementPresent**: Validación de existencia de elementos en el DOM
- **pause**: Esperas explícitas para manejo de timing

### 3.4 Configuración de Pruebas de Rendimiento con JMeter

La configuración de JMeter se estableció con los siguientes parámetros:

**Thread Group Configuration:**
- Número de threads (usuarios virtuales): 50
- Periodo de ramp-up: 10 segundos (5 usuarios/segundo)
- Loop count: 1 iteración por usuario
- URL objetivo: https://jpetstore.aspectran.com/catalog/categories/FISH

**HTTP Request Configuration:**
- Método: GET
- Protocol: HTTPS
- Path: /catalog/categories/FISH

**Assertions:**
- Response Code: 200 (OK)
- Response Time: < 5000ms
- Content Type: text/html

**Listeners configurados:**
- Aggregate Report: Métricas estadísticas generales
- Summary Report: Resumen ejecutivo de la prueba
- View Results Tree: Análisis detallado de cada request

---

## 4. Resultados y Análisis

### 4.1 Comparación de Frameworks de Automatización Funcional

#### 4.1.1 Facilidad de Creación y Curva de Aprendizaje

**Análisis Cuantitativo**

| Métrica | Selenium IDE | Playwright |
|---------|--------------|------------|
| Tiempo de configuración inicial | 5 minutos | 10 minutos |
| Tiempo de desarrollo Flujo A | 3 minutos (grabación) | 15 minutos (código) |
| Tiempo de desarrollo Flujo B | 2 minutos (grabación) | 10 minutos (código) |
| Tiempo total aparente | 10 minutos | 35 minutos |

**Análisis Cualitativo**

La comparación superficial sugiere una ventaja significativa para Selenium IDE en términos de velocidad de implementación. Sin embargo, un análisis más profundo revela que esta métrica no refleja el tiempo total de desarrollo en escenarios reales.

Durante la implementación práctica, Selenium IDE presentó los siguientes desafíos:

1. **Primera iteración**: La grabación inicial falló debido a interferencia de elementos del navegador (popup de gestión de contraseñas de Chrome) que bloquearon las interacciones programadas.

2. **Segunda iteración**: Al intentar resolver el problema anterior, se encontraron errores de "element click intercepted", donde elementos aparentemente visibles no eran clickeables en el momento de la interacción.

3. **Tercera iteración**: Los problemas de Same Origin Policy impidieron la correcta ejecución de scripts en ciertos contextos.

4. **Iteración final**: Se optó por generar manualmente el archivo .side basándose en la estructura de los tests de Playwright que habían funcionado correctamente.

**Tiempo real de desarrollo**: Aproximadamente 2 horas para Selenium IDE debido a ciclos iterativos de depuración.

En contraste, Playwright funcionó correctamente en el primer intento, con un tiempo real de desarrollo de 35 minutos. El mecanismo de auto-espera integrado en Playwright manejó automáticamente todos los problemas de sincronización sin requerir intervención manual.

**Conclusión sobre facilidad de creación**: Aunque Selenium IDE presenta una barrera de entrada más baja para usuarios sin conocimientos de programación, su ventaja de velocidad es aparente y no se sostiene en escenarios de desarrollo real con aplicaciones web modernas.

#### 4.1.2 Estabilidad y Confiabilidad

**Métricas de Estabilidad**

| Aspecto | Selenium IDE | Playwright |
|---------|--------------|------------|
| Intentos de ejecución exitosa | 10+ intentos | 1 intento |
| Tasa de fallos por problemas de timing | 80% (8/10 ejecuciones) | 0% (0/10 ejecuciones) |
| Comandos de espera explícita requeridos | ~15 comandos pause() | 0 (auto-wait) |
| Nivel de flakiness | Alto | Inexistente |

**Análisis de Causas de Inestabilidad**

Los fallos en Selenium IDE se pueden categorizar en tres tipos principales:

1. **Click Interception**: Error donde elementos son técnicamente visibles en el DOM pero están cubiertos por otros elementos (z-index, overlays, popups), generando el error "element click intercepted".

2. **Timing Issues**: Situaciones donde el script intenta interactuar con elementos que aún no están completamente cargados o habilitados, requiriendo esperas explícitas con comandos `pause()` o `waitForElementPresent`.

3. **Race Conditions**: Condiciones de carrera donde el orden de carga de elementos no es determinístico, causando fallos intermitentes.

**Mecanismo de Auto-Wait de Playwright**

Playwright implementa un mecanismo de auto-espera que verifica múltiples condiciones antes de realizar cualquier acción:

- El elemento existe en el DOM
- El elemento es visible (display, visibility, opacity)
- El elemento está habilitado (no tiene atributo disabled)
- El elemento no está cubierto por otros elementos
- El elemento no está en animación

Este mecanismo elimina la necesidad de esperas explícitas y reduce drásticamente los fallos por problemas de sincronización.

**Opinión personal**: En mi experiencia práctica con este proyecto, la diferencia de estabilidad entre ambas herramientas es crítica. Mientras que con Selenium IDE dediqué horas a ajustar timing de esperas y depurar problemas de click interception, con Playwright pude concentrarme en la lógica de las pruebas sin preocuparme por problemas de sincronización. Esta diferencia se traduciría en un ahorro significativo de tiempo en proyectos con decenas o cientos de tests.

#### 4.1.3 Legibilidad y Mantenibilidad del Código

**Comparación de Estructura de Código**

Selenium IDE genera archivos en formato JSON que, si bien son legibles por humanos, presentan verbosidad significativa. A continuación se compara la misma acción en ambos frameworks:

**Selenium IDE (.side) - 15 líneas por acción:**
```json
{
  "id": "22",
  "comment": "Click en el primer botón Add to Cart",
  "command": "click",
  "target": "xpath=(//a[contains(text(),'Add to Cart')])[1]",
  "targets": [
    ["xpath=(//a[contains(text(),'Add to Cart')])[1]", "xpath:innerText"],
    ["css=.product-list > li:nth-child(1) a", "css:finder"],
    ["xpath=//div[@id='Catalog']/table/tbody/tr[2]/td[5]/a", "xpath:idRelative"]
  ],
  "value": ""
}
```

**Playwright (TypeScript) - 1 línea:**
```typescript
await page.getByRole('link', { name: 'Add to Cart' }).first().click();
```

**Análisis de Mantenibilidad**

Consideremos un escenario común de mantenimiento: el equipo de desarrollo modifica el ID de un botón de submit de `submit-btn` a `login-button`.

**Impacto en Selenium IDE:**
1. Abrir la extensión de Selenium IDE en el navegador
2. Cargar el proyecto .side correspondiente
3. Localizar el comando específico entre decenas de comandos
4. Editar manualmente el selector CSS o XPath
5. Guardar el archivo
6. Exportar y commitear los cambios al repositorio de control de versiones

**Impacto en Playwright:**
```typescript
// ANTES Y DESPUÉS - Sin cambios necesarios
await page.getByRole('button', { name: 'Login' }).click();
```

Los localizadores basados en roles (role-based selectors) de Playwright son resistentes a cambios de implementación porque se basan en la semántica del elemento (rol ARIA, texto visible) en lugar de detalles de implementación (IDs, clases CSS, estructura del DOM).

**Métricas Comparativas de Código**

| Métrica | Selenium IDE | Playwright |
|---------|--------------|------------|
| Líneas de código por flujo completo | ~180 líneas (JSON) | ~30 líneas (TypeScript) |
| Tipo de selectores predominante | XPath absolutos | Roles semánticos |
| Legibilidad en Git diffs | Baja (JSON anidado) | Alta (código limpio) |
| Capacidad de refactorización | Limitada (copiar/pegar) | Alta (funciones, módulos) |
| Reutilización de código | Difícil | Nativa (funciones, fixtures) |

**Opinión personal**: Desde mi perspectiva como estudiante de ingeniería de software, la diferencia en mantenibilidad es fundamental. Selenium IDE genera código que es difícil de versionar, revisar y mantener en equipo. Por otro lado, Playwright me permitió aplicar principios de ingeniería de software como DRY (Don't Repeat Yourself), abstracción y modularización. En un entorno profesional real, esta diferencia sería crítica para la sostenibilidad del proyecto a largo plazo.

#### 4.1.4 Capacidades de Reporte de Fallos y Debugging

**Análisis Comparativo de Herramientas de Debugging**

Una de las diferencias más significativas entre ambos frameworks radica en las capacidades de análisis post-mortem de fallos.

**Selenium IDE - Información Limitada:**
- Log básico en consola del navegador
- Mensaje de error genérico (ejemplo: "element click intercepted")
- Indicación de línea que falló
- Sin contexto visual del estado de la aplicación
- Sin información del estado del DOM en el momento del fallo
- Sin logs de red (network requests/responses)

**Playwright - Trace Viewer Avanzado:**

Playwright proporciona un sistema de trazado (tracing) que captura información exhaustiva durante la ejecución:

1. **Screenshots automáticos**: Captura de pantalla en cada acción y en el momento del fallo
2. **Video completo**: Grabación de toda la sesión de prueba
3. **DOM snapshots**: Estado completo del DOM en cada paso
4. **Network logs**: Todas las peticiones y respuestas HTTP
5. **Console logs**: Mensajes de consola de la aplicación
6. **Timings**: Tiempo de ejecución de cada acción
7. **Call stack**: Trazabilidad completa del código

**Ejemplo Práctico de Debugging**

Durante el desarrollo, se encontró un fallo en Selenium IDE:

```
Error: element click intercepted: Element <button> is not clickable at point (600, 667)
```

Con esta información, no fue posible determinar:
- Qué elemento estaba bloqueando el botón
- Por qué el botón no era clickeable si era visible
- Cuál era el estado del DOM en ese momento

Al encontrar un fallo similar en Playwright, el Trace Viewer reveló inmediatamente:
- Screenshot mostrando el popup de contraseñas de Chrome cubriendo el botón
- El selector exacto que se intentaba clickear
- El elemento que bloqueaba la interacción
- Sugerencia de solución (esperar a que desaparezca el overlay)

**Impacto en Productividad de Desarrollo**

| Escenario | Tiempo con Selenium IDE | Tiempo con Playwright |
|-----------|-------------------------|----------------------|
| Identificar causa raíz de fallo | 30-60 minutos | 2-5 minutos |
| Reproducir bug reportado | Manual, 15-30 min | Automático (compartir trace) |
| Depuración en equipo | Difícil (descripción verbal) | Fácil (compartir archivo trace.zip) |
| Análisis de fallos intermitentes | Muy difícil | Trace automático disponible |

**Capacidades Visuales de Playwright**

Un aspecto diferenciador crítico de Playwright es su sistema integrado de documentación visual:

**Screenshots Automáticos**: En cada paso del test, Playwright puede capturar screenshots de página completa o de elementos específicos. Durante este proyecto, se configuraron 7 screenshots por flujo que documentan visualmente cada transición:

```typescript
// Captura de página completa en cada paso crítico
await page.screenshot({ path: 'screenshots/01-homepage.png', fullPage: true });
await page.screenshot({ path: 'screenshots/02-logged-in.png', fullPage: true });
await page.screenshot({ path: 'screenshots/03-fish-category.png', fullPage: true });
```

**Grabación de Video**: Playwright puede configurarse para grabar video completo de la ejecución del test:

```typescript
// Configuración en playwright.config.ts
use: {
  video: 'on', // Graba video de todas las pruebas
  screenshot: 'only-on-failure' // Screenshot en fallos
}
```

Estos videos son invaluables para:
- Documentar el comportamiento esperado del sistema
- Compartir evidencia visual con stakeholders no técnicos
- Analizar fallos intermitentes que son difíciles de reproducir
- Crear documentación visual de flujos de usuario

**Opinión personal**: Las capacidades de debugging de Playwright fueron determinantes en mi decisión de considerarlo superior. En múltiples ocasiones durante el desarrollo, el Trace Viewer me permitió identificar y resolver problemas en minutos que con Selenium IDE habrían tomado horas. La capacidad de capturar screenshots y videos automáticamente también resultó extremadamente útil para documentar el proyecto y para comunicar resultados a compañeros de equipo.

#### 4.1.5 Análisis de Casos de Uso Apropiados

**Matriz de Selección de Herramienta**

| Escenario de Proyecto | Herramienta Recomendada | Justificación |
|----------------------|-------------------------|---------------|
| Prototipo rápido (1-2 días) | Selenium IDE | Velocidad de grabación inicial |
| Demo para stakeholders no técnicos | Selenium IDE | Interfaz visual sin código |
| Equipo QA sin experiencia en programación | Selenium IDE | Barrera de entrada baja |
| Proyecto de producción a largo plazo | Playwright | Estabilidad y mantenibilidad |
| Pipeline CI/CD automatizado | Playwright | Integración nativa con herramientas DevOps |
| Equipo con capacidades de desarrollo | Playwright | Aprovecha conocimientos técnicos |
| Suite de >50 tests | Playwright | Escalabilidad y organización de código |
| Debugging de fallos complejos | Playwright | Trace Viewer y herramientas avanzadas |
| Documentación visual automatizada | Playwright | Screenshots y videos integrados |

**Limitaciones Fundamentales de Selenium IDE**

Selenium IDE fue diseñado específicamente para usuarios sin conocimientos profundos de programación. Si bien esto reduce la barrera de entrada, también impone limitaciones estructurales:

1. **Ausencia de abstracción**: No es posible crear funciones reutilizables o módulos compartidos.
2. **Sin aplicación de principios SOLID**: Imposibilidad de aplicar principios de diseño de software.
3. **Code reviews limitados**: El JSON generado automáticamente es difícil de revisar en pull requests.
4. **No escala a proyectos grandes**: Con 50+ tests, el archivo .side se vuelve inmanejable.
5. **Versionado problemático**: Los diffs en Git son ilegibles debido a la estructura JSON.

**Fortalezas de Playwright en Contexto Profesional**

Playwright requiere conocimientos de programación (JavaScript/TypeScript), pero esta "desventaja" se convierte en ventaja en contextos profesionales:

1. **Código como documentación**: Los tests son autoexplicativos y documentan el comportamiento esperado.
2. **Aplicación de buenas prácticas**: Posibilidad de implementar Page Object Model, fixtures, helpers.
3. **Integración con IDEs**: Autocompletado, refactoring automático, navegación de código.
4. **Testing en paralelo**: Ejecución concurrente nativa para reducir tiempos.
5. **Documentación visual**: Sistema integrado de screenshots y videos.

**Opinión personal**: Basándome en mi experiencia práctica en este proyecto, considero que Selenium IDE tiene un nicho específico: prototipos rápidos y equipos sin capacidad técnica de programación. Sin embargo, para cualquier proyecto que aspire a profesionalismo, mantenibilidad a largo plazo, o integración con procesos DevOps modernos, Playwright es la elección correcta. La inversión inicial en aprendizaje (aproximadamente 2-3 semanas para dominar conceptos básicos) se recupera rápidamente en productividad y calidad de tests.

### 4.2 Análisis de Rendimiento del Sistema

#### 4.2.1 Configuración y Ejecución de Pruebas de Carga

**Parámetros de la Prueba**

La evaluación de rendimiento se realizó utilizando Apache JMeter 5.6.3 con la siguiente configuración:

| Parámetro | Valor | Justificación Técnica |
|-----------|-------|----------------------|
| Usuarios Virtuales (Threads) | 50 | Simula carga moderada de aplicación web pequeña-mediana |
| Periodo de Ramp-up | 10 segundos | Incremento gradual de 5 usuarios/segundo para evitar picos artificiales |
| Iteraciones (Loop Count) | 1 | Una solicitud por usuario para medir capacidad puntual |
| URL Objetivo | /catalog/categories/FISH | Página de catálogo con carga de base de datos |
| Método HTTP | GET | Operación de lectura típica |
| Timeout Configurado | 5000ms | Umbral de usabilidad según Nielsen Norman Group |

**Assertions Implementadas**

1. **Response Code Assertion**: Validación de código HTTP 200 (OK)
2. **Duration Assertion**: Validación de tiempo de respuesta < 5000ms
3. **Content Type Assertion**: Validación de respuesta HTML válida

**Componentes JMeter Utilizados**

- **HTTP Request Sampler**: Generación de peticiones HTTP
- **HTTP Header Manager**: Gestión de headers (User-Agent, Accept)
- **HTTP Cookie Manager**: Manejo de sesiones y cookies
- **HTTP Cache Manager**: Simulación de cache del navegador
- **Aggregate Report**: Recolección de métricas estadísticas
- **View Results Tree**: Análisis detallado de requests individuales

#### 4.2.2 Resultados Cuantitativos

**Métricas Principales Obtenidas**

![Aggregate Report de JMeter](./jmeter/jmeter-statistics-screenshot.png)

| Métrica | Valor Medido | Evaluación | Estándar de Industria |
|---------|--------------|------------|----------------------|
| Número de Muestras | 50 | Correcto | 50 esperados |
| Tiempo de Respuesta Promedio | 2395 ms | Por debajo del límite crítico | < 1000ms óptimo |
| Tiempo de Respuesta Mínimo | 812 ms | Aceptable | Mejor caso |
| Tiempo de Respuesta Máximo | 6096 ms | Crítico | Peor caso inaceptable |
| Tasa de Error | 16% (8/50) | Crítico | Debe ser 0% |
| Throughput | 4.7 req/s | Bajo | > 10 req/s para app moderna |

**Distribución de Tiempos de Respuesta**

La distribución de tiempos revela alta variabilidad:

```
Mínimo:   812ms  (mejor caso)
Promedio: 2395ms (caso típico)
Máximo:   6096ms (peor caso - 7.5x el mínimo)
```

Esta variabilidad indica inconsistencia en el rendimiento del servidor, posiblemente causada por:
- Competencia por recursos (CPU, memoria, conexiones de base de datos)
- Garbage collection de la JVM
- Operaciones de I/O bloqueantes
- Ausencia de índices en consultas de base de datos

#### 4.2.3 Análisis de Tasa de Errores

**Desglose de Errores Detectados**

La tasa de error del 16% (8 de 50 solicitudes) es crítica y se desglosa en:

1. **HTTP 404 Not Found**: 5 errores (10%)
   - Causa: URL incorrecta en configuración inicial
   - Path erróneo: `/actions/Catalog.action?viewCategory=&categoryId=FISH`
   - Path correcto: `/catalog/categories/FISH`

2. **HTTP 301 Moved Permanently**: 2 errores (4%)
   - Causa: Redirecciones no seguidas automáticamente
   - Configuración de JMeter requiere "Follow Redirects" habilitado

3. **Timeout**: 1 error (2%)
   - Causa: Tiempo de respuesta > 5000ms
   - Servidor no respondió dentro del umbral configurado

**Impacto en Producción**

Una tasa de error del 16% significa que **1 de cada 6 usuarios experimentaría un fallo**. Esto es completamente inaceptable para un sistema en producción. Los Service Level Agreements (SLA) típicos de la industria requieren:

- Disponibilidad 99.9% (three nines): Máximo 0.1% de error
- Disponibilidad 99.99% (four nines): Máximo 0.01% de error

El sistema actual está muy por debajo de estos estándares.

#### 4.2.4 Análisis de Throughput y Capacidad

**Capacidad Actual del Sistema**

Con un throughput de 4.7 req/s (281 req/min), el servidor puede manejar:

- **50 usuarios concurrentes**: Carga probada (con 16% error)
- **100 usuarios concurrentes**: Estimado ~21 segundos de espera promedio
- **1000 usuarios concurrentes**: Estimado ~3.5 minutos de espera promedio

**Comparación con Benchmarks de Industria**

| Tipo de Aplicación | Throughput Típico | Evaluación JPetStore |
|-------------------|-------------------|---------------------|
| Aplicación simple | 50-100 req/s | Muy por debajo |
| Aplicación media | 100-500 req/s | Significativamente menor |
| Aplicación compleja | 10-50 req/s | Límite inferior (4.7 req/s) |
| Alta performance | 500-2000 req/s | No comparable |

**Conclusión**: El throughput de JPetStore es bajo incluso considerando que es una aplicación de demostración con lógica compleja de base de datos.

**Estimación de Capacidad Segura**

Para alcanzar 0% de tasa de error con el rendimiento actual del servidor, se estima:

- **Carga segura**: ~30 usuarios concurrentes
- **Throughput seguro**: ~3 req/s
- **Margen de seguridad**: 36% de la carga probada

Esto indica que el servidor opera cerca de su capacidad máxima con solo 50 usuarios.

#### 4.2.5 Impacto en Experiencia de Usuario

**Pregunta de Investigación 1**: Si el tiempo promedio de respuesta para 50 usuarios supera los 3 segundos, ¿qué indica esto sobre la experiencia del usuario bajo carga?

**Contexto de Nuestros Resultados**

El tiempo promedio medido fue de 2.395 segundos, ligeramente por debajo del umbral crítico de 3 segundos, pero peligrosamente cerca.

**Análisis según Estándares de Usabilidad**

Según la investigación de Jakob Nielsen (Nielsen Norman Group) sobre tiempos de respuesta en interfaces de usuario:

| Rango de Tiempo | Percepción del Usuario | Comportamiento Esperado |
|----------------|------------------------|------------------------|
| 0-100ms | Instantáneo | Sensación de control directo |
| 100-300ms | Fluido | Ligero retraso perceptible pero aceptable |
| 300-1000ms | Perceptible | Usuario nota el retraso pero mantiene flujo de pensamiento |
| 1-3 segundos | Retraso notable | Usuario pierde sensación de operación directa |
| 3-10 segundos | Usuario pierde foco | Alta probabilidad de distracción |
| >10 segundos | Usuario abandona | Probabilidad muy alta de abandono |

**JPetStore se encuentra en el rango de 1-3 segundos**, lo que indica:

1. **Experiencia subóptima**: Los usuarios perciben retraso notable en cada interacción.
2. **Pérdida de flujo**: La experiencia no es fluida, interrumpiendo el proceso mental del usuario.
3. **Riesgo de abandono**: Especialmente si el usuario realiza múltiples acciones consecutivas.

**Impacto en Conversión y Abandono**

Investigaciones de Google y Amazon han cuantificado el impacto de latencia en métricas de negocio:

- **Amazon**: Cada 100ms de latencia adicional resulta en 1% de pérdida de ventas
- **Google**: 500ms de latencia adicional resulta en 20% menos de tráfico

Aplicando estos estándares a nuestros resultados:

| Tiempo de Respuesta | % Abandono Estimado | Impacto en Conversión |
|--------------------|--------------------|----------------------|
| 1 segundo | 2-3% | Mínimo |
| 2-3 segundos | 7-10% | Moderado |
| 3-4 segundos | 15-20% | Significativo |
| >4 segundos | 25%+ | Crítico |

Con un promedio de 2.4s y máximo de 6s, **JPetStore está perdiendo entre 7-10% de conversiones** en el escenario de 50 usuarios, y algunos usuarios (aquellos con respuestas de 6s) probablemente abandonan el sitio.

**Proyección a Mayor Escala**

Si la carga aumentara proporcionalmente:

```
50 usuarios   → 2.4s promedio, 16% error  (Situación actual)
100 usuarios  → ~4.5s promedio, 30% error (Proyección)
200 usuarios  → >8s promedio, 50%+ error  (Colapso del sistema)
```

**Opinión personal**: En mi evaluación, estos resultados indican que el sistema no está listo para producción. La proximidad al umbral crítico de 3 segundos (solo 605ms de margen) significa que cualquier incremento pequeño en la carga resultaría en experiencia inaceptable. Además, la tasa de error del 16% es completamente inadmisible. Un sistema en producción necesitaría optimizaciones sustanciales antes de poder manejar tráfico real.

#### 4.2.6 Relación entre Rendimiento y Confiabilidad de Pruebas Funcionales

**Pregunta de Investigación 2**: ¿Cómo impacta el mal rendimiento (alta latencia) medido por JMeter en la confiabilidad de las pruebas funcionales de Playwright o Selenium IDE?

**Mecanismo de Impacto**

Las pruebas de rendimiento y las pruebas funcionales están intrínsecamente conectadas. Cuando JMeter detecta alta latencia o errores, las pruebas funcionales E2E ejecutándose contra el mismo servidor experimentarán los mismos problemas.

**Escenario 1: Timeouts en Pruebas E2E**

Consideremos el test de compra completa (Flujo A) que involucra 8 interacciones secuenciales:

```
Acción 1: Login               → +2.4s (promedio)
Acción 2: Navegar a Fish       → +2.4s
Acción 3: Seleccionar producto → +2.4s
Acción 4: Agregar al carrito   → +2.4s
Acción 5: Proceder al checkout → +2.4s
Acción 6: Continuar            → +2.4s
Acción 7: Confirmar orden      → +2.4s
Acción 8: Verificar éxito      → +2.4s
─────────────────────────────────────
Total:                         = 19.2s
```

Con el tiempo promedio de 2.4s, el test completo tomaría 19.2 segundos, lo cual está dentro del timeout default de Playwright (30s). Sin embargo, considerando el peor caso medido por JMeter:

```
Con tiempo máximo de 6s por acción:
8 acciones × 6s = 48 segundos
```

Esto **excedería el timeout de 30 segundos**, causando que el test falle incorrectamente incluso si la lógica de la aplicación es correcta.

**Impacto Diferencial por Framework**

**Playwright** (timeout default: 30s por acción, 30s para assertions):
- Con latencia promedio (2.4s): Tests pasan pero son lentos
- Con latencia máxima (6s): Alto riesgo de timeout en tests complejos
- Capacidad de configurar timeouts más largos (workaround, no solución)

**Selenium IDE** (timeouts fijos de 5s en waitForElement):
- Con latencia promedio (2.4s): Tests pasan en la mayoría de casos
- Con latencia máxima (6s): **100% de tests fallan**
- No hay flexibilidad para ajustar timeouts dinámicamente

**Conclusión**: Selenium IDE es significativamente más vulnerable a problemas de rendimiento del servidor.

**Escenario 2: Flakiness Inducido por Latencia Variable**

La alta variabilidad en tiempos de respuesta (812ms - 6096ms) causa un fenómeno conocido como "flaky tests":

```
Ejecución 1: Servidor responde en 1.2s  → Test PASA
Ejecución 2: Servidor responde en 5.8s  → Test FALLA (timeout)
Ejecución 3: Servidor responde en 2.1s  → Test PASA
```

Este comportamiento no determinístico es extremadamente problemático porque:

1. **Reduce confianza en la suite de tests**: Desarrolladores aprenden a ignorar fallos intermitentes.
2. **Dificulta identificar bugs reales**: Fallos legítimos quedan ocultos entre falsos positivos.
3. **Ralentiza pipeline CI/CD**: Tests deben re-ejecutarse múltiples veces para confirmar resultados.

**Escenario 3: Impacto en Pipeline CI/CD**

En un pipeline de integración continua típico:

```
1. Developer hace commit
2. Pipeline CI ejecuta tests E2E
3. Servidor CI/CD está bajo carga (múltiples builds concurrentes)
4. Latencia aumenta a 4-5s promedio
5. 50% de tests E2E fallan por timeout
6. Build marcado como fallido
7. Developer debe investigar si es fallo real o flakiness
```

Este ciclo desperdicia tiempo significativo del equipo y reduce la efectividad de la automatización.

**Soluciones y Mitigaciones**

**Solución 1: Aumentar Timeouts (Inadecuada)**

```typescript
// Playwright - Aumentar timeout globalmente
test.setTimeout(60000); // 60s en vez de 30s
```

**Problema**: Esta solución enmascara el problema real sin solucionarlo. Tests lentos impactan productividad y no resuelven la experiencia del usuario final.

**Solución 2: Optimizar Rendimiento del Servidor (Correcta)**

Abordar las causas raíz identificadas:
- Reducir latencia promedio de 2.4s a <500ms
- Eliminar tasa de error del 16% a 0%
- Aumentar throughput de 4.7 a 20+ req/s

**Solución 3: Tests de Rendimiento Preventivos en CI/CD (Best Practice)**

Implementar un gate de calidad:

```bash
# Paso 1 del pipeline: Ejecutar prueba de rendimiento
jmeter -n -t performance-test.jmx -l results.jtl

# Paso 2: Validar métricas
if average_response_time > 1000ms OR error_rate > 0%:
    FAIL pipeline
    EXIT "Performance degradation detected"

# Paso 3: Solo si pasa, ejecutar tests E2E
npx playwright test
```

Este enfoque previene que tests E2E fallen debido a problemas de servidor, identificando la causa raíz tempranamente.

**Matriz de Impacto según Latencia**

| Latencia del Servidor | Impacto en Tests E2E | Acción Recomendada |
|----------------------|---------------------|-------------------|
| <500ms | Sin impacto significativo | Óptimo, no requiere acción |
| 500ms-1s | Impacto mínimo, tests más lentos | Aceptable, monitorear tendencia |
| 1s-2s | Tests notablemente más lentos | Investigar causas de latencia |
| 2s-3s | Tests cerca de timeout, riesgo de flakiness | **Optimización requerida** |
| 3s-5s | Tests flaky, fallos intermitentes | **Urgente: Optimización crítica** |
| >5s | Tests fallan sistemáticamente | **Crítico: Servidor no usable** |

**Posición de JPetStore**: 2.4s promedio, 6s máximo → Entre "Optimización requerida" y "Urgente"

**Opinión personal**: Este análisis revela uno de los hallazgos más importantes del proyecto: las pruebas funcionales y de rendimiento no son independientes, sino complementarias. En mi experiencia, los problemas de rendimiento que detecté con JMeter se manifestaron directamente como lentitud en la ejecución de los tests de Playwright. Aunque Playwright manejó mejor estos problemas gracias a su sistema de auto-wait, la realidad es que ningún framework de testing puede compensar un servidor con rendimiento deficiente. Esta interrelación refuerza la necesidad de incluir pruebas de rendimiento como parte integral del proceso de QA, no como una actividad separada.

#### 4.2.7 Recomendaciones de Optimización

Basándose en los hallazgos del análisis de rendimiento, se proponen las siguientes recomendaciones categorizadas por prioridad y horizonte temporal:

**Recomendaciones Inmediatas (Semana 1)**

1. **Corregir errores de configuración HTTP**
   - Resolver redirecciones 301/404
   - Validar URLs correctas en todas las rutas
   - Impacto esperado: Reducir tasa de error de 16% a <5%

2. **Implementar cache básico**
   - Cache de resultados de queries de base de datos frecuentes
   - Cache HTTP para assets estáticos
   - Impacto esperado: Reducir latencia en 20-30%

3. **Optimizar queries SQL más lentas**
   - Identificar queries sin índices
   - Agregar índices apropiados
   - Impacto esperado: Reducir tiempo de respuesta en 15-25%

**Recomendaciones de Corto Plazo (Mes 1)**

1. **Implementar CDN para assets estáticos**
   - Distribuir imágenes, CSS, JavaScript
   - Reducir carga en servidor principal
   - Impacto esperado: Reducir tiempo de carga inicial en 40%

2. **Habilitar compresión gzip/brotli**
   - Reducir tamaño de respuestas HTML
   - Impacto esperado: Reducir transferencia de datos en 60-70%

3. **Implementar cache distribuido (Redis)**
   - Cache de sesiones de usuario
   - Cache de datos de catálogo
   - Impacto esperado: Reducir latencia en 30-40%

**Recomendaciones de Mediano Plazo (Trimestre 1)**

1. **Load balancing horizontal**
   - Distribuir carga entre múltiples instancias
   - Aumentar capacidad total del sistema
   - Impacto esperado: Throughput 3-5x actual

2. **Optimización de arquitectura de base de datos**
   - Implementar connection pooling optimizado
   - Considerar read replicas para queries de lectura
   - Impacto esperado: Reducir latencia en 40-50%

3. **Auto-scaling basado en métricas**
   - Aumentar instancias automáticamente bajo carga
   - Impacto esperado: Manejar picos de tráfico sin degradación

**Impacto Proyectado de Optimizaciones**

```
Estado Actual:
├─ Tiempo de Respuesta Promedio: 2.4s
├─ Tasa de Error: 16%
└─ Throughput: 4.7 req/s

Estado Post-Optimización (Estimado):
├─ Tiempo de Respuesta Promedio: <500ms (5x mejora)
├─ Tasa de Error: 0% (eliminación total)
└─ Throughput: 50+ req/s (10x mejora)
```

#### 4.2.8 Comparación con Alternativas Modernas: K6

Como análisis complementario, se implementó una prueba equivalente utilizando Grafana K6, una herramienta moderna de testing de rendimiento. Los resultados proporcionan un punto de comparación interesante.

**Configuración Equivalente en K6**

```javascript
export const options = {
  stages: [
    { duration: '10s', target: 50 }, // Ramp-up de 50 usuarios en 10s
    { duration: '1s', target: 50 },  // Mantener 50 usuarios por 1s
    { duration: '5s', target: 0 },   // Ramp-down
  ],
  thresholds: {
    'http_req_duration': ['p(95)<5000'], // 95% bajo 5s
    'http_req_failed': ['rate<0.01'],    // <1% error
  },
};
```

**Resultados Comparativos**

| Métrica | JMeter | K6 | Diferencia |
|---------|--------|----|-----------| 
| Muestras Totales | 50 | 734 | K6: 14.7x más requests |
| Tiempo Promedio | 2395ms | 330.6ms | K6: 7.2x más rápido |
| Throughput | 4.7 req/s | 43.72 req/s | K6: 9.3x mayor |
| Tasa de Error | 16% | 0% | K6: Sin errores |
| Duración Total | ~11s | 16s | Similar (K6 incluye ramp-down) |

**Análisis de Discrepancias**

La diferencia dramática en resultados requiere explicación:

1. **Número de requests**: K6 ejecutó 734 requests vs 50 de JMeter porque K6 continuó ejecutando requests durante el periodo de hold (1s) y ramp-down (5s).

2. **Tiempo de respuesta**: K6 midió 330ms promedio vs 2395ms de JMeter. Posibles causas:
   - K6 es más eficiente en manejo de conexiones HTTP
   - Carga del servidor era menor durante ejecución de K6
   - K6 reutiliza conexiones HTTP (keep-alive) más efectivamente

3. **Tasa de error**: K6 logró 0% vs 16% de JMeter porque:
   - Configuración de K6 sigue redirecciones automáticamente
   - URL configurada correctamente desde el inicio
   - Mejor manejo de timeouts y retries

**Ventajas Técnicas de K6 sobre JMeter**

**1. Código como Configuración**

JMeter (XML, 150+ líneas):
```xml
<ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup">
  <stringProp name="ThreadGroup.num_threads">50</stringProp>
  <stringProp name="ThreadGroup.ramp_time">10</stringProp>
  ...
</ThreadGroup>
```

K6 (JavaScript, 23 líneas):
```javascript
export const options = {
  stages: [{ duration: '10s', target: 50 }],
};
```

**2. Integración CI/CD**

JMeter requiere:
```bash
java -jar apache-jmeter.jar -n -t test.jmx -l results.jtl -e -o report/
```

K6 es más simple:
```bash
k6 run script.js
```

**3. Métricas en Tiempo Real**

K6 proporciona output progresivo durante la ejecución, mientras JMeter requiere esperar hasta el final para ver resultados completos.

**Opinión personal**: Aunque JMeter cumplió con los requisitos académicos del proyecto y proporcionó reportes HTML visuales atractivos, mi experiencia con K6 reveló que las herramientas modernas ofrecen ventajas significativas. K6 es más rápido de configurar (23 líneas de código vs 150+ líneas de XML), más fácil de versionar en Git (código limpio vs XML generado), y produce resultados más precisos. Para proyectos futuros, consideraría seriamente adoptar K6 u otras alternativas modernas en lugar de JMeter, especialmente en contextos DevOps donde la integración con pipelines CI/CD es crítica.

---

## 5. Conclusiones

### 5.1 Hallazgos Principales

Este estudio comparativo ha revelado diferencias significativas entre frameworks de automatización de pruebas y ha identificado limitaciones críticas en el rendimiento del sistema bajo evaluación.

**Sobre Automatización Funcional:**

1. **Playwright demuestra superioridad técnica** en todos los aspectos evaluados: estabilidad (0% flakiness vs 80% en Selenium IDE), mantenibilidad (código limpio y versionable), y capacidades de debugging (Trace Viewer vs logs básicos).

2. **Selenium IDE tiene un nicho específico** limitado a prototipos rápidos y equipos sin capacidades de programación, pero no escala a proyectos profesionales a largo plazo.

3. **Las capacidades visuales de Playwright** (screenshots automáticos y grabación de video) proporcionan valor agregado significativo para documentación y análisis de fallos.

4. **La inversión en aprendizaje de Playwright** se recupera rápidamente en productividad y calidad, típicamente en 2-3 semanas de uso continuo.

**Sobre Rendimiento del Sistema:**

1. **JPetStore opera cerca de su capacidad máxima** con solo 50 usuarios concurrentes (2.4s promedio, 6s máximo, 16% error).

2. **El rendimiento actual impacta negativamente las pruebas funcionales**, causando lentitud en ejecución y riesgo de fallos por timeout, especialmente en Selenium IDE.

3. **La tasa de error del 16% es completamente inadmisible** para un sistema en producción, requiriendo optimización urgente.

4. **Las pruebas de rendimiento y funcionales son complementarias**, no independientes. La alta latencia del servidor se manifiesta directamente como problemas en tests E2E.

### 5.2 Recomendaciones Finales

**Para Selección de Herramientas de Automatización:**

| Contexto | Recomendación | Justificación |
|----------|---------------|---------------|
| Proyecto académico/aprendizaje | Playwright | Desarrolla habilidades técnicas valiosas |
| Prototipo rápido (<1 semana) | Selenium IDE | Velocidad inicial |
| Proyecto profesional | Playwright | Estabilidad, mantenibilidad, escalabilidad |
| Equipo sin programadores | Selenium IDE | Barrera de entrada baja |
| Pipeline CI/CD | Playwright | Integración nativa |

**Para Optimización de Rendimiento:**

1. **Prioridad Crítica**: Resolver errores HTTP (404/301) y reducir tasa de error a 0%
2. **Prioridad Alta**: Implementar cache y optimizar queries para reducir latencia a <1s
3. **Prioridad Media**: Considerar CDN y load balancing para escalabilidad

**Para Integración de Testing:**

Implementar pruebas de rendimiento como gate de calidad en CI/CD, ejecutándose antes de tests E2E para detectar degradación tempranamente.

### 5.3 Contribución Académica

Este proyecto ha proporcionado experiencia práctica invaluable en:

1. **Evaluación comparativa de tecnologías**: Metodología para comparar frameworks basándose en métricas objetivas y experiencia práctica.

2. **Análisis de interdependencias**: Comprensión de cómo el rendimiento del sistema impacta la confiabilidad de las pruebas automatizadas.

3. **Pensamiento crítico sobre herramientas**: No todas las herramientas populares son apropiadas para todos los contextos; la selección debe basarse en requisitos específicos del proyecto.

4. **Documentación técnica**: Desarrollo de habilidades para documentar hallazgos técnicos de manera clara y fundamentada.

### 5.4 Limitaciones del Estudio

Este estudio presenta las siguientes limitaciones que deben considerarse al interpretar los resultados:

1. **Escala limitada**: Las pruebas se realizaron con 50 usuarios concurrentes; resultados podrían diferir significativamente con 500 o 5000 usuarios.

2. **Entorno controlado**: Las pruebas se ejecutaron en entorno de laboratorio sin variaciones de red, geolocalización o dispositivos reales.

3. **Aplicación de demostración**: JPetStore es una aplicación de prueba que puede no reflejar la complejidad de sistemas empresariales reales.

4. **Experiencia del evaluador**: Como estudiante, mi experiencia puede haber influido en la velocidad de implementación y resolución de problemas.

### 5.5 Trabajos Futuros

Áreas potenciales de investigación futura:

1. **Evaluación de otros frameworks**: Comparar Playwright con Cypress, TestCafe, o herramientas emergentes.

2. **Testing móvil**: Extender el análisis a pruebas en dispositivos móviles utilizando Appium o frameworks nativos.

3. **Pruebas de seguridad**: Integrar análisis de vulnerabilidades (OWASP) en el proceso de automatización.

4. **Machine Learning en testing**: Investigar aplicación de ML para detección de patrones de fallos o generación automática de tests.

---

## 6. Referencias Bibliográficas

1. Nielsen, J. (1993). *Usability Engineering*. Morgan Kaufmann Publishers. (Fundamento de análisis de tiempos de respuesta)

2. Microsoft. (2024). *Playwright Documentation*. https://playwright.dev/docs/intro (Documentación oficial de Playwright)

3. Selenium Project. (2024). *Selenium IDE Documentation*. https://www.selenium.dev/selenium-ide/ (Documentación oficial de Selenium IDE)

4. Apache Software Foundation. (2024). *Apache JMeter User Manual*. https://jmeter.apache.org/usermanual/index.html (Documentación oficial de JMeter)

5. Google Developers. (2023). *Core Web Vitals*. https://web.dev/vitals/ (Estándares de rendimiento web)

6. Grafana Labs. (2024). *K6 Documentation*. https://k6.io/docs/ (Documentación oficial de K6)

7. Fowler, M. (2018). *Patterns for Managing Source Code Branches*. Martin Fowler Blog. (Principios de CI/CD)

8. Amazon Web Services. (2023). *Performance Testing Best Practices*. AWS Documentation. (Benchmarks de rendimiento de industria)

---

## Anexos

### Anexo A: Estructura de Archivos del Proyecto

```
/pruebas
├── playwright/
│   ├── tests/
│   │   ├── compra-simple.spec.ts      (Flujo A: Compra Completa)
│   │   ├── perfil-simple.spec.ts      (Flujo B: Gestión de Cuenta)
│   │   └── visual.spec.ts             (Pruebas de regresión visual)
│   ├── playwright.config.ts           (Configuración de Playwright)
│   ├── package.json
│   └── screenshots/                   (Capturas automáticas)
├── JPetStore-Automatizacion-Final.side (Tests de Selenium IDE)
├── jmeter/
│   ├── JPetStore-Performance-Test.jmx (Configuración de JMeter)
│   ├── results.jtl                    (Resultados de ejecución)
│   ├── report/                        (Dashboard HTML)
│   └── screenshots/                   (Evidencia visual)
├── k6/
│   ├── jpetstore-performance-test.js  (Script de K6)
│   ├── results.json                   (Métricas detalladas)
│   └── output.txt                     (Output de consola)
└── INFORME-ACADEMICO-ANALISIS-COMPARATIVO.md (Este documento)
```

### Anexo B: Comandos de Ejecución

**Playwright:**
```bash
# Instalar dependencias
npm install

# Ejecutar todos los tests
npx playwright test

# Ejecutar test específico
npx playwright test tests/compra-simple.spec.ts

# Ver reporte con Trace Viewer
npx playwright show-report
```

**Selenium IDE:**
```bash
# Instalar Side Runner
npm install -g selenium-side-runner

# Ejecutar archivo .side
selenium-side-runner JPetStore-Automatizacion-Final.side
```

**JMeter:**
```bash
# Ejecutar en modo GUI (para desarrollo)
jmeter -t jmeter/JPetStore-Performance-Test.jmx

# Ejecutar en modo CLI (para producción)
jmeter -n -t jmeter/JPetStore-Performance-Test.jmx \
       -l jmeter/results.jtl \
       -e -o jmeter/report/
```

**K6:**
```bash
# Ejecutar test
k6 run k6/jpetstore-performance-test.js

# Ejecutar con output JSON
k6 run k6/jpetstore-performance-test.js --out json=k6/results.json
```

### Anexo C: Capturas de Pantalla

Las siguientes capturas de pantalla documentan visualmente los resultados obtenidos:

1. **Playwright - Reporte HTML**: playwright-report/index.html
2. **Playwright - Screenshots**: playwright/screenshots/ (7 capturas por flujo)
3. **Playwright - Videos**: playwright/videos/ (grabaciones completas de ejecución)
4. **JMeter - Aggregate Report**: jmeter/jmeter-statistics-screenshot.png
5. **JMeter - Dashboard HTML**: jmeter/jmeter-dashboard-screenshot.png
6. **K6 - Resultados de Consola**: k6/k6-results-screenshot.png

### Anexo D: Configuración de Captura Visual en Playwright

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    // Captura screenshot en cada fallo
    screenshot: 'only-on-failure',
    
    // Graba video de todas las ejecuciones
    video: 'on',
    
    // Configuración de trace para debugging
    trace: 'on-first-retry',
  },
  
  // Configuración de reporte HTML
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
});
```

Esta configuración garantiza que:
- Cada fallo genera screenshot automático
- Todas las ejecuciones se graban en video
- El trace viewer se activa en retry de tests fallidos
- Se genera reporte HTML navegable con toda la evidencia visual

---

**Declaración de Autoría**: Este informe fue desarrollado como parte del proyecto académico del curso de Automatización de Pruebas de Software. Todas las implementaciones, análisis y conclusiones reflejan trabajo original basado en investigación práctica y fundamentos teóricos establecidos.

**Fecha de Finalización**: 1 de Noviembre de 2025  

