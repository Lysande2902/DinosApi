# Implementation Plan - Dinosaur CRUD Application

- [x] 1. Configurar proyecto Angular y dependencias


  - Crear nuevo proyecto Angular con routing: `ng new dinosaur-app --routing --style=scss`
  - Instalar Angular Material: `ng add @angular/material`
  - Configurar tema Material Design (green/amber)
  - Crear estructura de carpetas (core, features, shared)
  - _Requirements: 6.5, 7.1, 7.2_



- [ ] 2. Configurar JSON Server y datos iniciales
  - Instalar JSON Server globalmente: `npm install -g json-server`
  - Crear archivo db.json en la raíz del proyecto con 5-6 dinosaurios de ejemplo
  - Incluir datos completos: id, name, species, period, diet, length, weight, description, imageUrl




  - Verificar que JSON Server funcione: `json-server --watch db.json --port 3000`
  - _Requirements: 1.1, 6.4_

- [x] 3. Crear modelo de datos y configuración de entorno


- [ ] 3.1 Crear interfaz Dinosaur
  - Crear archivo `src/app/core/models/dinosaur.model.ts`


  - Definir interfaz con todas las propiedades (id, name, species, period, diet, length, weight, description, imageUrl)
  - Definir tipo literal para diet: 'Herbívoro' | 'Carnívoro' | 'Omnívoro'
  - _Requirements: 1.2, 2.1, 3.1_





- [ ] 3.2 Configurar variables de entorno
  - Actualizar `src/environments/environment.ts` con apiUrl: 'http://localhost:3000'
  - Actualizar `src/environments/environment.prod.ts` con URL de producción
  - _Requirements: 6.4_


- [ ] 4. Crear módulo compartido de Material
  - Crear `src/app/shared/material.module.ts`
  - Importar y exportar módulos de Material: MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogModule, MatSnackBarModule, MatProgressSpinnerModule, MatSelectModule
  - Importar MaterialModule en AppModule
  - _Requirements: 7.1_


- [ ] 5. Implementar servicio de dinosaurios
- [ ] 5.1 Crear DinosaurService
  - Crear archivo `src/app/core/services/dinosaur.service.ts`
  - Inyectar HttpClient en el constructor
  - Definir propiedad privada apiUrl usando environment.apiUrl




  - _Requirements: 6.1, 6.4_

- [ ] 5.2 Implementar métodos CRUD en DinosaurService
  - Implementar `getDinosaurs(): Observable<Dinosaur[]>` con GET a `/dinosaurs`
  - Implementar `getDinosaur(id: number): Observable<Dinosaur>` con GET a `/dinosaurs/${id}`
  - Implementar `createDinosaur(dinosaur: Dinosaur): Observable<Dinosaur>` con POST a `/dinosaurs`

  - Implementar `updateDinosaur(id: number, dinosaur: Dinosaur): Observable<Dinosaur>` con PUT a `/dinosaurs/${id}`
  - Implementar `deleteDinosaur(id: number): Observable<void>` con DELETE a `/dinosaurs/${id}`
  - _Requirements: 1.1, 2.3, 3.3, 4.2_

- [ ] 5.3 Implementar manejo de errores en DinosaurService
  - Crear método privado `handleError(error: HttpErrorResponse): Observable<never>`
  - Implementar switch para diferentes códigos de error (404, 500, 0)


  - Aplicar `catchError(this.handleError)` a todos los métodos HTTP
  - Retornar mensajes de error user-friendly en español
  - _Requirements: 1.3, 2.5, 3.5, 4.4, 6.4_

- [ ] 6. Crear componente de lista de dinosaurios
- [ ] 6.1 Generar componente DinosaurList
  - Generar componente: `ng generate component features/dinosaurs/dinosaur-list`

  - Inyectar DinosaurService y MatDialog en el constructor
  - Crear propiedad `displayedColumns` con array de nombres de columnas
  - Crear propiedad `dataSource` de tipo MatTableDataSource<Dinosaur>
  - Crear propiedades ViewChild para MatPaginator y MatSort
  - _Requirements: 1.2, 6.2_


- [ ] 6.2 Implementar carga de datos en DinosaurList
  - Crear método `loadDinosaurs()` que llame a `dinosaurService.getDinosaurs()`
  - Implementar `ngOnInit()` para llamar a `loadDinosaurs()`
  - Asignar datos recibidos a `dataSource.data`


  - Conectar paginator y sort al dataSource en `ngAfterViewInit()`
  - Agregar propiedad `isLoading` para mostrar spinner
  - _Requirements: 1.1, 1.5_

