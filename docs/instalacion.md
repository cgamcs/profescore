# Guía de Instalación - ProfeScore

## Requisitos Previos

### Software Necesario
- **Node.js**: Versión 18.0.0 o superior
- **npm**: Versión 9.0.0 o superior
- **Git**: Para clonar el repositorio
- **MongoDB**: Base de datos (local o MongoDB Atlas)

### Verificar Instalaciones
```bash
node --version
npm --version
git --version
```

## Instalación Paso a Paso

### 1. Clonar el Repositorio
```bash
git clone https://github.com/ProfeScore-Org/ProfeScore.git
cd ProfeScore
```

### 2. Configurar Base de Datos

#### Opción A: MongoDB Local
```bash
# Instalar MongoDB (Ubuntu/Debian)
sudo apt update
sudo apt install mongodb

# Iniciar servicio
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Verificar estado
sudo systemctl status mongodb
```

#### Opción B: MongoDB Atlas (Recomendado)
1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crear un nuevo cluster
3. Configurar acceso de red (0.0.0.0/0 para desarrollo)
4. Crear usuario de base de datos
5. Obtener connection string

### 3. Instalar Dependencias

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd ../backend
npm install
```

### 4. Configurar Variables de Entorno

#### Frontend (.env)
```bash
cd frontend
cp .env.example .env
```

Editar `frontend/.env`:
```env
# Google reCAPTCHA
VITE_SITE_KEY=tu_recaptcha_site_key
VITE_PUBLIC_KEY=tu_recaptcha_public_key

# API Configuration
VITE_API_URL=http://localhost:4000/api
VITE_BACKEND_URL=http://localhost:4000

# FingerprintJS (opcional para desarrollo)
VITE_FINGERPRINT_PUBLIC_KEY=tu_fingerprint_public_key
```

#### Backend (.env)
```bash
cd backend
cp .env.example .env
```

Editar `backend/.env`:
```env
# Database
DATABASE_URL=mongodb://localhost:27017/profescore
# O para MongoDB Atlas:
# DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/profescore

# Server Configuration
PORT=4000
NODE_ENV=development

# Frontend URL (para CORS)
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:4000

# JWT Configuration
JWT_SECRET=tu_jwt_secret_super_seguro
SECRET_KEY=tu_secret_key_adicional

# Google reCAPTCHA
RECAPTCHA_SECRET_KEY=tu_recaptcha_secret_key

# FingerprintJS (opcional)
FINGERPRINT_SECRET_KEY=tu_fingerprint_secret_key
```

### 5. Configurar Google reCAPTCHA

1. Ir a [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Registrar un nuevo sitio
3. Seleccionar reCAPTCHA v2 "I'm not a robot"
4. Agregar dominios: `localhost`, `127.0.0.1`
5. Copiar Site Key y Secret Key a las variables de entorno

### 6. Ejecutar en Desarrollo

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

El servidor estará disponible en: `http://localhost:4000`

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

### 7. Verificar Instalación

1. **Backend**: Visitar `http://localhost:4000/api/faculties`
2. **Frontend**: Visitar `http://localhost:5173`
3. **Base de datos**: Verificar conexión en logs del backend

## Configuración de Producción

### Variables de Entorno de Producción

#### Frontend (Vercel)
```env
VITE_SITE_KEY=tu_recaptcha_site_key_produccion
VITE_API_URL=https://tu-backend-url.com/api
VITE_BACKEND_URL=https://tu-backend-url.com
VITE_FINGERPRINT_PUBLIC_KEY=tu_fingerprint_public_key_produccion
```

#### Backend (Render/Railway)
```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/profescore
PORT=4000
NODE_ENV=production
FRONTEND_URL=https://tu-frontend-url.com
BACKEND_URL=https://tu-backend-url.com
JWT_SECRET=tu_jwt_secret_produccion_super_seguro
RECAPTCHA_SECRET_KEY=tu_recaptcha_secret_key_produccion
FINGERPRINT_SECRET_KEY=tu_fingerprint_secret_key_produccion
```

### Build de Producción

#### Frontend
```bash
cd frontend
npm run build
```

#### Backend
```bash
cd backend
npm run build
npm start
```

## Solución de Problemas

### Error de Conexión a Base de Datos
```bash
# Verificar que MongoDB esté corriendo
sudo systemctl status mongodb

# Verificar connection string
echo $DATABASE_URL

# Probar conexión manual
mongo --host localhost --port 27017
```

### Error de CORS
```javascript
// Verificar configuración en backend/src/config/cors.ts
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200
}
```

### Error de Puerto en Uso
```bash
# Verificar puertos en uso
lsof -i :4000
lsof -i :5173

# Matar proceso si es necesario
kill -9 <PID>
```

### Error de Dependencias
```bash
# Limpiar cache de npm
npm cache clean --force

# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

## Scripts Útiles

### Desarrollo
```bash
# Ejecutar frontend y backend simultáneamente
npm run dev:all

# Ejecutar tests
npm test

# Linting
npm run lint
```

### Producción
```bash
# Build completo
npm run build:all

# Deploy
npm run deploy
```

## Próximos Pasos

1. **Configurar Admin**: Crear primer usuario administrador
2. **Agregar Datos**: Crear facultades, materias y profesores
3. **Configurar Monitoreo**: Implementar herramientas de monitoreo
4. **Configurar Backups**: Implementar estrategia de backups
5. **Configurar SSL**: Configurar certificados SSL para producción

## Recursos Adicionales

- [Documentación de MongoDB](https://docs.mongodb.com/)
- [Documentación de Express.js](https://expressjs.com/)
- [Documentación de React](https://reactjs.org/)
- [Documentación de Vite](https://vitejs.dev/)
- [Google reCAPTCHA](https://developers.google.com/recaptcha)
- [FingerprintJS](https://fingerprintjs.com/docs/)