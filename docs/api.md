# Documentación de la API - ProfeScore

## Información General

- **Base URL**: `https://tu-backend-url.com/api`
- **Versión**: v1.0.0
- **Formato**: JSON
- **Autenticación**: JWT (solo para rutas administrativas)

## Autenticación

### JWT Token
Para rutas administrativas, incluir el token JWT en el header:
```
Authorization: Bearer <token>
```

### FingerprintJS
Para tracking anónimo de usuarios, se usa FingerprintJS Pro.

## Endpoints

### Facultades

#### GET /faculties
Obtiene todas las facultades disponibles.

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "Ingeniería",
      "description": "Facultad de Ingeniería",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### GET /faculties/:id
Obtiene una facultad específica por ID.

**Parámetros:**
- `id` (string): ID de la facultad

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Ingeniería",
    "description": "Facultad de Ingeniería",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Materias

#### GET /faculties/:facultyId/subjects
Obtiene todas las materias de una facultad.

**Parámetros:**
- `facultyId` (string): ID de la facultad

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
      "name": "Programación I",
      "description": "Introducción a la programación",
      "facultyId": "64f1a2b3c4d5e6f7g8h9i0j1",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### GET /subjects/:id
Obtiene una materia específica por ID.

**Parámetros:**
- `id` (string): ID de la materia

### Profesores

#### GET /faculties/:facultyId/professors
Obtiene todos los profesores de una facultad.

**Parámetros:**
- `facultyId` (string): ID de la facultad

**Query Parameters:**
- `search` (string, opcional): Buscar por nombre del profesor
- `sort` (string, opcional): Ordenar por 'rating' o 'name'
- `limit` (number, opcional): Límite de resultados (default: 20)

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j3",
      "name": "Dr. Juan Pérez",
      "email": "juan.perez@universidad.edu",
      "facultyId": "64f1a2b3c4d5e6f7g8h9i0j1",
      "subjects": ["64f1a2b3c4d5e6f7g8h9i0j2"],
      "averageRating": 4.5,
      "totalRatings": 25,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### GET /professors/:id
Obtiene un profesor específico por ID.

**Parámetros:**
- `id` (string): ID del profesor

#### GET /professors/:id/ratings
Obtiene las calificaciones de un profesor específico.

**Parámetros:**
- `id` (string): ID del profesor

**Query Parameters:**
- `page` (number, opcional): Página (default: 1)
- `limit` (number, opcional): Límite por página (default: 10)
- `subjectId` (string, opcional): Filtrar por materia

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "ratings": [
      {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j4",
        "professorId": "64f1a2b3c4d5e6f7g8h9i0j3",
        "subjectId": "64f1a2b3c4d5e6f7g8h9i0j2",
        "facultyId": "64f1a2b3c4d5e6f7g8h9i0j1",
        "rating": 5,
        "comment": "Excelente profesor, muy claro en sus explicaciones",
        "fingerprintId": "fp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

### Calificaciones

#### POST /ratings
Crea una nueva calificación para un profesor.

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "professorId": "64f1a2b3c4d5e6f7g8h9i0j3",
  "subjectId": "64f1a2b3c4d5e6f7g8h9i0j2",
  "facultyId": "64f1a2b3c4d5e6f7g8h9i0j1",
  "rating": 5,
  "comment": "Excelente profesor, muy claro en sus explicaciones",
  "fingerprintId": "fp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "recaptchaToken": "03AFcWeA..."
}
```

**Validaciones:**
- `rating`: Número entre 1 y 5
- `comment`: String entre 10 y 500 caracteres
- `professorId`, `subjectId`, `facultyId`: IDs válidos
- `recaptchaToken`: Token válido de Google reCAPTCHA

**Respuesta:**
```json
{
  "success": true,
  "message": "Calificación creada exitosamente",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j4",
    "professorId": "64f1a2b3c4d5e6f7g8h9i0j3",
    "subjectId": "64f1a2b3c4d5e6f7g8h9i0j2",
    "facultyId": "64f1a2b3c4d5e6f7g8h9i0j1",
    "rating": 5,
    "comment": "Excelente profesor, muy claro en sus explicaciones",
    "fingerprintId": "fp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Administración

#### POST /admin/login
Autenticación de administrador.

**Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j5",
      "username": "admin",
      "role": "admin"
    }
  }
}
```

#### GET /admin/dashboard
Obtiene estadísticas del dashboard administrativo.

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "totalFaculties": 5,
    "totalSubjects": 45,
    "totalProfessors": 120,
    "totalRatings": 1250,
    "averageRating": 4.2,
    "recentRatings": [
      {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j4",
        "professorName": "Dr. Juan Pérez",
        "subjectName": "Programación I",
        "rating": 5,
        "comment": "Excelente profesor",
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "topProfessors": [
      {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j3",
        "name": "Dr. Juan Pérez",
        "averageRating": 4.8,
        "totalRatings": 45
      }
    ]
  }
}
```

