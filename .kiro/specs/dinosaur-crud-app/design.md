# Design Document - Dinosaur CRUD Application

## Overview

La aplicación Dinosaur CRUD es una Single Page Application (SPA) construida con Angular 15+ que permite gestionar un catálogo de dinosaurios mediante operaciones CRUD. La aplicación consume una API REST local (JSON Server) y utiliza Angular Material para proporcionar una interfaz moderna y responsiva.

### Technology Stack

- **Frontend Framework**: Angular 15+
- **UI Library**: Angular Material
- **HTTP Client**: Angular HttpClient
- **Forms**: Reactive Forms
- **Backend**: JSON Server (mock API REST)
- **State Management**: Component-based (no external state library needed for this scope)

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Angular Application                      │
│                                                               │
│  ┌────────────────┐      ┌──────────────────┐              │
│  │   Components   │◄────►│    Services      │              │
│  │                │      │                  │              │
│  │ - List View    │      │ - Dinosaur       │              │
│  │ - Form Dialog  │      │   Service        │              │
│  │ - Delete       │      │ - Error Handler  │              │
│  │   Confirm      │      │                  │              │
│  └────────────────┘      └──────────────────┘              │
│         │                         │                          │
│         │                         │ HttpClient               │
│         └─────────┬───────────────┘                          │
│                   │                                          │
└───────────────────┼──────────────────────────────────────────┘
                    │
                    │ HTTP (GET, POST, PUT, DELETE)
                    │
            ┌───────▼────────┐
            │   JSON Server  │
            │   (API REST)   │
            │                │
            │   db.json      │
            └────────────────┘
```

### Module Structure

```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   └── dinosaur.service.ts
│   │   └── models/
│   │       └── dinosaur.model.ts
│   ├── features/
│   │   └── dinosaurs/
│   │       ├── dinosaur-list/
│   │       │   ├── dinosaur-list.component.ts
│   │       │   ├── dinosaur-list.component.html
│   │       │   └── dinosaur-list.component.scss
│   │       ├── dinosaur-form-dialog/
│   │       │   ├── dinosaur-form-dialog.component.ts
│   │       │   ├── dinosaur-form-dialog.component.html
│   │       │   └── dinosaur-form-dialog.component.scss
│   │       └── dinosaurs.module.ts
│   ├── shared/
│   │   └── material.module.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   └── app-routing.module.ts
└── environments/
    ├── environment.ts
    └── environment.prod.ts
