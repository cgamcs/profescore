# Guía de Despliegue - ProfeScore

## Índice

1. [Preparación](#preparación)
2. [Despliegue del Backend](#despliegue-del-backend)
3. [Despliegue del Frontend](#despliegue-del-frontend)
4. [Configuración de Base de Datos](#configuración-de-base-de-datos)
5. [Configuración de Dominio](#configuración-de-dominio)
6. [Monitoreo y Logs](#monitoreo-y-logs)
7. [SSL y Seguridad](#ssl-y-seguridad)
8. [Optimización de Performance](#optimización-de-performance)
9. [Backup y Recuperación](#backup-y-recuperación)
10. [Troubleshooting](#troubleshooting)

## Preparación

### Requisitos Previos

#### Herramientas Necesarias
- **Git**: Para clonar el repositorio
- **Node.js**: Versión 18.0.0 o superior
- **npm**: Para instalar dependencias
- **MongoDB Atlas**: Cuenta configurada
- **Dominio**: Dominio configurado (opcional pero recomendado)

#### Servicios Recomendados
- **Backend**: Render, Railway, Heroku, DigitalOcean
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Base de Datos**: MongoDB Atlas
- **Monitoreo**: Uptime Robot, Sentry, LogRocket

### Preparación del Código

#### 1. Clonar Repositorio
```bash
git clone https://github.com/ProfeScore-Org/ProfeScore.git
cd ProfeScore
```

#### 2. Verificar Configuración
```bash
# Verificar que el código compile correctamente
cd backend
npm install
npm run build

cd ../frontend
npm install
npm run build
```

#### 3. Preparar Variables de Entorno
Crear archivos `.env` para producción basándose en los ejemplos de `docs/env-examples.md`.

## Despliegue del Backend

### Opción 1: Render (Recomendado)

#### 1. Crear Cuenta en Render
1. Ir a [render.com](https://render.com)
2. Crear cuenta con GitHub
3. Conectar repositorio

#### 2. Configurar Servicio Web
```yaml
# render.yaml (opcional)
services:
  - type: web
    name: profescore-backend
    env: node
    buildCommand: cd backend && npm install && npm run build
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: FRONTEND_URL
        sync: false
```

#### 3. Configurar Variables de Entorno
En el dashboard de Render, configurar:
```env
NODE_ENV=production
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/profescore
PORT=4000
FRONTEND_URL=https://tu-frontend-url.com
BACKEND_URL=https://tu-backend-url.com
JWT_SECRET=tu_jwt_secret_produccion_super_seguro
RECAPTCHA_SECRET_KEY=tu_recaptcha_secret_key_produccion
FINGERPRINT_SECRET_KEY=tu_fingerprint_secret_key_produccion
LOG_LEVEL=info
```

#### 4. Configurar Build
- **Build Command**: `cd backend && npm install && npm run build`
- **Start Command**: `cd backend && npm start`
- **Environment**: Node

### Opción 2: Railway

#### 1. Crear Proyecto
1. Ir a [railway.app](https://railway.app)
2. Conectar repositorio de GitHub
3. Crear nuevo proyecto

#### 2. Configurar Variables
```env
NODE_ENV=production
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/profescore
PORT=4000
FRONTEND_URL=https://tu-frontend-url.com
BACKEND_URL=https://tu-backend-url.com
JWT_SECRET=tu_jwt_secret_produccion_super_seguro
RECAPTCHA_SECRET_KEY=tu_recaptcha_secret_key_produccion
FINGERPRINT_SECRET_KEY=tu_fingerprint_secret_key_produccion
```

#### 3. Configurar Comandos
- **Build**: `cd backend && npm install && npm run build`
- **Start**: `cd backend && npm start`

### Opción 3: Heroku

#### 1. Instalar Heroku CLI
```bash
# macOS
brew install heroku/brew/heroku

# Windows
# Descargar desde https://devcenter.heroku.com/articles/heroku-cli
```

#### 2. Configurar Aplicación
```bash
heroku create profescore-backend
heroku git:remote -a profescore-backend
```

#### 3. Configurar Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/profescore
heroku config:set JWT_SECRET=tu_jwt_secret_produccion_super_seguro
heroku config:set FRONTEND_URL=https://tu-frontend-url.com
heroku config:set RECAPTCHA_SECRET_KEY=tu_recaptcha_secret_key_produccion
```

#### 4. Desplegar
```bash
git push heroku main
```

### Opción 4: DigitalOcean App Platform

#### 1. Crear Aplicación
1. Ir a [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Conectar repositorio
3. Seleccionar rama `main`

#### 2. Configurar Build
- **Source Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Run Command**: `npm start`

#### 3. Configurar Variables
```env
NODE_ENV=production
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/profescore
JWT_SECRET=tu_jwt_secret_produccion_super_seguro
FRONTEND_URL=https://tu-frontend-url.com
RECAPTCHA_SECRET_KEY=tu_recaptcha_secret_key_produccion
```

## Despliegue del Frontend

### Opción 1: Vercel (Recomendado)

#### 1. Conectar Repositorio
1. Ir a [vercel.com](https://vercel.com)
2. Conectar cuenta de GitHub
3. Importar repositorio

#### 2. Configurar Proyecto
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

#### 3. Configurar Variables de Entorno
```env
VITE_SITE_KEY=tu_recaptcha_site_key_produccion
VITE_API_URL=https://tu-backend-url.com/api
VITE_BACKEND_URL=https://tu-backend-url.com
VITE_FINGERPRINT_PUBLIC_KEY=tu_fingerprint_public_key_produccion
VITE_NODE_ENV=production
```

#### 4. Configurar Dominio Personalizado
1. En configuración del proyecto
2. Agregar dominio personalizado
3. Configurar DNS según instrucciones

### Opción 2: Netlify

#### 1. Conectar Repositorio
1. Ir a [netlify.com](https://netlify.com)
2. Conectar cuenta de GitHub
3. Importar repositorio

#### 2. Configurar Build
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `dist`

#### 3. Configurar Variables
```env
VITE_SITE_KEY=tu_recaptcha_site_key_produccion
VITE_API_URL=https://tu-backend-url.com/api
VITE_BACKEND_URL=https://tu-backend-url.com
VITE_FINGERPRINT_PUBLIC_KEY=tu_fingerprint_public_key_produccion
```

### Opción 3: GitHub Pages

#### 1. Configurar GitHub Actions
Crear `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: |
        cd frontend
        npm install
        
    - name: Build
      run: |
        cd frontend
        npm run build
      env:
        VITE_API_URL: ${{ secrets.VITE_API_URL }}
        VITE_BACKEND_URL: ${{ secrets.VITE_BACKEND_URL }}
        VITE_SITE_KEY: ${{ secrets.VITE_SITE_KEY }}
        
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./frontend/dist
```

#### 2. Configurar Secrets
En GitHub repository settings:
- `VITE_API_URL`
- `VITE_BACKEND_URL`
- `VITE_SITE_KEY`

## Configuración de Base de Datos

### MongoDB Atlas

#### 1. Crear Cluster
1. Ir a [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crear cuenta gratuita
3. Crear nuevo cluster (M0 Free tier)

#### 2. Configurar Acceso
1. **Database Access**: Crear usuario de base de datos
2. **Network Access**: Agregar IP `0.0.0.0/0` (para permitir acceso desde cualquier lugar)

#### 3. Obtener Connection String
```
mongodb+srv://username:password@cluster.mongodb.net/profescore?retryWrites=true&w=majority
```

#### 4. Configurar Índices
```javascript
// Índices recomendados para optimizar performance
db.ratings.createIndex({ professorId: 1, createdAt: -1 })
db.ratings.createIndex({ facultyId: 1, createdAt: -1 })
db.professors.createIndex({ facultyId: 1, averageRating: -1 })
db.professors.createIndex({ name: "text" })
db.subjects.createIndex({ facultyId: 1 })
db.faculties.createIndex({ name: "text" })
```

### Crear Datos Iniciales

#### 1. Crear Admin
```javascript
// Conectar a MongoDB y ejecutar
use profescore

db.admins.insertOne({
  username: "admin",
  password: "$2a$10$hashed_password_here", // Usar bcrypt
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

#### 2. Crear Facultades de Ejemplo
```javascript
db.faculties.insertMany([
  {
    name: "Ingeniería",
    description: "Facultad de Ingeniería",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Medicina",
    description: "Facultad de Medicina",
    createdAt: new Date(),
    updatedAt: new Date()
  }
])
```

## Configuración de Dominio

### Configurar DNS

#### 1. Registrar Dominio
- Recomendado: Namecheap, GoDaddy, Google Domains
- Dominio sugerido: `profescore.com` o `tu-universidad.edu`

#### 2. Configurar Registros DNS

**Para Frontend (Vercel/Netlify):**
```
Type: CNAME
Name: www
Value: tu-app.vercel.app
```

**Para Backend (Render/Railway):**
```
Type: CNAME
Name: api
Value: tu-app.onrender.com
```

#### 3. Configurar Redirección
```
Type: CNAME
Name: @
Value: www.tudominio.com
```

### Configurar SSL

#### Automático (Recomendado)
- Vercel, Netlify, Render proporcionan SSL automático
- Solo configurar dominio personalizado

#### Manual (Si es necesario)
```bash
# Usar Let's Encrypt
sudo certbot --nginx -d tudominio.com -d www.tudominio.com
```

## Monitoreo y Logs

### Configurar Monitoreo

#### 1. Uptime Robot
1. Crear cuenta en [uptimerobot.com](https://uptimerobot.com)
2. Agregar monitor para:
   - Frontend: `https://tu-frontend-url.com`
   - Backend: `https://tu-backend-url.com/api/faculties`

#### 2. Sentry (Error Tracking)
```javascript
// En frontend/src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "tu_sentry_dsn",
  environment: "production",
});
```

#### 3. LogRocket (Session Replay)
```javascript
// En frontend/src/main.tsx
import LogRocket from 'logrocket';

LogRocket.init('tu_app_id');
```

### Configurar Logs

#### Backend Logging
```javascript
// En backend/src/config/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

## SSL y Seguridad

### Headers de Seguridad

#### Configurar Helmet
```javascript
// En backend/src/server.ts
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.google.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

#### Rate Limiting
```javascript
// En backend/src/middleware/rateLimit.ts
import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: 'Demasiadas requests desde esta IP'
});
```

### Configurar CORS
```javascript
// En backend/src/config/cors.ts
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

## Optimización de Performance

### Frontend

#### 1. Bundle Optimization
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    },
    minify: 'terser',
    sourcemap: false
  }
});
```

#### 2. Image Optimization
```javascript
// Usar formatos modernos
// Implementar lazy loading
// Usar CDN para assets
```

### Backend

#### 1. Database Optimization
```javascript
// Crear índices para consultas frecuentes
db.ratings.createIndex({ professorId: 1, createdAt: -1 })
db.professors.createIndex({ facultyId: 1, averageRating: -1 })

// Implementar paginación
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const skip = (page - 1) * limit;
```

#### 2. Caching
```javascript
// Implementar Redis para caching
const redis = require('redis');
const client = redis.createClient();

// Cache de facultades
client.setex('faculties', 3600, JSON.stringify(faculties));
```

## Backup y Recuperación

### Configurar Backups Automáticos

#### 1. MongoDB Atlas Backups
- Configurar backups automáticos en MongoDB Atlas
- Retención: 7 días para desarrollo, 30 días para producción

#### 2. Script de Backup Manual
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="$DATABASE_URL" --out="/backups/$DATE"
tar -czf "/backups/$DATE.tar.gz" "/backups/$DATE"
rm -rf "/backups/$DATE"

# Subir a S3 o similar
aws s3 cp "/backups/$DATE.tar.gz" "s3://tu-bucket/backups/"
```

#### 3. Configurar Cron Job
```bash
# Agregar a crontab
0 2 * * * /path/to/backup.sh
```

### Procedimiento de Recuperación
```bash
# Restaurar desde backup
mongorestore --uri="$DATABASE_URL" /backups/20241201_120000/
```

## Troubleshooting

### Problemas Comunes

#### 1. Error de CORS
```javascript
// Verificar configuración CORS
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('CORS Origin:', corsOptions.origin);
```

#### 2. Error de Conexión a Base de Datos
```bash
# Verificar connection string
echo $DATABASE_URL

# Probar conexión
mongo --uri="$DATABASE_URL"
```

#### 3. Error de Build
```bash
# Limpiar cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 4. Error de Variables de Entorno
```javascript
// Verificar variables requeridas
const requiredVars = ['DATABASE_URL', 'JWT_SECRET', 'FRONTEND_URL'];
requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});
```

### Logs de Debug

#### Frontend
```javascript
// Habilitar logs de desarrollo
localStorage.setItem('debug', 'profescore:*');
```

#### Backend
```javascript
// Configurar nivel de logs
process.env.LOG_LEVEL = 'debug';
```

### Contactos de Emergencia
- **DevOps Lead**: [Contacto]
- **Backend Lead**: [Contacto]
- **Frontend Lead**: [Contacto]
- **Database Admin**: [Contacto]

---

## Checklist de Despliegue

### Pre-despliegue
- [ ] Código probado en desarrollo
- [ ] Variables de entorno configuradas
- [ ] Base de datos configurada
- [ ] Dominio configurado (opcional)

### Despliegue
- [ ] Backend desplegado y funcionando
- [ ] Frontend desplegado y funcionando
- [ ] SSL configurado
- [ ] Monitoreo configurado

### Post-despliegue
- [ ] Pruebas de funcionalidad completadas
- [ ] Performance verificada
- [ ] Backups configurados
- [ ] Documentación actualizada 