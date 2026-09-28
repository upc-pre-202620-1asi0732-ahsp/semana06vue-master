# Manual Estudiantil de Pruebas

## 1. Introduccion
Este manual explica como leer, ejecutar y entender las 5 pruebas clave implementadas en dos repositorios equivalentes funcionalmente:
- Angular (`learning-center-angular`)
- Vue (`learning-center-vue`)

El objetivo didactico es que puedas seguir el razonamiento de negocio, no solo la sintaxis del framework.

## 2. Objetivo de las pruebas
Validar comportamientos criticos del producto:
1. Sesion autentica consistente.
2. Alta correcta de contenido en catalogo.
3. Mapeo confiable API -> dominio.
4. Bloqueo de login invalido.
5. Flujo completo de alta y navegacion tras submit.

## 3. Core del negocio cubierto
1. IAM (autenticacion y navegacion post login).
2. Catalogo (alta de Course/Tutorial y consistencia del estado local).
3. Integridad de datos (Assembler entre backend y frontend).
4. Flujo de formularios en acciones de negocio primarias.

## 4. Descripcion de cada test

### Test 1 - Unitaria IAM Store
- Angular: `src/app/iam/application/iam.store.spec.ts`
- Vue: `src/iam/application/iam.store.spec.js`
- Valida: login exitoso actualiza usuario/token y navega al home.
- Riesgo: sesion inconsistente o redireccion incorrecta.

### Test 2 - Unitaria Store de catalogo
- Angular: `src/app/learning/application/learning.store.spec.ts`
- Vue: `src/publishing/application/publishing.store.spec.js`
- Valida: alta de contenido actualiza estado local correctamente.
- Riesgo: inconsistencia en CRUD principal.

### Test 3 - Unitaria Assembler
- Angular: `src/app/learning/infrastructure/course-assembler.spec.ts`
- Vue: `src/publishing/infrastructure/tutorial.assembler.spec.js`
- Valida: payload API conserva campos de negocio al mapear a entidad.
- Riesgo: corrupcion de datos entre backend y frontend.

### Test 4 - Funcional Sign-In Form
- Angular: `src/app/iam/presentation/views/sign-in-form/sign-in-form.functional.spec.ts`
- Vue: `src/iam/presentation/views/sign-in-form.functional.spec.js`
- Valida: solo se envia cuando hay credenciales completas.
- Riesgo: intentos de autenticacion invalidos.

### Test 5 - Funcional Form de contenido
- Angular: `src/app/learning/presentation/views/course-form/course-form.functional.spec.ts`
- Vue: `src/publishing/presentation/views/tutorial-form.functional.spec.js`
- Valida: crea entidad y vuelve al listado.
- Riesgo: flujo principal incompleto tras submit.

## 5. Herramientas y metodos usados en las pruebas

### Angular
1. `TestBed.configureTestingModule`: arma el contexto de inyeccion.
2. `jasmine.createSpyObj`: crea doubles observables para API/router/store.
3. `of(...)` de RxJS: stub de observables para respuestas de backend.
4. `expect(...).toHaveBeenCalledWith(...)`: verifica contrato de colaboracion.

### Vue
1. `vitest` (`describe/it/expect/vi`): runner, asserts y mocking.
2. `setActivePinia(createPinia())`: estado aislado por prueba.
3. `vi.mock(...)`: reemplaza modulos externos (router, store, API).
4. `mount(...)` de Vue Test Utils: renderiza componente en jsdom.
5. `trigger('submit.prevent')` / `setValue(...)`: simula interaccion real de usuario.

## 6. Explicacion del codigo relevante
Las pruebas siguen AAA (Arrange, Act, Assert):
1. Arrange: preparar datos, mocks y stubs.
2. Act: ejecutar el metodo o interaccion clave.
3. Assert: validar estado, llamadas, payload y navegacion.

Diferencias conceptuales utiles:
1. Mock vs Spy:
- Mock: reemplazo total del colaborador.
- Spy: ademas registra llamadas para verificarlas.
2. Stub:
- Define respuesta controlada (`and.returnValue`, `mockResolvedValue`).
3. Helper:
- Utilidad para simplificar setup repetido (en este caso se usa `beforeEach`).
4. Render/Mount:
- Angular: `TestBed.createComponent`.
- Vue: `mount`.
5. Trigger/Event utility:
- Angular: invocacion directa de metodos del componente.
- Vue: `trigger`/`setValue` sobre nodos del wrapper.

## 7. Como ejecutar las pruebas

### Angular
```bash
npm install
npm test -- --watch=false --browsers=ChromeHeadless
```
Nota: Angular CLI 20 requiere Node >= 22.12.

### Vue
```bash
npm install
npm run test:run
```