```

## Components and Interfaces

### 1. Dinosaur Model

```typescript
export interface Dinosaur {
  id?: number;
  name: string;
  species: string;
  period: string;
  diet: 'Herbívoro' | 'Carnívoro' | 'Omnívoro';
  length: number; // in meters
  weight: number; // in tons
  description?: string;
  imageUrl?: string;
}
```

### 2. Dinosaur Service

**Responsibility**: Gestionar todas las comunicaciones HTTP con la API REST.

**Methods**:
- `getDinosaurs(): Observable<Dinosaur[]>` - GET all dinosaurs
- `getDinosaur(id: number): Observable<Dinosaur>` - GET single dinosaur
- `createDinosaur(dinosaur: Dinosaur): Observable<Dinosaur>` - POST new dinosaur
- `updateDinosaur(id: number, dinosaur: Dinosaur): Observable<Dinosaur>` - PUT update dinosaur
- `deleteDinosaur(id: number): Observable<void>` - DELETE dinosaur

**Error Handling**:
- Implementar `catchError` operator para manejar errores HTTP
- Transformar errores técnicos en mensajes user-friendly
- Usar `throwError` para propagar errores a los componentes

### 3. Dinosaur List Component

**Responsibility**: Mostrar la tabla de dinosaurios con paginación, ordenamiento y acciones CRUD.

**Key Features**:
- MatTable con columnas: name, species, period, diet, length, weight, actions
- MatPaginator con opciones: [5, 10, 25, 50]
- MatSort en todas las columnas
- Botones de acción: Edit (MatIcon: edit), Delete (MatIcon: delete)
- Botón flotante para agregar (MatFab con MatIcon: add)
- Loading spinner durante peticiones HTTP

**Data Flow**:
1. `ngOnInit()`: Cargar dinosaurios desde el servicio
2. Almacenar datos en `MatTableDataSource`
3. Conectar paginator y sort al datasource
4. Escuchar eventos de CRUD y refrescar datos

### 4. Dinosaur Form Dialog Component

**Responsibility**: Formulario modal para crear/editar dinosaurios.

**Form Structure** (ReactiveFormsModule):
```typescript
dinosaurForm = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(2)]],
  species: ['', [Validators.required]],
  period: ['', [Validators.required]],
  diet: ['', [Validators.required]],
  length: [0, [Validators.required, Validators.min(0.1)]],
  weight: [0, [Validators.required, Validators.min(0.01)]],
  description: [''],
  imageUrl: ['', [Validators.pattern(/^https?:\/\/.+/)]]
});
```

**Dialog Configuration**:
- Width: 600px
- Recibir datos via `MAT_DIALOG_DATA` para modo edición
- Retornar resultado via `MatDialogRef.close()`

**Validation Messages**:
- Mostrar errores en tiempo real usando `mat-error`
- Deshabilitar botón submit si el formulario es inválido

### 5. Delete Confirmation Dialog

**Responsibility**: Confirmar eliminación de dinosaurios.

**Simple Implementation**:
- Usar `MatDialog` con mensaje de confirmación
- Botones: "Cancelar" y "Eliminar"
- Retornar boolean indicando la decisión del usuario

## Data Models

### API Endpoints (JSON Server)

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dinosaurs` | Obtener todos los dinosaurios |
| GET | `/dinosaurs/:id` | Obtener un dinosaurio específico |
| POST | `/dinosaurs` | Crear nuevo dinosaurio |
| PUT | `/dinosaurs/:id` | Actualizar dinosaurio existente |
| DELETE | `/dinosaurs/:id` | Eliminar dinosaurio |

### db.json Structure

```json
{
  "dinosaurs": [
    {
      "id": 1,
      "name": "Tyrannosaurus Rex",
      "species": "T. rex",
      "period": "Cretácico Superior",
      "diet": "Carnívoro",
      "length": 12.3,
      "weight": 8.4,
      "description": "Uno de los carnívoros terrestres más grandes de todos los tiempos",
      "imageUrl": "https://example.com/trex.jpg"
    },
    {
      "id": 2,
      "name": "Triceratops",
      "species": "T. horridus",
      "period": "Cretácico Superior",
      "diet": "Herbívoro",
      "length": 9.0,
      "weight": 6.0,
      "description": "Dinosaurio herbívoro con tres cuernos característicos",
      "imageUrl": "https://example.com/triceratops.jpg"
    },
    {
      "id": 3,
      "name": "Velociraptor",
      "species": "V. mongoliensis",
      "period": "Cretácico Superior",
      "diet": "Carnívoro",
      "length": 2.0,
      "weight": 0.015,
      "description": "Pequeño dinosaurio carnívoro conocido por su inteligencia",
      "imageUrl": "https://example.com/velociraptor.jpg"
    }
  ]
}
```

## Error Handling

### HTTP Error Handling Strategy

1. **Service Level**:
```typescript
private handleError(error: HttpErrorResponse): Observable<never> {
  let errorMessage = 'Ocurrió un error desconocido';
  
  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side error
    switch (error.status) {
      case 404:
        errorMessage = 'Dinosaurio no encontrado';
        break;
      case 500:
        errorMessage = 'Error del servidor';
        break;
      case 0:
        errorMessage = 'No se pudo conectar con el servidor';
        break;
      default:
        errorMessage = `Error ${error.status}: ${error.message}`;
    }
  }
  
  return throwError(() => new Error(errorMessage));
}
```

