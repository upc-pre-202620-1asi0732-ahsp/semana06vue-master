# Comparativo de Metodos y Herramientas de Testing

## 1) Herramientas para pruebas unitarias

### Angular
1. Jasmine (asserts + spies).
2. TestBed para inyeccion y aislamiento de dependencias.
3. RxJS `of()` para stubs de respuestas observables.

### Vue
1. Vitest (runner, mocks, asserts).
2. Pinia en pruebas con `setActivePinia(createPinia())`.
3. `vi.mock` para API/router/store.

## 2) Herramientas para pruebas funcionales

### Angular
1. `TestBed.createComponent` para montar componente.
2. Spies para observar llamadas a store/router.

### Vue
1. `mount` de Vue Test Utils.
2. `trigger` y `setValue` para simular eventos y entradas.
3. Stubs de componentes PrimeVue para enfocarse en logica funcional.

## 3) Metodos que aparecen en las pruebas y para que sirven
1. `beforeEach`: prepara un contexto limpio por caso.
2. `createSpyObj` / `vi.fn`: crear doubles observables.
3. `and.returnValue` / `mockResolvedValue`: definir respuesta controlada.
4. `mount` / `createComponent`: renderizar unidad bajo prueba.
5. `trigger` / llamada a metodo: ejecutar accion del usuario.
6. `expect`: verificar comportamiento esperado.

## 4) Equivalencias conceptuales entre tecnologias
1. Angular `TestBed` <-> Vue `mount` + `vi.mock`.
2. Jasmine Spy <-> `vi.fn`/spy de Vitest.
3. Stub observable (`of`) <-> stub promesa (`mockResolvedValue`).
4. Navegacion `router.navigate` <-> `router.push`.
5. Estado Signal Store <-> Estado Pinia Store.

## 5) Ventajas y limites practicos
1. Angular: DI muy integrada, pero mas sensible a version de Node/navegador.
2. Vue + Vitest: feedback rapido y simple, pero requiere mas stubs manuales de UI library.

## 6) Cuando usar cada tecnica
1. Unitarias: cuando quieres validar reglas de negocio y mapeos con aislamiento alto.
2. Funcionales: cuando quieres validar flujo usuario-componente-store-router sin backend real.
3. Mocks/spies: cuando hay dependencias externas no deterministas.
4. Stubs de UI: cuando la libreria visual no aporta valor a la logica del caso.
