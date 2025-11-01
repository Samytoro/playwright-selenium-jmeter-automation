# K6 Performance Testing - JPetStore

## 📊 Prueba de Carga - Catálogo FISH (Alternativa Moderna a JMeter)

Este directorio contiene el plan de pruebas de rendimiento para JPetStore usando **K6** (Grafana K6).

### 📋 Configuración de la Prueba

- **Usuarios Virtuales**: 50
- **Ramp-up Period**: 10 segundos
- **Ramp-down Period**: 5 segundos
- **URL Objetivo**: `https://jpetstore.aspectran.com/catalog/categories/FISH`
- **Método HTTP**: GET

### 📁 Archivos Incluidos

- `jpetstore-performance-test.js`: Script de prueba K6 (JavaScript)
- `results.json`: Resultados detallados en formato JSON
- `summary.json`: Resumen de métricas
- `output.txt`: Salida de consola de la ejecución
- `k6-results-screenshot.png`: Captura de pantalla del reporte

### 🚀 Cómo Ejecutar la Prueba

#### Instalación de K6
```bash
# macOS
brew install k6

# Linux
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6

# Windows
choco install k6
```

#### Ejecutar Prueba Básica
```bash
k6 run jpetstore-performance-test.js
```

#### Ejecutar con Salida JSON
```bash
k6 run --out json=results.json jpetstore-performance-test.js
```

#### Ejecutar con Resumen Exportado
```bash
k6 run --summary-export=summary.json jpetstore-performance-test.js
```

#### Ejecutar con Métricas en Tiempo Real
```bash
k6 run --http-debug jpetstore-performance-test.js
```

### 📈 Resultados Obtenidos

#### ✅ Resumen de Métricas

| Métrica | Valor | Estado |
|---------|-------|--------|
| **Total Requests** | 734 | ✅ |
| **Success Rate** | 100% | ✅ |
| **Error Rate** | 0% | ✅ |
| **Avg Response Time** | 330.6 ms | ✅ |
| **95th Percentile** | 671.06 ms | ✅ |
| **90th Percentile** | 347.29 ms | ✅ |
| **Min Response Time** | 279 ms | ✅ |
| **Max Response Time** | 1.01 s | ⚠️ |
| **Throughput** | 43.72 req/s | ✅ |
| **Data Received** | 2.7 MB | - |
| **Data Sent** | 353 KB | - |
| **Iterations** | 367 | ✅ |
| **Checks Passed** | 1468/1468 (100%) | ✅ |

#### 📊 Thresholds (Umbrales)

Todos los thresholds configurados pasaron exitosamente:

- ✅ `http_req_duration p(95) < 5000ms`: **671.06ms** (muy por debajo del límite)
- ✅ `http_req_failed rate < 1%`: **0%** (sin errores)
- ✅ `errors rate < 1%`: **0%** (sin errores personalizados)

### 🔍 Análisis Detallado

#### 1. **Tiempo de Respuesta**

- **Promedio**: 330.6 ms - ✅ Excelente (< 1000ms)
- **Mediana**: 301.83 ms - ✅ Muy bueno
- **P90**: 347.29 ms - ✅ El 90% de usuarios experimentan < 350ms
- **P95**: 671.06 ms - ✅ El 95% de usuarios experimentan < 700ms

**Conclusión**: El servidor maneja muy bien la carga de 50 usuarios concurrentes.

#### 2. **Estabilidad**

- **Error Rate**: 0% - ✅ Sin errores HTTP
- **Checks Success**: 100% (1468/1468) - ✅ Todas las validaciones pasaron
- **Failures**: 0 - ✅ Sin fallos

**Conclusión**: Sistema muy estable bajo carga.

#### 3. **Throughput (Rendimiento)**

- **Requests/segundo**: 43.72 - ✅ Buen rendimiento
- **Iterations/segundo**: 21.86 - ✅ Cada VU completa ~0.44 iteraciones/s

**Conclusión**: El servidor puede manejar ~44 solicitudes por segundo sin degradación.

### 📊 Comparación: K6 vs JMeter

| Aspecto | K6 | JMeter |
|---------|----|---------| 
| **Configuración** | JavaScript (23 líneas) | XML (150+ líneas) |
| **Ejecutar** | `k6 run script.js` | `jmeter -n -t plan.jmx ...` |
| **Output** | Terminal colorido + JSON | JTL + HTML report |
| **CI/CD** | Nativo, fácil integración | Requiere más configuración |
| **Thresholds** | Declarativos en código | Configurar en GUI |
| **Checks** | `check()` inline | Assertions separadas |
| **Métricas** | Automáticas + custom | Aggregate Report |
| **Performance** | Ligero (Go) | Pesado (Java + GUI) |
| **Curva Aprendizaje** | Programadores ✅ | QA tradicional ✅ |

### 🎯 Ventajas de K6

1. **Código como Configuración**:
   ```javascript
   export const options = {
     stages: [
       { duration: '10s', target: 50 },
     ],
   };
   ```

2. **Validaciones Inline**:
   ```javascript
   check(response, {
     'status is 200': (r) => r.status === 200,
   });
   ```

3. **Thresholds Declarativos**:
   ```javascript
   thresholds: {
     'http_req_duration': ['p(95)<5000'],
   }
   ```

4. **Output Claro**:
   ```
   ✓ http_req_duration...: avg=330.6ms
   ✓ checks.............: 100.00% ✓ 1468
   ```

### 🔗 Integración con Grafana Cloud

K6 se integra nativamente con Grafana Cloud para visualización avanzada:

```bash
k6 cloud run jpetstore-performance-test.js
```

### 📝 Conclusión

**K6 vs JMeter para este proyecto:**

| Criterio | Ganador | Razón |
|----------|---------|-------|
| Facilidad de Escritura | K6 | JavaScript vs XML |
| Facilidad de Ejecución | K6 | Un comando simple |
| Legibilidad | K6 | Código claro y conciso |
| CI/CD | K6 | Integración nativa |
| Reportes | JMeter | HTML dashboard incluido |
| Adopción Empresarial | JMeter | Más establecido |

**Recomendación**: 
- Para equipos modernos con DevOps: **K6**
- Para equipos QA tradicionales: **JMeter**
- Para este proyecto académico: **Ambos funcionan perfectamente** ✅

### 🔧 Estructura del Script K6

```javascript
// 1. Imports
import http from 'k6/http';
import { check } from 'k6';

// 2. Opciones de configuración
export const options = { ... };

// 3. Función principal (ejecutada por cada VU)
export default function () {
  const response = http.get(url);
  check(response, { ... });
}

// 4. Setup y Teardown (opcional)
export function setup() { ... }
export function teardown() { ... }
```

### 📚 Recursos Adicionales

- **Documentación**: https://k6.io/docs/
- **Ejemplos**: https://k6.io/docs/examples/
- **Grafana Cloud**: https://grafana.com/products/cloud/k6/
- **Community**: https://community.grafana.com/c/grafana-k6/

---

**Creado**: 1 de Noviembre 2025  
**Herramienta**: Grafana K6 v1.3.0  
**Proyecto**: JPetStore E2E Testing - Performance Module (K6 Alternative)
