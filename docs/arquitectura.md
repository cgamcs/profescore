# Arquitectura de ProfeScore

## Visión General

ProfeScore es una aplicación web full-stack diseñada con una arquitectura cliente-servidor moderna. La aplicación permite a los estudiantes calificar y compartir experiencias con profesores de forma anónima, organizada por facultad y materia.

## Arquitectura del Sistema

### Diagrama de Arquitectura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Base de       │
│   (React + TS)  │◄──►│   (Node.js +    │◄──►│   Datos         │
│                 │    │    Express)     │    │   (MongoDB)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel        │    │     Render      │    │   MongoDB       │
│   (Despliegue)  │    │                 │    │   Atlas         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Stack Tecnológico

### Frontend
- **Framework**: React 19.0.0 con TypeScript
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS 4.0.15
- **UI Components**: Radix UI
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM 7.4.0
- **Icons**: Lucide React, React Icons
- **Authentication**: FingerprintJS Pro
- **Captcha**: Google reCAPTCHA
- **Notifications**: Sonner, React Toastify

### Backend
- **Runtime**: Node.js con TypeScript
- **Framework**: Express.js 4.21.2
- **Database**: MongoDB con Mongoose 8.13.1
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 3.0.2
- **Validation**: express-validator 7.2.1
- **CORS**: cors 2.8.5
- **Environment**: dotenv 16.4.7

### DevOps y Despliegue
- **Frontend**: Vercel
- **Backend**: Render, Railway u otros
- **Database**: MongoDB Atlas
- **Version Control**: Git con GitHub

## Estructura del Proyecto

