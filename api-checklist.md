1️⃣ Arquitectura y diseño

- [ ] La API sigue principios REST o GraphQL claros.
- [ ] Endpoints son granulares y coherentes (no overfetching).
- [ ] La estructura de rutas es consistente (/api/v1/...).
- [ ] Uso correcto de HTTP methods: GET, POST, PUT, DELETE, PATCH.
- [ ] Separación de capas: rutas → controladores → servicios → repositorios.
- [ ] La API está preparada para versionado.
- [ ] Los schemas de datos están definidos y validados (p. ej. Zod, valibot, Joi).
- [ ] Estructura de monorepo o turborepo organizada y modular.

2️⃣ Base de datos y modelo de datos

- [ ] Relaciones entre tablas bien definidas (FK, índices).
- [ ] Índices para consultas frecuentes (WHERE, JOIN, ORDER BY).
- [ ] Normalización vs. denormalización según necesidad de rendimiento.
- [ ] Validación de datos antes de insertar/actualizar.
- [ ] Migraciones controladas y versionadas.
- [ ] Manejo de transacciones en operaciones críticas.
- [ ] Evitar queries N+1 (usar JOIN o prefetch).

3️⃣ Rendimiento y eficiencia

- [ ] Cache en Redis (Upstash o local) para datos que cambian poco.
- [ ] TTL adecuado en cache para no saturar Redis.
- [ ] Paginación en endpoints que devuelven muchos datos.
- [ ] Compresión de respuestas (gzip / brotli).
- [ ] Evitar cálculos o transformaciones pesadas en cada request; preprocesar si es posible.
- [ ] Limitar concurrencia de consultas externas (APIs de terceros).
- [ ] Uso de índices y consultas optimizadas.
- [ ] Evitar fetch innecesario en frontend → solo pedir lo que necesita.

4️⃣ Seguridad

- [ ] HTTPS obligatorio en producción.
- [ ] Variables sensibles (API keys, DB passwords, Redis URL) en env vars, nunca hardcoded.
- [ ] Sanitización de inputs para prevenir SQL Injection / NoSQL Injection.
- [ ] Validación estricta de tipos y formatos.
- [ ] Autenticación y autorización correcta (JWT, OAuth, sessions).
- [ ] Rate limiting para evitar abuse o DDOS.
- [ ] Logging de errores sin exponer datos sensibles.
- [ ] Protección contra CSRF, XSS si frontend consume la API directamente.
- [ ] Escaneo de vulnerabilidades en dependencias (npm audit).

5️⃣ Observabilidad y monitoreo

- [ ] Logging estructurado y centralizado (p. ej. Winston, Pino).
- [ ] Métricas básicas: requests por segundo, latencia, errores 4xx/5xx.
- [ ] Monitoreo de Redis / DB (uso memoria, conexiones).
- [ ] Alertas si la API responde lento o hay errores críticos.
- [ ] Manejo de errores unificado (middleware global).

6️⃣ Pruebas y calidad

- [ ] Tests unitarios en servicios y controladores.
- [ ] Tests de integración (DB + API).
- [ ] Mock de servicios externos para pruebas.

Cobertura de endpoints críticos.

Pruebas de carga (stress test) para endpoints con mucho tráfico.

7️⃣ Despliegue y DevOps

- [ ] Dockerfile optimizado (multi-stage, caching de dependencias).
- [ ] Docker Compose para desarrollo local (backend + frontend + Redis).
- [ ] CI/CD configurado (lint, tests, build, deploy).
- [ ] Variables de entorno y secretos manejados por el proveedor (Render, AWS).
- [ ] Rollback plan en caso de deploy fallido.
- [ ] Health checks y readiness probes configurados.

8️⃣ Extras de eficiencia y UX

- [ ] Uso de ETag / Cache-Control en respuestas GET.
- [ ] Minimizar payload de respuesta (solo campos necesarios).
- [ ] Rate limiting o throttling configurable según usuario/IP.
- [ ] Manejo de errores claros para frontend (404, 401, 500).