## 8. Como leer los resultados
1. Si falla Test 1: revisar token/sesion y llamada de navegacion.
2. Si falla Test 2: revisar mutacion del estado local tras alta.
3. Si falla Test 3: revisar estructura del payload y constructor de entidad.
4. Si falla Test 4: revisar validacion previa al submit.
5. Si falla Test 5: revisar submit, llamada a store y retorno a listado.

## 9. Cambios realizados para soportar pruebas
1. Vue: se agrego infraestructura de testing (`vitest`, `jsdom`, `@vue/test-utils`) en `package.json` y `vite.config.js`.
2. Vue: se agrego guard clause en `sign-in-form.vue` para bloquear envio sin credenciales.
3. En ambos: se anadieron comentarios bilingues didacticos en cada prueba para explicar:
- que valida,
- por que usa mocks/spies/stubs/mount/trigger/expect,
- que riesgo de negocio cubre.

## 10. Secuencia de commits recomendada para estudio
1. `test: documenta y ajusta Unitaria 1 IAM Store sign-in exitoso`
2. `test: documenta y ajusta Unitaria 2 Store de catalogo alta de contenido`
3. `test: documenta y ajusta Unitaria 3 Assembler mapeo API a dominio`
4. `test: documenta y ajusta Funcional 1 Sign-In Form validacion antes de envio`
5. `test: documenta y ajusta Funcional 2 Form Course/Tutorial alta y navegacion`
6. `docs: actualiza manual estudiantil y explicacion de herramientas`
7. `docs: justifica cambios realizados para soportar pruebas`

## Ejecución paso a paso de los tests en cada proyecto

### Angular
- Ruta desde donde ejecutar:
  - `D:\Pruebas\frontend\learning-center-angular`
- Requisitos previos:
  1. Node.js compatible con Angular CLI 20 (`>= 20.19` o `>= 22.12`).
  2. npm instalado.
  3. Navegador Chrome disponible si usas launcher de Karma por defecto.
- Instalación de dependencias:
```bash
npm install
```
- Comando para ejecutar todos los tests:
```bash
npm test
```
- Comando para unit tests:
  - En este proyecto **no hay separación por script** entre unitarios y funcionales de componente; `npm test` ejecuta todo el conjunto de specs de `src/**/*.spec.ts`.
- Comando para tests funcionales/e2e si aplica:
  - **No existe configuración e2e separada** (no hay scripts de Cypress/Playwright/Protractor).
- Comando para watch si existe:
```bash
npm test
```
  - `ng test` corre en watch por defecto.
- Comando para coverage si existe:
```bash
npm test -- --code-coverage --watch=false
```
- Comando para ejecutar un test específico si aplica:
```bash
npm test -- --include="src/app/iam/application/iam.store.spec.ts" --watch=false
```
- Resultado esperado:
  - Karma abre/lanza navegador y muestra specs en verde con resumen de pruebas ejecutadas.
- Errores comunes o consideraciones:
  1. Error de versión de Node: Angular CLI bloquea ejecución si Node no cumple mínimo requerido.
  2. Entornos sin Chrome: usar launcher/headless adecuado en parámetros de `ng test`.
  3. Si watch queda activo en CI/local, agregar `--watch=false`.

### Vue
- Ruta desde donde ejecutar:
  - `D:\Pruebas\frontend\learning-center-vue`
- Requisitos previos:
  1. Node.js y npm instalados.
  2. Dependencias de proyecto instaladas.
- Instalación de dependencias:
```bash
npm install
```
- Comando para ejecutar todos los tests:
```bash
npm run test:run
```
- Comando para unit tests:
  - No hay script separado por tipo; `vitest run` ejecuta unitarios y funcionales juntos.
- Comando para tests funcionales/integración/e2e si aplica:
  - No hay e2e separado (sin scripts de Cypress/Playwright).
  - Los tests funcionales actuales están en Vitest y se ejecutan con el mismo comando.
- Comando para watch si existe:
```bash
npm test
```
  - Este script ejecuta `vitest` en modo interactivo/watch.
- Comando para coverage si existe:
  - **No hay script de coverage definido en `package.json`**.
  - Tampoco hay proveedor de coverage explícito configurado (por ejemplo `@vitest/coverage-v8`).
- Comando para ejecutar un test específico si aplica:
```bash
npm run test:run -- src/iam/application/iam.store.spec.js
```
- Resultado esperado:
  - Vitest muestra resumen final con archivos y tests en verde (`passed`).
- Errores comunes o consideraciones:
  1. Si falta `node_modules`, Vitest no inicia.
  2. Si usas modo watch (`npm test`), la terminal queda esperando cambios.
  3. Si quieres ejecución única para CI o validación rápida, usar `npm run test:run`.

Diferencia breve entre ambos:
- Angular usa `ng test` con builder Karma.
- Vue usa Vitest configurado en `vite.config.js` con entorno `jsdom`.