- [x] 6.3 Implementar template HTML de DinosaurList




  - Crear estructura con MatProgressSpinner condicional (mostrar si isLoading)
  - Crear MatTable con [dataSource] y columnas definidas
  - Definir ng-container para cada columna: name, species, period, diet, length, weight
  - Agregar columna de acciones con botones edit y delete (MatIconButton)

  - Agregar MatPaginator debajo de la tabla con [pageSizeOptions]="[5, 10, 25, 50]"
  - Agregar botón flotante (MatFab) para agregar dinosaurio
  - _Requirements: 1.2, 1.4, 5.1_

- [ ] 6.4 Aplicar MatSort a la tabla
  - Agregar directiva `matSort` a mat-table
  - Agregar directiva `mat-sort-header` a cada mat-header-cell


  - Configurar sort en ngAfterViewInit: `dataSource.sort = this.sort`
  - _Requirements: 5.2, 5.4_

- [ ] 6.5 Implementar manejo de errores en DinosaurList
  - Inyectar MatSnackBar en el constructor
  - Crear método `showError(message: string)` que abra snackbar con duración 5000ms
  - Agregar manejo de error en subscribe de loadDinosaurs()
  - _Requirements: 1.3, 6.4_


- [ ] 6.6 Aplicar estilos responsivos a DinosaurList
  - Crear estilos en dinosaur-list.component.scss
  - Aplicar estilos para contenedor principal con padding
  - Configurar tabla con overflow-x: auto para scroll horizontal en móviles
  - Agregar estilos para botón flotante (posición fixed, bottom-right)


  - Usar media queries para ocultar columnas en pantallas pequeñas
  - _Requirements: 1.4, 7.3_

- [x] 7. Crear componente de formulario de dinosaurio




- [ ] 7.1 Generar componente DinosaurFormDialog
  - Generar componente: `ng generate component features/dinosaurs/dinosaur-form-dialog`
  - Inyectar FormBuilder, MatDialogRef, y MAT_DIALOG_DATA en el constructor
  - Importar ReactiveFormsModule en el módulo correspondiente
  - _Requirements: 2.1, 3.1, 6.3_

- [ ] 7.2 Crear formulario reactivo en DinosaurFormDialog
  - Crear propiedad `dinosaurForm` usando FormBuilder

  - Definir FormControls para: name, species, period, diet, length, weight, description, imageUrl
  - Aplicar validadores: required, minLength, min, pattern para URL
  - Crear propiedad `isEditMode` basada en si MAT_DIALOG_DATA tiene valor
  - Si isEditMode, usar `patchValue()` para pre-llenar el formulario
  - _Requirements: 2.2, 3.2, 6.3_

- [ ] 7.3 Implementar template HTML de DinosaurFormDialog
  - Crear estructura con mat-dialog-title (dinámico: "Agregar" o "Editar")




  - Crear mat-dialog-content con formulario [formGroup]="dinosaurForm"
  - Crear mat-form-field para cada campo con mat-label y matInput
  - Usar mat-select para campo diet con opciones: Herbívoro, Carnívoro, Omnívoro
  - Agregar mat-error debajo de cada campo con mensajes de validación
  - Crear mat-dialog-actions con botones "Cancelar" y "Guardar"
  - Deshabilitar botón Guardar si formulario es inválido


  - _Requirements: 2.1, 3.1, 7.1_

- [ ] 7.4 Implementar lógica de submit en DinosaurFormDialog
  - Crear método `onSubmit()` que verifique validez del formulario
  - Si válido, cerrar diálogo con `dialogRef.close(this.dinosaurForm.value)`




  - Si inválido, marcar todos los campos como touched para mostrar errores
  - Crear método `onCancel()` que cierre el diálogo sin datos
  - _Requirements: 2.2, 2.4, 3.2, 3.4_



- [ ] 7.5 Aplicar estilos al formulario
  - Configurar ancho del diálogo en 600px
  - Aplicar estilos para que form-fields ocupen 100% del ancho
  - Agregar espaciado entre campos
  - Estilizar botones de acciones (alineación, colores)
  - _Requirements: 7.1, 7.2, 7.5_



- [ ] 8. Integrar formulario con operaciones CREATE y UPDATE
- [ ] 8.1 Implementar método para abrir diálogo de agregar
  - En DinosaurListComponent, crear método `openAddDialog()`




  - Abrir MatDialog con DinosaurFormDialogComponent, width: '600px'
  - Suscribirse al resultado del diálogo (afterClosed())
  - Si hay resultado, llamar a `dinosaurService.createDinosaur(result)`
  - Al completar, llamar a `loadDinosaurs()` y mostrar mensaje de éxito con MatSnackBar
  - Manejar errores y mostrar mensaje con MatSnackBar


  - Conectar método al click del botón flotante
  - _Requirements: 2.1, 2.3, 2.4_

