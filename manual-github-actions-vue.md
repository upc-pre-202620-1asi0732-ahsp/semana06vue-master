# Manual GitHub Actions - Proyecto Vue

## Ruta del proyecto

`D:\upcwork\semana04\semana04vue`

## Objetivo

Compilar, probar y desplegar la aplicacion Vue en GitHub Pages usando GitHub Actions.

## Deteccion del proyecto

- Tipo: frontend SPA.
- Framework: Vue `^3.5.21`.
- Build tool: Vite `^7.1.7`.
- Gestor de paquetes: npm, detectado por `package-lock.json`.
- Tests: Vitest, con scripts `test` y `test:run`.
- Archivo de configuracion: `vite.config.js`.
- Salida de build: `dist`.
- API de produccion: definida en `.env.production`.

## Workflow asociado

`.github/workflows/vue-ci-pages.yml`

## Comandos detectados y usados

| Comando | Uso |
|---|---|
| `npm ci` | Instala dependencias exactas desde `package-lock.json`. |
| `npm run test:run` | Ejecuta pruebas con Vitest en modo no interactivo. |
| `npx vite build --base="/NOMBRE_REPOSITORIO/"` | Genera la salida estatica para GitHub Pages. |
| `cp dist/index.html dist/404.html` | Permite que las rutas SPA funcionen al refrescar en Pages. |

El workflow calcula `NOMBRE_REPOSITORIO` automaticamente con `${{ github.event.repository.name }}`.

## Prerequisitos

- Node.js 22 en GitHub Actions.
- `package.json` y `package-lock.json` versionados.
- En GitHub Pages, seleccionar **Source: GitHub Actions**.

## Ejecucion local antes de subir

```bash
npm ci
npm run test:run
npm run build
```

Para simular la ruta de GitHub Pages:

```bash
npx vite build --base="/NOMBRE_REPOSITORIO/"
```

## Jobs y steps

Job `build`:

- `Checkout repository`: descarga el codigo.
- `Setup Node.js`: instala Node.js 22 y habilita cache npm.
- `Install dependencies`: ejecuta `npm ci`.
- `Run unit tests`: ejecuta `npm run test:run`.
- `Build Vue app for GitHub Pages`: compila con base publica del repositorio.
- `Add SPA fallback for GitHub Pages`: crea `404.html`.
- `Upload static site artifact`: sube `dist` para Pages.

Job `deploy`:

- Corre solo en `push`.
- Configura Pages.
- Publica el artifact en GitHub Pages.

## Pasos para subir a GitHub

```bash
git add .
git commit -m "ci: add vue github pages workflow"
git push
```

## Como validar que corrio bien

1. Ir a **Actions**.
2. Abrir `Vue CI and GitHub Pages`.
3. Verificar que `build` y `deploy` esten en verde.
4. Abrir el job `Deploy to GitHub Pages`.
5. Copiar la URL publicada.

## Como verificar despliegue

URL esperada:

```text
https://USUARIO.github.io/NOMBRE_REPOSITORIO/
```

Validar:

- carga de `/home`;
- assets como logos e iconos;
- rutas `/about`, `/publishing` e `/iam`;
- llamadas a la API configurada en `.env.production`.

## Artifact

Para Vue, el artifact principal es interno de GitHub Pages. No se genera artifact descargable adicional porque el objetivo es deploy estatico.

## Recomendacion final

Proyecto Vue: mantener deploy real en GitHub Pages. Es una SPA estatica con salida `dist`; el unico cuidado es que la API configurada en produccion debe estar disponible desde internet.
