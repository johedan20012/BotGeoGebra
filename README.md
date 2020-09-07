# BotGeoGebra

Este es un Bot para Discord programado en NodeJS para el control de una instancia de GeoGebra Geometry, usando los modulos Discord.js y Puppeteer.

## Primeros pasos

### Instalación
En la consola ejecuta el comando:
```bash
npm install
```

para instalar los modulos Discord.js y Puppeteer, despues necesitaras descargar [GeoGebra Math Apps Bundle](https://download.geogebra.org/package/geogebra-math-apps-bundle), descomprime el archivo y pon la carpeta "GeoGebra" en la raiz del project.

Nota: No olvides renombrar el archivo "config.json.example" por "config.json" y reemplazar los valores del archivo con tus propios valores.

### Uso

Ejecuta el comando :
```bash
node main.js
```

para inicializar el bot, una vez iniciado puedes mandar un mensaje al servidor donde lo tengas agregado, con el prefijo "$" seguido de un comando de GeoGebra para obtener una imagen con el resultado o con el prefijo "%" seguido de uno o varios comandos JavaScript que se ejecutaran en la aplicación de GeoGebra y retornara una imagen con el resultado.
