# Análisis de equivalencia funcional entre Angular y Vue

## Alcance del análisis
Se compararon rutas, stores, entidades, APIs, vistas y contratos de datos en:
- `learning-center-angular/src/app/**`
- `learning-center-vue/src/**`
- `server/db.json` y `server/routes.json` de ambos proyectos

## Funcionalidades equivalentes
1. Autenticación:
- Flujo de `sign-in`, `sign-up` y `sign-out`.
- Persistencia de token en `localStorage`.
- Navegación a Home tras autenticación correcta.
2. Gestión de categorías:
- Listado, creación, edición y eliminación.
3. Gestión de contenido académico principal:
- Angular: `courses`.
- Vue: `tutorials`.
- En ambos existe CRUD de contenido asociado a categoría.
4. Navegación base:
- Home, About y Page Not Found.
5. Internacionalización y layout común:
- Selector de idioma, barra superior y pie de página.

## Funcionalidades similares pero no idénticas
1. Dominio de contenido:
- Angular usa `Course` con campo `description`.
- Vue usa `Tutorial` con campo `summary`.
- Conclusión: misma intención funcional, distinto naming de dominio.
2. Mecanismo de estado:
- Angular: Signals + servicios inyectables.
- Vue: Pinia + Composition API.
3. Enrutado:
- Angular agrupa en `/learning/*`.
- Vue agrupa en `/publishing/*`.

## Diferencias funcionales relevantes encontradas
1. Eliminación en listas de Vue:
- `category-list.vue` y `tutorial-list.vue` enviaban el objeto completo a métodos que esperan `id`.
- Riesgo: eliminación fallida o comportamiento inconsistente.
- Estado final: corregido para enviar `category.id` / `tutorial.id`.
2. Validación previa en sign-in:
- Angular bloquea envío si formulario inválido.
- Vue mostraba mensajes visuales, pero enviaba sin validar en `performSignIn`.
- Riesgo: llamadas innecesarias de autenticación con datos incompletos.
- Estado final: agregado guard clause en Vue para alinear criterio funcional.

## Core del negocio identificado
1. Garantizar autenticación válida y estado de sesión consistente.
2. Mantener integridad del catálogo (categorías + contenido asociado).
3. Asegurar que formularios principales ejecuten acciones correctas (crear/editar) y naveguen al flujo esperado.
4. Asegurar traducción correcta de contratos API a entidades de dominio (assemblers).

## Funcionalidades comunes que habilitan estrategia de pruebas comparable
1. Caso crítico de autenticación exitosa.
2. Caso crítico de alta de contenido en catálogo.
3. Caso crítico de traducción de payload API a modelo de dominio.
4. Flujo funcional de submit en formularios de negocio (login y creación de contenido).

## Conclusión de equivalencia funcional
Los proyectos son **mayormente equivalentes a nivel funcional de negocio** (autenticación + gestión de categorías + gestión de contenido formativo), pero **no eran completamente equivalentes** por dos brechas en Vue (validación de sign-in y eliminación por id). Con los ajustes mínimos aplicados, la equivalencia funcional queda alineada para una estrategia de pruebas comparable.
