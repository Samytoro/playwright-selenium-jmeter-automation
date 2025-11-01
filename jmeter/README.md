# JMeter Performance Testing - JPetStore

## 📊 Prueba de Carga - Catálogo FISH

Este directorio contiene el plan de pruebas de rendimiento para JPetStore usando Apache JMeter.

### 📋 Configuración de la Prueba

- **Usuarios Virtuales**: 50
- **Ramp-up Period**: 10 segundos
- **Loop Count**: 1 iteración por usuario
- **URL Objetivo**: `https://jpetstore.aspectran.com/catalog/categories/FISH`
- **Método HTTP**: GET

### 📁 Archivos Incluidos

- `JPetStore-Performance-Test.jmx`: Plan de pruebas de JMeter
- `results.jtl`: Resultados de la ejecución en formato JTL
- `report/`: Reporte HTML generado automáticamente
- `report/index.html`: Dashboard principal con todas las métricas

### 🚀 Cómo Ejecutar la Prueba

#### Opción 1: Modo GUI (Recomendado para desarrollo)
```bash
jmeter -t JPetStore-Performance-Test.jmx
```

#### Opción 2: Modo No-GUI (Recomendado para ejecución)
```bash
jmeter -n -t JPetStore-Performance-Test.jmx -l results.jtl -e -o report
```

### 📈 Ver Resultados

#### Ver Reporte HTML
```bash
open report/index.html
```

El reporte incluye:
- **Dashboard**: Vista general con gráficos de rendimiento
- **Statistics**: Tabla con métricas detalladas (Average, Min, Max, 90% Line, Throughput, Error %)
- **Charts**: Gráficos de Response Time Over Time, Active Threads, etc.

### 🔍 Métricas Clave a Analizar

#### 1. **Tiempo de Respuesta**
- **Average**: Tiempo promedio de respuesta
- **90% Line**: El 90% de las solicitudes completaron en este tiempo o menos
- **Min/Max**: Rango de tiempos de respuesta

#### 2. **Throughput (Rendimiento)**
- Solicitudes por segundo que el servidor pudo manejar

#### 3. **Error Rate**
- Porcentaje de solicitudes fallidas
- Debe ser 0% idealmente

### 📊 Captura de Pantalla del Aggregate Report

Para el entregable, debes tomar un screenshot de:

1. Abrir `report/index.html` en el navegador
2. Ir a la sección "Statistics" o "Summary Report"
3. Tomar screenshot mostrando:
   - # Samples
   - Average
   - Min / Max
   - 90% Line
   - Error %
   - Throughput

### 🎯 Análisis de Resultados

#### ✅ Resultados Esperados
- **Average < 3000ms**: Experiencia de usuario aceptable
- **90% Line < 5000ms**: Mayoría de usuarios tienen buena experiencia
- **Error % = 0%**: Todas las solicitudes exitosas
- **Throughput > 4 req/s**: Servidor maneja bien la carga

#### ⚠️ Resultados Actuales (Ejemplo)
Basado en la última ejecución:
- **Total Samples**: 50
- **Average**: ~2395 ms
- **Min**: 812 ms
- **Max**: 6096 ms
- **Error Rate**: 16% (8/50 requests)

**Nota**: El 16% de errores puede deberse a:
- Redirecciones HTTP 301
- Timeouts en algunas solicitudes
- Limitaciones del servidor bajo carga

### 🔧 Componentes del Plan de Pruebas

1. **Thread Group**: Configuración de usuarios virtuales
2. **HTTP Request Sampler**: Solicitud GET al catálogo
3. **HTTP Header Manager**: Headers realistas de navegador
4. **HTTP Cookie Manager**: Gestión de sesiones
5. **HTTP Cache Manager**: Simulación de caché del navegador
6. **Response Assertion**: Validar código HTTP 200
7. **Duration Assertion**: Validar tiempo de respuesta < 5s
8. **Aggregate Report**: Métricas consolidadas
9. **Summary Report**: Resumen ejecutivo
10. **View Results Tree**: Detalles de cada solicitud

### 📝 Conclusiones para el Informe

**Impacto en Pruebas Funcionales:**
- Si el tiempo promedio supera 3 segundos, las pruebas funcionales de Playwright/Selenium IDE pueden fallar por timeout
- Un servidor lento causaría que las esperas implícitas no sean suficientes
- Los tests E2E se volverían inestables (flaky) bajo carga

**Recomendaciones:**
- Optimizar la página de catálogo para reducir tiempo de carga
- Implementar CDN para recursos estáticos
- Considerar caché de base de datos para consultas frecuentes
- Monitorear el servidor durante pruebas funcionales

---

**Creado**: 1 de Noviembre 2025
**Herramienta**: Apache JMeter 5.6.3
**Proyecto**: JPetStore E2E Testing - Performance Module