- [ ] Uso correcto de HTTP methods: GET, POST, PUT, DELETE, PATCH.
- [ ] Separación de capas: rutas → controladores → servicios → repositorios.
- [ ] La API está preparada para versionado.
- [ ] Los schemas de datos están definidos y validados (p. ej. Zod, valibot, Joi).
- [ ] Estructura de monorepo o turborepo organizada y modular.

2️⃣ Base de datos y modelo de datos

- [ ] Relaciones entre tablas bien definidas (FK, índices).
- [ ] Índices para consultas frecuentes (WHERE, JOIN, ORDER BY).
- [ ] Normalización vs. denormalización según necesidad de rendimiento.
- [ ] Validación de datos antes de insertar/actualizar.
- [ ] Migraciones controladas y versionadas.
- [ ] Manejo de transacciones en operaciones críticas.
- [ ] Evitar queries N+1 (usar JOIN o prefetch).

3️⃣ Rendimiento y eficiencia

- [ ] Cache en Redis (Upstash o local) para datos que cambian poco.
- [ ] TTL adecuado en cache para no saturar Redis.
- [ ] Paginación en endpoints que devuelven muchos datos.
- [ ] Compresión de respuestas (gzip / brotli).
- [ ] Evitar cálculos o transformaciones pesadas en cada request; preprocesar si es posible.
- [ ] Limitar concurrencia de consultas externas (APIs de terceros).
- [ ] Uso de índices y consultas optimizadas.
- [ ] Evitar fetch innecesario en frontend → solo pedir lo que necesita.

4️⃣ Seguridad

- [ ] HTTPS obligatorio en producción.
- [ ] Variables sensibles (API keys, DB passwords, Redis URL) en env vars, nunca hardcoded.
- [ ] Sanitización de inputs para prevenir SQL Injection / NoSQL Injection.
- [ ] Validación estricta de tipos y formatos.
- [ ] Autenticación y autorización correcta (JWT, OAuth, sessions).
- [ ] Rate limiting para evitar abuse o DDOS.
- [ ] Logging de errores sin exponer datos sensibles.
- [ ] Protección contra CSRF, XSS si frontend consume la API directamente.
- [ ] Escaneo de vulnerabilidades en dependencias (npm audit).

5️⃣ Observabilidad y monitoreo

- [ ] Logging estructurado y centralizado (p. ej. Winston, Pino).
- [ ] Métricas básicas: requests por segundo, latencia, errores 4xx/5xx.
- [ ] Monitoreo de Redis / DB (uso memoria, conexiones).
- [ ] Alertas si la API responde lento o hay errores críticos.
- [ ] Manejo de errores unificado (middleware global).

6️⃣ Pruebas y calidad

- [ ] Tests unitarios en servicios y controladores.
- [ ] Tests de integración (DB + API).
- [ ] Mock de servicios externos para pruebas.
- [ ] Cobertura de endpoints críticos.
- [ ] Pruebas de carga (stress test) para endpoints con mucho tráfico.

7️⃣ Despliegue y DevOps

- [ ] Dockerfile optimizado (multi-stage, caching de dependencias).
- [ ] Docker Compose para desarrollo local (backend + frontend + Redis).
- [ ] CI/CD configurado (lint, tests, build, deploy).
- [ ] Variables de entorno y secretos manejados por el proveedor (Render, AWS).
- [ ] Rollback plan en caso de deploy fallido.
- [ ] Health checks y readiness probes configurados.

8️⃣ Extras de eficiencia y UX

- [ ] Uso de ETag / Cache-Control en respuestas GET.
- [ ] Minimizar payload de respuesta (solo campos necesarios).
- [ ] Rate limiting o throttling configurable según usuario/IP.
- [ ] Manejo de errores claros para frontend (404, 401, 500).
