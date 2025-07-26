# Guía de Mantenimiento - ProfeScore

## Índice

1. [Mantenimiento Preventivo](#mantenimiento-preventivo)
2. [Mantenimiento Correctivo](#mantenimiento-correctivo)
3. [Monitoreo del Sistema](#monitoreo-del-sistema)
4. [Backups y Recuperación](#backups-y-recuperación)
5. [Actualizaciones y Parches](#actualizaciones-y-parches)
6. [Optimización de Performance](#optimización-de-performance)
7. [Seguridad](#seguridad)
8. [Escalabilidad](#escalabilidad)
9. [Documentación](#documentación)
10. [Procedimientos de Emergencia](#procedimientos-de-emergencia)

## Mantenimiento Preventivo

### Revisión Diaria

#### Verificación de Servicios
```bash
# Verificar estado de servicios en producción
curl -f https://tu-backend-url.com/api/health
curl -f https://tu-frontend-url.com

# Verificar logs de errores
tail -f /var/log/application/error.log
```

#### Métricas a Monitorear
- **Uptime**: Disponibilidad del servicio
- **Response Time**: Tiempo de respuesta de la API
- **Error Rate**: Tasa de errores HTTP
- **Database Connections**: Conexiones activas a MongoDB
- **Memory Usage**: Uso de memoria del servidor
- **CPU Usage**: Uso de CPU del servidor

### Revisión Semanal

#### Análisis de Logs
```bash
# Analizar logs de la semana
grep "ERROR" /var/log/application/app.log | wc -l
grep "WARN" /var/log/application/app.log | wc -l

# Top errores más frecuentes
grep "ERROR" /var/log/application/app.log | sort | uniq -c | sort -nr | head -10
```

#### Verificación de Base de Datos
```javascript
// Verificar índices de MongoDB
db.ratings.getIndexes()
db.professors.getIndexes()
db.faculties.getIndexes()

// Verificar estadísticas de colecciones
db.ratings.stats()
db.professors.stats()
```

### Revisión Mensual

#### Análisis de Performance
- Revisar métricas de performance de la aplicación
- Analizar consultas lentas en MongoDB
- Verificar uso de recursos del servidor
- Revisar logs de seguridad

#### Limpieza de Datos
```javascript
// Limpiar logs antiguos (mantener últimos 30 días)
db.activityLogs.deleteMany({
  createdAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
})

// Limpiar reportes resueltos antiguos
db.reports.deleteMany({
  status: "resolved",
  updatedAt: { $lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) }
})
```

## Mantenimiento Correctivo

### Procedimiento de Resolución de Incidentes

#### 1. Identificación del Problema
```bash
# Verificar logs en tiempo real
tail -f /var/log/application/app.log

# Verificar estado de servicios
systemctl status nginx
systemctl status nodejs
systemctl status mongod
```

#### 2. Análisis del Problema
```bash
# Verificar recursos del sistema
htop
df -h
free -h

# Verificar conexiones de red
netstat -tulpn | grep :3000
netstat -tulpn | grep :4000
```

#### 3. Resolución
- Documentar el problema y la solución
- Implementar la corrección
- Verificar que el problema esté resuelto
- Monitorear para asegurar estabilidad

### Problemas Comunes y Soluciones

#### Error de Conexión a Base de Datos
```bash
# Verificar conectividad a MongoDB
mongo --host tu-mongodb-host --port 27017

# Verificar variables de entorno
echo $DATABASE_URL
echo $MONGODB_URI
```

#### Error de CORS
```javascript
// Verificar configuración CORS en backend/src/config/cors.ts
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200
}
```

#### Error de Autenticación JWT
```bash
# Verificar secret key
echo $JWT_SECRET

# Verificar expiración de tokens
# Revisar logs de autenticación
```

## Monitoreo del Sistema

### Herramientas de Monitoreo

#### Monitoreo de Aplicación
- **Uptime Robot**: Monitoreo de disponibilidad
- **New Relic**: Performance y errores
- **Sentry**: Tracking de errores
- **LogRocket**: Session replay y debugging

#### Monitoreo de Infraestructura
- **MongoDB Atlas**: Monitoreo de base de datos
- **Vercel Analytics**: Métricas del frontend
- **Render/Railway**: Logs de despliegue

### Alertas Configuradas

#### Alertas Críticas
- Servicio no disponible
- Error rate > 5%
- Response time > 2s
- Database connection errors

#### Alertas de Advertencia
- High memory usage (>80%)
- High CPU usage (>80%)
- Disk space low (<20%)
- Unusual traffic patterns

### Dashboard de Monitoreo

#### Métricas Clave a Mostrar
- **Uptime**: 99.9%
- **Response Time**: <500ms
- **Error Rate**: <1%
- **Active Users**: Número de usuarios activos
- **Ratings per Day**: Calificaciones por día
- **Database Performance**: Tiempo de consulta promedio

## Backups y Recuperación

### Estrategia de Backups

#### Backups Automáticos
```bash
# Script de backup diario
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="$DATABASE_URL" --out="/backups/$DATE"
tar -czf "/backups/$DATE.tar.gz" "/backups/$DATE"
rm -rf "/backups/$DATE"
```

#### Retención de Backups
- **Diarios**: Últimos 7 días
- **Semanales**: Últimas 4 semanas
- **Mensuales**: Últimos 12 meses

### Procedimiento de Recuperación

#### Recuperación Completa
```bash
# Restaurar desde backup
mongorestore --uri="$DATABASE_URL" /backups/20241201_120000/
```

#### Recuperación Parcial
```javascript
// Restaurar solo una colección
mongorestore --uri="$DATABASE_URL" --collection=professors /backups/20241201_120000/
```

### Testing de Recuperación
- Realizar pruebas de recuperación mensualmente
- Verificar integridad de datos después de la recuperación
- Documentar tiempo de recuperación

## Actualizaciones y Parches

### Ciclo de Actualizaciones

#### Actualizaciones de Seguridad
- **Críticas**: Aplicar inmediatamente
- **Importantes**: Aplicar en 24-48 horas
- **Moderadas**: Aplicar en la próxima ventana de mantenimiento

#### Actualizaciones de Funcionalidad
- **Major**: Cada 6 meses
- **Minor**: Cada mes
- **Patch**: Semanalmente

### Procedimiento de Actualización

#### 1. Preparación
```bash
# Crear rama de staging
git checkout -b staging/update-v1.2.0

# Actualizar dependencias
npm audit fix
npm update
```

#### 2. Testing
```bash
# Ejecutar tests
npm test
npm run lint
npm run build

# Testing manual en staging
```

#### 3. Despliegue
```bash
# Despliegue gradual
# 1. Desplegar a 10% de usuarios
# 2. Monitorear métricas
# 3. Desplegar al 100% si todo está bien
```

### Rollback Plan
```bash
# Rollback automático si error rate > 5%
# Rollback manual si es necesario
git checkout v1.1.0
npm install
npm run build
# Desplegar versión anterior
```

## Optimización de Performance

### Frontend Optimization

#### Bundle Optimization
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
    }
  }
})
```

#### Image Optimization
```javascript
// Optimizar imágenes
// Usar formatos modernos (WebP, AVIF)
// Implementar lazy loading
// Usar CDN para assets
```

### Backend Optimization

#### Database Optimization
```javascript
// Crear índices para consultas frecuentes
db.ratings.createIndex({ professorId: 1, createdAt: -1 })
db.professors.createIndex({ facultyId: 1, averageRating: -1 })
db.subjects.createIndex({ facultyId: 1 })

// Optimizar consultas
db.ratings.find({ professorId: ObjectId("...") })
  .select({ rating: 1, comment: 1, createdAt: 1 })
  .limit(10)
  .sort({ createdAt: -1 })
```

#### Caching Strategy
```javascript
// Implementar Redis para caching
const redis = require('redis')
const client = redis.createClient()

// Cache de facultades (cambian poco)
client.setex('faculties', 3600, JSON.stringify(faculties))

// Cache de profesores populares
client.setex('top_professors', 1800, JSON.stringify(topProfessors))
```

### CDN y Assets
- Configurar CDN para archivos estáticos
- Implementar cache headers apropiados
- Usar compression (gzip, brotli)

## Seguridad

### Auditoría de Seguridad

#### Revisión Mensual
```bash
# Auditoría de dependencias
npm audit
npm audit fix

# Verificar configuraciones de seguridad
# Revisar logs de acceso
# Verificar certificados SSL
```

#### Penetration Testing
- Realizar tests de penetración trimestralmente
- Verificar vulnerabilidades OWASP Top 10
- Testing de autenticación y autorización

### Configuraciones de Seguridad

#### Headers de Seguridad
```javascript
// Configurar headers de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.google.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}))
```

#### Rate Limiting
```javascript
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: 'Demasiadas requests desde esta IP'
})

app.use('/api/', limiter)
```

### Monitoreo de Seguridad
- Logs de autenticación
- Intentos de acceso fallidos
- Actividad sospechosa
- Cambios en archivos críticos

## Escalabilidad

### Horizontal Scaling

#### Load Balancing
```javascript
// Configurar múltiples instancias
// Usar nginx como load balancer
upstream backend {
    server backend1:4000;
    server backend2:4000;
    server backend3:4000;
}
```

#### Database Scaling
```javascript
// Implementar MongoDB replica set
// Configurar read preferences
// Implementar sharding si es necesario
```

### Vertical Scaling
- Aumentar recursos del servidor según necesidad
- Optimizar código para mejor uso de recursos
- Implementar caching en múltiples niveles

### Auto-scaling
- Configurar auto-scaling basado en métricas
- Definir políticas de escalado
- Monitorear costos de escalado

## Documentación

### Mantenimiento de Documentación

#### Actualización Automática
- Documentar cambios en cada release
- Mantener changelog actualizado
- Actualizar diagramas de arquitectura

#### Documentación Técnica
- API documentation (Swagger/OpenAPI)
- Database schema documentation
- Deployment procedures
- Troubleshooting guides

### Knowledge Base
- Crear base de conocimiento para problemas comunes
- Documentar procedimientos de emergencia
- Mantener guías de onboarding para nuevos desarrolladores

## Procedimientos de Emergencia

### Plan de Respuesta a Incidentes

#### Nivel 1 - Crítico
- **Tiempo de respuesta**: 15 minutos
- **Tiempo de resolución**: 1 hora
- **Notificación**: Equipo completo + stakeholders

#### Nivel 2 - Alto
- **Tiempo de respuesta**: 1 hora
- **Tiempo de resolución**: 4 horas
- **Notificación**: Equipo de desarrollo

#### Nivel 3 - Medio
- **Tiempo de respuesta**: 4 horas
- **Tiempo de resolución**: 24 horas
- **Notificación**: Lead developer

### Contactos de Emergencia
- **DevOps Lead**: [Contacto]
- **Backend Lead**: [Contacto]
- **Frontend Lead**: [Contacto]
- **Database Admin**: [Contacto]

### Procedimientos de Comunicación
- Slack/Teams para comunicación interna
- Email para stakeholders
- Status page para usuarios
- Social media si es necesario

### Post-Incident Review
- Documentar incidente completo
- Identificar causa raíz
- Implementar medidas preventivas
- Actualizar procedimientos si es necesario

---

## Checklist de Mantenimiento

### Diario
- [ ] Verificar uptime de servicios
- [ ] Revisar logs de errores críticos
- [ ] Verificar métricas básicas

### Semanal
- [ ] Análisis completo de logs
- [ ] Verificación de backups
- [ ] Revisión de métricas de performance
- [ ] Auditoría de seguridad básica

### Mensual
- [ ] Análisis de tendencias de performance
- [ ] Revisión de configuración de seguridad
- [ ] Actualización de dependencias
- [ ] Limpieza de datos antiguos
- [ ] Testing de procedimientos de recuperación

### Trimestral
- [ ] Penetration testing
- [ ] Revisión de arquitectura
- [ ] Actualización de documentación
- [ ] Planificación de mejoras
- [ ] Revisión de SLA y métricas