- [ ] 8.2 Implementar método para abrir diálogo de editar
  - En DinosaurListComponent, crear método `openEditDialog(dinosaur: Dinosaur)`

  - Abrir MatDialog con DinosaurFormDialogComponent, pasar dinosaur en data
  - Suscribirse al resultado del diálogo
  - Si hay resultado, llamar a `dinosaurService.updateDinosaur(dinosaur.id, result)`
  - Al completar, llamar a `loadDinosaurs()` y mostrar mensaje de éxito
  - Manejar errores y mostrar mensaje con MatSnackBar
  - Conectar método al click del botón edit en la tabla
  - _Requirements: 3.1, 3.3, 3.4_

- [ ] 9. Implementar funcionalidad de eliminación
- [ ] 9.1 Crear método de confirmación de eliminación
  - En DinosaurListComponent, crear método `confirmDelete(dinosaur: Dinosaur)`
  - Abrir MatDialog con configuración simple: `confirm()` de Material o componente custom
  - Usar `MatDialog.open()` con template inline o componente de confirmación
  - Configurar mensaje: "¿Estás seguro de eliminar a {dinosaur.name}?"
  - Botones: "Cancelar" y "Eliminar" (color warn)
  - _Requirements: 4.1_

- [ ] 9.2 Implementar lógica de eliminación
  - Suscribirse al resultado del diálogo de confirmación
  - Si confirmado, llamar a `dinosaurService.deleteDinosaur(dinosaur.id)`
  - Al completar, llamar a `loadDinosaurs()` y mostrar mensaje de éxito
  - Manejar errores y mostrar mensaje con MatSnackBar
  - Conectar método al click del botón delete en la tabla
  - _Requirements: 4.2, 4.3, 4.4, 4.5_

- [ ] 10. Configurar routing y módulo principal
- [ ] 10.1 Configurar AppRoutingModule
  - Definir ruta raíz que cargue DinosaurListComponent
  - Configurar redirección de '' a ruta principal
  - _Requirements: 6.5_

- [ ] 10.2 Actualizar AppModule
  - Importar HttpClientModule
  - Importar BrowserAnimationsModule
  - Importar MaterialModule
  - Importar ReactiveFormsModule
  - Declarar todos los componentes creados
  - Proveer DinosaurService
  - _Requirements: 6.1, 6.5_

- [ ] 10.3 Actualizar AppComponent
  - Crear toolbar con MatToolbar
  - Agregar título de la aplicación: "Catálogo de Dinosaurios"
  - Agregar router-outlet para mostrar componentes
  - Aplicar estilos básicos de layout
  - _Requirements: 7.1, 7.2_

- [ ] 11. Implementar mejoras de UX y feedback visual
- [ ] 11.1 Agregar estados de carga
  - Agregar propiedad `isLoading` en DinosaurListComponent
  - Mostrar MatProgressSpinner mientras isLoading es true
  - Deshabilitar botones durante operaciones CRUD
  - _Requirements: 1.5, 7.4_

- [ ] 11.2 Mejorar mensajes de feedback
  - Configurar MatSnackBar con duración 3000ms para éxitos
  - Configurar MatSnackBar con duración 5000ms y acción "Cerrar" para errores
  - Aplicar panelClass para diferenciar éxitos (success) y errores (error)
  - Mensajes en español: "Dinosaurio agregado exitosamente", etc.
  - _Requirements: 2.4, 3.4, 4.3, 7.4_

- [ ] 11.3 Aplicar tema personalizado
  - Crear archivo `src/styles/theme.scss`
  - Definir paleta primary (green), accent (amber), warn (red)
  - Aplicar tema usando @include mat.all-component-themes
  - Importar tema en styles.scss
  - _Requirements: 7.1, 7.2_

- [ ] 12. Testing y validación
- [ ] 12.1 Crear tests unitarios para DinosaurService
  - Configurar HttpClientTestingModule
  - Mockear respuestas HTTP
  - Verificar que se llamen los endpoints correctos
  - Verificar manejo de errores
  - _Requirements: 6.4_

- [ ] 12.2 Crear tests unitarios para componentes
  - Mockear DinosaurService
  - Verificar renderizado de datos en tabla
  - Verificar apertura de diálogos
  - Verificar validaciones de formulario
  - _Requirements: 6.2, 6.3_

- [ ] 12.3 Validación manual de funcionalidad completa
  - Verificar flujo de agregar dinosaurio
  - Verificar flujo de editar dinosaurio
  - Verificar flujo de eliminar dinosaurio
  - Verificar paginación y ordenamiento
  - Verificar responsividad en diferentes tamaños de pantalla
  - Verificar manejo de errores (detener JSON Server y probar)
  - _Requirements: 1.1-1.5, 2.1-2.5, 3.1-3.5, 4.1-4.5, 5.1-5.5_

- [ ] 13. Documentación y preparación para entrega
  - Crear README.md con instrucciones de instalación y ejecución
  - Documentar comandos para iniciar JSON Server y Angular
  - Incluir screenshots de la aplicación
  - Listar tecnologías y dependencias utilizadas
  - Agregar sección de características implementadas
  - _Requirements: 6.5_