2. **Component Level**:
- Capturar errores en subscripciones
- Mostrar mensajes usando MatSnackBar
- Mantener el estado de la UI consistente

### User Feedback

**Success Messages** (MatSnackBar):
- "Dinosaurio agregado exitosamente"
- "Dinosaurio actualizado exitosamente"
- "Dinosaurio eliminado exitosamente"

**Error Messages** (MatSnackBar):
- Mostrar mensaje de error específico
- Duración: 5 segundos
- Acción: "Cerrar"
- Estilo: panelClass con color de error

## Testing Strategy

### Unit Tests

**Services**:
- Mockear HttpClient usando HttpClientTestingModule
- Verificar que se llamen los endpoints correctos
- Verificar manejo de errores

**Components**:
- Mockear DinosaurService
- Verificar renderizado de datos
- Verificar interacciones de usuario (clicks, form submission)
- Verificar apertura/cierre de diálogos

**Forms**:
- Verificar validaciones
- Verificar estados (valid, invalid, pristine, dirty)
- Verificar mensajes de error

### Integration Tests

- Verificar flujo completo de CRUD
- Verificar interacción entre componentes y servicios
- Verificar actualización de tabla después de operaciones

### E2E Tests (Optional)

- Verificar flujo de usuario completo
- Verificar navegación y diálogos
- Verificar persistencia de datos

## UI/UX Design

### Material Theme

```typescript
// Custom theme configuration
@use '@angular/material' as mat;

$primary-palette: mat.define-palette(mat.$green-palette);
$accent-palette: mat.define-palette(mat.$amber-palette);
$warn-palette: mat.define-palette(mat.$red-palette);

$theme: mat.define-light-theme((
  color: (
    primary: $primary-palette,
    accent: $accent-palette,
    warn: $warn-palette,
  )
));
```

### Responsive Design

**Breakpoints**:
- Mobile: < 600px - Tabla con scroll horizontal
- Tablet: 600px - 960px - Tabla adaptada con columnas esenciales
- Desktop: > 960px - Tabla completa con todas las columnas

**Table Responsiveness**:
- Ocultar columnas menos importantes en pantallas pequeñas
- Usar `fxHide` / `fxShow` directives o CSS media queries
- Mantener columnas de acciones siempre visibles

### Loading States

- Mostrar MatProgressSpinner centrado durante carga inicial
- Deshabilitar botones durante operaciones
- Overlay con spinner durante operaciones CRUD

### Accessibility

- Usar labels apropiados en formularios
- Implementar aria-labels en botones de iconos
- Asegurar contraste de colores adecuado
- Navegación por teclado funcional

## Performance Considerations

1. **Change Detection**: Usar `OnPush` strategy donde sea posible
2. **Unsubscribe**: Usar `takeUntil` o `async` pipe para evitar memory leaks
3. **Lazy Loading**: Considerar lazy loading del módulo de dinosaurios si la app crece
4. **Pagination**: Implementar paginación del lado del cliente (suficiente para JSON Server)

## Security Considerations

1. **Input Validation**: Validar todos los inputs en el frontend
2. **XSS Prevention**: Angular sanitiza automáticamente, pero validar URLs de imágenes
3. **CORS**: Configurar JSON Server para aceptar peticiones del origen de Angular
4. **Environment Variables**: Usar environment files para la URL de la API

## Deployment Considerations

### Development Setup

1. Instalar JSON Server: `npm install -g json-server`
2. Crear db.json con datos iniciales
3. Ejecutar JSON Server: `json-server --watch db.json --port 3000`
4. Ejecutar Angular: `ng serve`

### Production Build

1. Build optimizado: `ng build --configuration production`
2. Considerar backend real en lugar de JSON Server
3. Configurar variables de entorno para diferentes ambientes

## Future Enhancements

- Búsqueda y filtrado de dinosaurios
- Exportar datos a CSV/PDF
- Subida de imágenes
- Autenticación y autorización
- Backend real con base de datos
- Internacionalización (i18n)
- Dark mode theme