### Frontend (`/frontend`)

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── ui/             # Componentes de UI base
│   │   ├── Portal.tsx      # Portal para modales
│   │   └── ...
│   ├── pages/              # Páginas de la aplicación
│   │   ├── admin/          # Páginas administrativas
│   │   ├── FacultyDetail.tsx
│   │   ├── ProfessorDetail.tsx
│   │   └── ...
│   ├── layouts/            # Layouts y componentes de estructura
│   ├── hooks/              # Custom hooks
│   ├── api.ts              # Configuración de API
│   ├── types.ts            # Tipos TypeScript
│   └── main.tsx            # Punto de entrada
├── public/                 # Archivos estáticos
├── package.json
└── vite.config.ts
```

### Backend (`/backend`)

```
backend/
├── src/
│   ├── config/             # Configuraciones
│   │   ├── cors.ts         # Configuración CORS
│   │   └── db.ts           # Configuración de base de datos
│   ├── controllers/        # Controladores de la API
│   │   ├── AdminController.ts
│   │   ├── FacultyController.ts
│   │   ├── ProfessorController.ts
│   │   ├── RatingController.ts
│   │   └── ...
│   ├── middleware/         # Middlewares personalizados
│   │   ├── adminAuth.ts    # Autenticación de admin
│   │   ├── validation.ts   # Validación de datos
│   │   └── ...
│   ├── models/             # Modelos de MongoDB
│   │   ├── Admin.ts
│   │   ├── Faculty.ts
│   │   ├── Professor.ts
│   │   ├── Rating.ts
│   │   └── ...
│   ├── routes/             # Definición de rutas
│   │   ├── adminRoutes.ts
│   │   └── facultyRoutes.ts
│   ├── index.ts            # Punto de entrada
│   └── server.ts           # Configuración del servidor
├── package.json
└── tsconfig.json
```

## Modelos de Datos

### Entidades Principales

#### Faculty (Facultad)
- `_id`: Identificador único
- `name`: Nombre de la facultad
- `description`: Descripción de la facultad
- `createdAt`: Fecha de creación
- `updatedAt`: Fecha de actualización

#### Professor (Profesor)
- `_id`: Identificador único
- `name`: Nombre del profesor
- `email`: Email del profesor
- `facultyId`: Referencia a la facultad
- `subjects`: Array de materias que imparte
- `averageRating`: Calificación promedio
- `totalRatings`: Número total de calificaciones

#### Subject (Materia)
- `_id`: Identificador único
- `name`: Nombre de la materia
- `facultyId`: Referencia a la facultad
- `description`: Descripción de la materia

#### Rating (Calificación)
- `_id`: Identificador único
- `professorId`: Referencia al profesor
- `subjectId`: Referencia a la materia
- `facultyId`: Referencia a la facultad
- `rating`: Puntuación (1-5)
- `comment`: Comentario del estudiante
- `fingerprintId`: Identificador anónimo del usuario
- `createdAt`: Fecha de creación

#### Admin (Administrador)
- `_id`: Identificador único
- `username`: Nombre de usuario
- `password`: Contraseña hasheada
- `role`: Rol del administrador

## Patrones de Diseño

### Frontend
- **Component-Based Architecture**: Componentes reutilizables y modulares
- **Custom Hooks**: Lógica reutilizable encapsulada en hooks
- **Context API**: Estado global cuando es necesario
- **Container/Presentational Pattern**: Separación de lógica y presentación

### Backend
- **MVC Pattern**: Model-View-Controller con Express
- **Repository Pattern**: Abstracción de acceso a datos con Mongoose
- **Middleware Pattern**: Procesamiento de requests en cadena
- **JWT Authentication**: Autenticación basada en tokens

## Flujo de Datos

### Autenticación
1. Usuario accede a la aplicación
2. FingerprintJS genera un ID único del dispositivo
3. El ID se usa para tracking anónimo de calificaciones
4. Administradores usan JWT para autenticación

### Calificación de Profesores
1. Usuario selecciona facultad y materia
2. Busca o selecciona profesor
3. Completa formulario de calificación
4. Sistema valida datos y reCAPTCHA
5. Se guarda calificación en MongoDB
6. Se actualiza promedio del profesor

### Panel Administrativo
1. Admin se autentica con JWT
2. Accede a dashboard con estadísticas
3. Gestiona facultades, materias y profesores
4. Revisa reportes y actividad

## Seguridad

### Frontend
- **reCAPTCHA**: Protección contra bots
- **Input Validation**: Validación en cliente
- **HTTPS**: Conexiones seguras
- **CSP**: Content Security Policy

### Backend
- **JWT Authentication**: Para rutas administrativas
- **Password Hashing**: bcryptjs para contraseñas
- **Input Validation**: express-validator
- **CORS**: Configuración específica de orígenes
- **Rate Limiting**: Protección contra spam
- **MongoDB Injection Protection**: Mongoose ODM

## Escalabilidad

### Horizontal
- **Load Balancing**: Múltiples instancias del backend
- **CDN**: Para archivos estáticos del frontend
- **Database Sharding**: Particionamiento de MongoDB

### Vertical
- **Caching**: Redis para datos frecuentemente accedidos
- **Database Indexing**: Índices optimizados en MongoDB
- **Image Optimization**: Compresión y formatos modernos

## Monitoreo y Logging

### Métricas Clave
- Tiempo de respuesta de API
- Tasa de errores
- Uso de recursos
- Número de calificaciones por día

### Logging
- Logs de errores y excepciones
- Logs de actividad administrativa
- Logs de performance

## Consideraciones de Privacidad

- **Anonimato**: FingerprintJS para tracking sin identificación personal
- **GDPR Compliance**: Cumplimiento con regulaciones de privacidad
- **Data Retention**: Políticas de retención de datos
- **User Consent**: Consentimiento explícito para recolección de datos

## Futuras Mejoras

- **Microservicios**: Separación de servicios por dominio
- **GraphQL**: API más flexible y eficiente
- **Real-time**: WebSockets para actualizaciones en tiempo real
- **Mobile App**: Aplicación móvil nativa
- **Analytics**: Dashboard de analytics avanzado
- **Machine Learning**: Recomendaciones personalizadas
