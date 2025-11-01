import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '10s', target: 50 },  
    { duration: '1s', target: 50 },   
    { duration: '5s', target: 0 },    
  ],
  
  thresholds: {
    'http_req_duration': ['p(95)<5000'], 
    'http_req_failed': ['rate<0.01'],    
    'errors': ['rate<0.01'],             
  },
};

const BASE_URL = 'https://jpetstore.aspectran.com';
const CATALOG_PATH = '/catalog/categories/FISH';

export default function () {
  const params = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
    },
  };

  const response = http.get(`${BASE_URL}${CATALOG_PATH}`, params);

  const checkResult = check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 5000ms': (r) => r.timings.duration < 5000,
    'page contains FISH': (r) => r.body.includes('Fish') || r.body.includes('FISH'),
    'response size > 0': (r) => r.body.length > 0,
  });

  errorRate.add(!checkResult);

  sleep(0.5);
}

export function setup() {
  console.log('🚀 Iniciando prueba de carga K6 para JPetStore');
  console.log(`📊 Configuración: 50 usuarios virtuales, ramp-up 10s`);
  console.log(`🎯 URL objetivo: ${BASE_URL}${CATALOG_PATH}`);
}

export function teardown(data) {
  console.log('✅ Prueba de carga completada');
}
