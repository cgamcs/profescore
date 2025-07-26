# Ejemplos de Configuración de Variables de Entorno

## Backend (.env)

### Desarrollo
```env
# Database Configuration
DATABASE_URL=mongodb://localhost:27017/profescore

# Server Configuration
PORT=4000
NODE_ENV=development

# Frontend URL (para CORS)
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:4000

# JWT Configuration
JWT_SECRET=dev_jwt_secret_key_123456789
SECRET_KEY=dev_secret_key_987654321

# Google reCAPTCHA
RECAPTCHA_SECRET_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# FingerprintJS (opcional)
FINGERPRINT_SECRET_KEY=fp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Logging
LOG_LEVEL=debug
```

### Producción
```env
# Database Configuration
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/profescore

# Server Configuration
PORT=4000
NODE_ENV=production

# Frontend URL (para CORS)
FRONTEND_URL=https://tu-frontend-url.com
BACKEND_URL=https://tu-backend-url.com

# JWT Configuration
JWT_SECRET=prod_jwt_secret_key_super_seguro_y_largo_123456789
SECRET_KEY=prod_secret_key_super_seguro_y_largo_987654321

# Google reCAPTCHA
RECAPTCHA_SECRET_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# FingerprintJS
FINGERPRINT_SECRET_KEY=fp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Logging
LOG_LEVEL=info
```

## Frontend (.env)

### Desarrollo
```env
# Google reCAPTCHA
VITE_SITE_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_PUBLIC_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# API Configuration
VITE_API_URL=http://localhost:4000/api
VITE_BACKEND_URL=http://localhost:4000

# FingerprintJS (opcional para desarrollo)
VITE_FINGERPRINT_PUBLIC_KEY=fp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Environment
VITE_NODE_ENV=development
```

### Producción
```env
# Google reCAPTCHA
VITE_SITE_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_PUBLIC_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# API Configuration
VITE_API_URL=https://tu-backend-url.com/api
VITE_BACKEND_URL=https://tu-backend-url.com

# FingerprintJS
VITE_FINGERPRINT_PUBLIC_KEY=fp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Environment
VITE_NODE_ENV=production
```

## Configuración de Servicios

### Vercel (Frontend)
```env
VITE_SITE_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_API_URL=https://tu-backend-url.com/api
VITE_BACKEND_URL=https://tu-backend-url.com
VITE_FINGERPRINT_PUBLIC_KEY=fp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_NODE_ENV=production
```

### Render/Railway (Backend)
```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/profescore
PORT=4000
NODE_ENV=production
FRONTEND_URL=https://tu-frontend-url.com
BACKEND_URL=https://tu-backend-url.com
JWT_SECRET=prod_jwt_secret_key_super_seguro_y_largo_123456789
RECAPTCHA_SECRET_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FINGERPRINT_SECRET_KEY=fp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
LOG_LEVEL=info
```

## Notas Importantes

### Seguridad
- **Nunca** commits variables de entorno reales al repositorio
- Usa diferentes claves para desarrollo y producción
- Genera claves JWT seguras y únicas
- Rota las claves periódicamente

### Generación de Claves Seguras
```bash
# Generar JWT Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generar Secret Key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Validación de Variables
```javascript
// Ejemplo de validación en backend/src/config/env.ts
const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'FRONTEND_URL',
  'RECAPTCHA_SECRET_KEY'
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});
``` 