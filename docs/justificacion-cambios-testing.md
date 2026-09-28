# Justificacion de Cambios para Testing

## Objetivo
Documentar cambios minimos necesarios para testabilidad, legibilidad y aislamiento de dependencias.

## Cambios aplicados

### 1) Infraestructura de pruebas en Vue
- Archivos: `package.json`, `vite.config.js`, `package-lock.json`.
- Cambio: se incorporo Vitest + jsdom + Vue Test Utils y scripts de ejecucion.
- Motivo: el repositorio Vue no tenia runner de pruebas automatizadas.
- Impacto funcional: nulo en produccion.
- Relacion con pruebas: habilita las 5 pruebas del plan.

### 2) Ajuste de testabilidad en Sign-In de Vue
- Archivo: `src/iam/presentation/views/sign-in-form.vue`.
- Cambio: guard clause para no enviar formulario con username/password vacios.
- Motivo: coherencia funcional con regla de negocio de autenticacion valida.
- Impacto funcional: evita llamadas innecesarias al store/API.
- Relacion con pruebas: soporta la prueba funcional de validacion previa a envio.

### 3) Comentarios bilingues en tests (ambos repos)
- Archivos: specs unitarias y funcionales agregadas.
- Cambio: comentarios ES/EN en bloques relevantes (Arrange/Act/Assert, mocks, stubs, trigger, expect).
- Motivo: mejorar comprension didactica para estudiantes.
- Impacto funcional: nulo en runtime.
- Relacion con pruebas: facilita mantenimiento y lectura pedagogica.

## Por que no fue suficiente probar sin estos cambios
1. Sin infraestructura Vue no existia ejecucion automatizada confiable.
2. Sin guard clause en Sign-In Vue, el test funcional detecta un defecto real de negocio.
3. Sin comentarios guiados, el estudiante ve sintaxis pero no entiende decisiones de testing.
