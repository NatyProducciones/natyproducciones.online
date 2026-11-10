# Naty Producciones

Sitio web de Naty Producciones, construido con React y Vite.

## Desarrollo local

```bash
npm install
npm run dev
```

## Compilación

```bash
npm run build
npm run preview
```

La compilación de producción se genera en `dist/`. Las fotografías, videos y el
audio usado por el sitio están en `public/media/` y se copian automáticamente
a `dist/media/`.

## Preparar integración en el portal URU

```bash
npm run build:portal
```

Esto genera una versión lista para alojar en la ruta `/naty/` dentro del sitio
existente, en `portal-package/naty/`. Copia el contenido de esa carpeta al
directorio `naty/` del repositorio del portal. En la navegación de su
`index.html`, agrega un enlace `<a href="/naty/">Naty Producciones</a>`.
El comando no modifica la portada del portal.
