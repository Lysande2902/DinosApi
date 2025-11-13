# Requirements Document

## Introduction

Esta aplicación web permite gestionar un catálogo de dinosaurios mediante operaciones CRUD (Crear, Leer, Actualizar, Eliminar) consumiendo una API REST. La aplicación está construida con Angular 15+ y Angular Material, proporcionando una interfaz moderna y responsiva para visualizar, agregar, editar y eliminar registros de dinosaurios.

## Glossary

- **DinosaurApp**: La aplicación web Angular que gestiona el catálogo de dinosaurios
- **API REST**: Servicio backend que proporciona endpoints HTTP para operaciones CRUD sobre dinosaurios
- **HttpClient**: Servicio de Angular para realizar peticiones HTTP
- **Angular Material**: Biblioteca de componentes UI que sigue Material Design
- **Dinosaur Record**: Registro individual de un dinosaurio con sus propiedades (nombre, especie, período, dieta, etc.)
- **CRUD Operations**: Operaciones de Crear, Leer, Actualizar y Eliminar registros
- **MatDialog**: Componente de Angular Material para mostrar diálogos modales
- **MatTable**: Componente de Angular Material para mostrar datos en formato tabla
- **MatPaginator**: Componente de Angular Material para paginación de datos
- **MatSort**: Componente de Angular Material para ordenamiento de columnas

## Requirements

### Requirement 1

**User Story:** Como usuario, quiero ver una lista de todos los dinosaurios en formato tabla, para poder visualizar el catálogo completo de manera organizada.

#### Acceptance Criteria

1. WHEN the DinosaurApp loads, THE DinosaurApp SHALL retrieve all Dinosaur Records from the API REST using a GET request
2. THE DinosaurApp SHALL display Dinosaur Records in a MatTable with columns for name, species, period, diet, and actions
3. WHEN the API REST returns an error, THE DinosaurApp SHALL display an error message using MatSnackBar
4. THE DinosaurApp SHALL apply responsive design so the table adapts to different screen sizes
5. WHILE the data is loading from the API REST, THE DinosaurApp SHALL display a loading indicator

### Requirement 2

**User Story:** Como usuario, quiero agregar nuevos dinosaurios al catálogo, para poder expandir la base de datos con información adicional.

#### Acceptance Criteria

1. WHEN the user clicks the add button, THE DinosaurApp SHALL open a MatDialog with a form to input Dinosaur Record details
2. THE DinosaurApp SHALL validate all form fields using ReactiveFormsModule before submission
3. WHEN the user submits a valid form, THE DinosaurApp SHALL send a POST request to the API REST with the new Dinosaur Record
4. WHEN the API REST confirms successful creation, THE DinosaurApp SHALL close the dialog, refresh the table, and display a success message using MatSnackBar
5. IF the API REST returns an error during creation, THEN THE DinosaurApp SHALL display an error message and keep the dialog open

### Requirement 3

**User Story:** Como usuario, quiero editar la información de dinosaurios existentes, para poder corregir o actualizar datos incorrectos.

#### Acceptance Criteria

1. WHEN the user clicks the edit button for a Dinosaur Record, THE DinosaurApp SHALL open a MatDialog pre-populated with the current Dinosaur Record data
2. THE DinosaurApp SHALL validate all modified form fields using ReactiveFormsModule before submission
3. WHEN the user submits the edited form, THE DinosaurApp SHALL send a PUT request to the API REST with the updated Dinosaur Record
4. WHEN the API REST confirms successful update, THE DinosaurApp SHALL close the dialog, refresh the table, and display a success message using MatSnackBar
5. IF the API REST returns an error during update, THEN THE DinosaurApp SHALL display an error message and keep the dialog open

### Requirement 4

**User Story:** Como usuario, quiero eliminar dinosaurios del catálogo, para poder mantener la base de datos limpia y actualizada.

#### Acceptance Criteria

1. WHEN the user clicks the delete button for a Dinosaur Record, THE DinosaurApp SHALL display a confirmation dialog
2. WHEN the user confirms deletion, THE DinosaurApp SHALL send a DELETE request to the API REST for the specified Dinosaur Record
3. WHEN the API REST confirms successful deletion, THE DinosaurApp SHALL refresh the table and display a success message using MatSnackBar
4. IF the API REST returns an error during deletion, THEN THE DinosaurApp SHALL display an error message and keep the Dinosaur Record in the table
5. WHEN the user cancels the deletion, THE DinosaurApp SHALL close the confirmation dialog without making any changes

### Requirement 5

**User Story:** Como usuario, quiero paginar y ordenar la lista de dinosaurios, para poder navegar fácilmente por catálogos grandes y encontrar información específica.

#### Acceptance Criteria

1. THE DinosaurApp SHALL implement MatPaginator with configurable page sizes (5, 10, 25, 50 records per page)
2. THE DinosaurApp SHALL implement MatSort on all table columns to allow ascending and descending ordering
3. WHEN the user changes the page, THE DinosaurApp SHALL display the corresponding subset of Dinosaur Records
4. WHEN the user clicks a column header, THE DinosaurApp SHALL sort all Dinosaur Records by that column
5. THE DinosaurApp SHALL persist the current page number and sort state while performing CRUD operations

### Requirement 6

**User Story:** Como desarrollador, quiero una arquitectura modular y mantenible, para facilitar el desarrollo, testing y escalabilidad de la aplicación.

#### Acceptance Criteria

1. THE DinosaurApp SHALL implement a dedicated service using HttpClient for all API REST communications
2. THE DinosaurApp SHALL organize code into separate components for list view, form dialog, and confirmation dialog
3. THE DinosaurApp SHALL use ReactiveFormsModule for all form handling and validation
4. THE DinosaurApp SHALL implement proper error handling for all HTTP requests with user-friendly messages
5. THE DinosaurApp SHALL follow Angular style guide conventions for file structure, naming, and code organization

### Requirement 7

**User Story:** Como usuario, quiero una interfaz moderna y atractiva, para tener una experiencia de usuario agradable y profesional.

#### Acceptance Criteria

1. THE DinosaurApp SHALL use Angular Material components (MatTable, MatFormField, MatInput, MatButton, MatDialog, MatSnackBar) throughout the interface
2. THE DinosaurApp SHALL apply Material Design theming with consistent colors and typography
3. THE DinosaurApp SHALL implement responsive layout that works on desktop, tablet, and mobile devices
4. THE DinosaurApp SHALL provide visual feedback for all user actions (loading states, hover effects, button states)
5. THE DinosaurApp SHALL ensure proper spacing, alignment, and visual hierarchy following Material Design principles