#### POST /admin/faculties
Crea una nueva facultad (requiere autenticación).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Medicina",
  "description": "Facultad de Medicina"
}
```

#### PUT /admin/faculties/:id
Actualiza una facultad existente (requiere autenticación).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Medicina Actualizada",
  "description": "Facultad de Medicina con nueva descripción"
}
```

#### DELETE /admin/faculties/:id
Elimina una facultad (requiere autenticación).

**Headers:**
```
Authorization: Bearer <token>
```

#### POST /admin/subjects
Crea una nueva materia (requiere autenticación).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Anatomía I",
  "description": "Introducción a la anatomía humana",
  "facultyId": "64f1a2b3c4d5e6f7g8h9i0j1"
}
```

#### POST /admin/professors
Crea un nuevo profesor (requiere autenticación).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Dr. María García",
  "email": "maria.garcia@universidad.edu",
  "facultyId": "64f1a2b3c4d5e6f7g8h9i0j1",
  "subjects": ["64f1a2b3c4d5e6f7g8h9i0j2"]
}
```

#### GET /admin/reports
Obtiene reportes de calificaciones (requiere autenticación).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (string, opcional): Filtrar por estado ('pending', 'resolved', 'rejected')
- `page` (number, opcional): Página (default: 1)
- `limit` (number, opcional): Límite por página (default: 20)

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "reports": [
      {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j6",
        "ratingId": "64f1a2b3c4d5e6f7g8h9i0j4",
        "reason": "Comentario inapropiado",
        "status": "pending",
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "pages": 1
    }
  }
}
```

## Códigos de Error

### HTTP Status Codes
- `200`: OK - Solicitud exitosa
- `201`: Created - Recurso creado exitosamente
- `400`: Bad Request - Datos de entrada inválidos
- `401`: Unauthorized - No autenticado
- `403`: Forbidden - No autorizado
- `404`: Not Found - Recurso no encontrado
- `422`: Unprocessable Entity - Validación fallida
- `429`: Too Many Requests - Límite de rate exceeded
- `500`: Internal Server Error - Error interno del servidor

### Formato de Error
```json
{
  "success": false,
  "error": {
    "message": "Descripción del error",
    "code": "ERROR_CODE",
    "details": {
      "field": "Detalle específico del campo"
    }
  }
}
```

### Códigos de Error Comunes
- `VALIDATION_ERROR`: Error de validación de datos
- `AUTHENTICATION_ERROR`: Error de autenticación
- `AUTHORIZATION_ERROR`: Error de autorización
- `NOT_FOUND`: Recurso no encontrado
- `DUPLICATE_ERROR`: Recurso duplicado
- `RATE_LIMIT_ERROR`: Límite de requests excedido
- `RECAPTCHA_ERROR`: Error de verificación reCAPTCHA
- `DATABASE_ERROR`: Error de base de datos

## Rate Limiting

- **Límite general**: 100 requests por 15 minutos por IP
- **Límite de calificaciones**: 5 calificaciones por hora por fingerprint
- **Límite de login**: 5 intentos por 15 minutos por IP

## Ejemplos de Uso

### JavaScript/Node.js
```javascript
// Obtener facultades
const response = await fetch('https://tu-backend-url.com/api/faculties');
const data = await response.json();

// Crear calificación
const ratingResponse = await fetch('https://tu-backend-url.com/api/ratings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    professorId: '64f1a2b3c4d5e6f7g8h9i0j3',
    subjectId: '64f1a2b3c4d5e6f7g8h9i0j2',
    facultyId: '64f1a2b3c4d5e6f7g8h9i0j1',
    rating: 5,
    comment: 'Excelente profesor',
    fingerprintId: 'fp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    recaptchaToken: '03AFcWeA...'
  })
});
```

### cURL
```bash
# Obtener facultades
curl -X GET https://tu-backend-url.com/api/faculties

# Crear calificación
curl -X POST https://tu-backend-url.com/api/ratings \
  -H "Content-Type: application/json" \
  -d '{
    "professorId": "64f1a2b3c4d5e6f7g8h9i0j3",
    "subjectId": "64f1a2b3c4d5e6f7g8h9i0j2",
    "facultyId": "64f1a2b3c4d5e6f7g8h9i0j1",
    "rating": 5,
    "comment": "Excelente profesor",
    "fingerprintId": "fp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "recaptchaToken": "03AFcWeA..."
  }'

# Login de admin
curl -X POST https://tu-backend-url.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password123"
  }'
```

## Webhooks (Futuro)

En futuras versiones se implementarán webhooks para:
- Nueva calificación creada
- Reporte de calificación
- Profesor agregado
- Materia agregada

## Changelog

### v1.0.0 (2024-01-15)
- Endpoints básicos de facultades, materias y profesores
- Sistema de calificaciones
- Panel administrativo
- Autenticación JWT
- Integración con reCAPTCHA y FingerprintJS 