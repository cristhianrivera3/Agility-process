# Tech Agency - Agencia de Soluciones Tecnológicas

## 🚀 Descripción del Proyecto

Este proyecto es una **agencia de soluciones tecnológicas** completa, transformada desde una tienda de ropa tradicional. Ofrece servicios de:

- 🌐 Desarrollo Web
- 🔒 Ciberseguridad
- 📈 Marketing Digital
- 🎨 Diseño UI/UX
- 💼 Consultoría TI
- 📱 Desarrollo Móvil
- ☁️ Cloud & DevOps
- 📊 Data Analytics

## 📁 Estructura del Proyecto

```
pagina-weeb/
├── backend/                    # Backend Node.js/Express API
│   ├── src/
│   │   ├── config/            # Configuración (DB, Cloudinary, etc.)
│   │   ├── controllers/       # Lógica de negocio
│   │   ├── middleware/        # Middleware (auth, errorHandler, etc.)
│   │   ├── models/            # Modelos MongoDB
│   │   │   ├── Service.js     # Modelo de Servicios
│   │   │   ├── Portfolio.js   # Modelo de Portafolio
│   │   │   ├── Contact.js     # Modelo de Contacto
│   │   │   ├── User.js        # Modelo de Usuario (legacy)
│   │   │   └── ...
│   │   ├── routes/            # Rutas API
│   │   │   ├── serviceRoutes.js    # Rutas de Servicios
│   │   │   ├── portfolioRoutes.js  # Rutas de Portafolio
│   │   │   ├── contactRoutes.js    # Rutas de Contacto
│   │   │   └── ...
│   │   ├── services/          # Servicios reutilizables
│   │   ├── utils/             # Utilidades y helpers
│   │   └── server.js          # Punto de entrada principal
│   ├── .env.example           # Ejemplo de variables de entorno
│   ├── package.json
│   └── .gitignore
│
├── frontend/                   # Frontend React (en desarrollo)
│   └── (próximamente con Vite + React)
│
└── README.md                  # Este archivo
```

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **Helmet** - Seguridad HTTP
- **CORS** - Cross-Origin Resource Sharing
- **express-validator** - Validación de datos
- **nodemailer** - Envío de emails

### Frontend (Próximamente)
- **React** - Biblioteca UI
- **Vite** - Build tool moderno
- **React Router** - Navegación SPA
- **Axios** - Cliente HTTP

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js >= 18.0.0
- MongoDB (local o MongoDB Atlas)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd pagina-weeb
```

2. **Instalar dependencias del backend**
```bash
cd backend
npm install
```

3. **Configurar variables de entorno**
```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env con tus credenciales
# - MONGODB_URI: URL de conexión a MongoDB
# - JWT_SECRET: Secreto para JWT
# - EMAIL_*: Credenciales de email
# - CLOUDINARY_*: Credenciales de Cloudinary (opcional)
```

4. **Iniciar el servidor en modo desarrollo**
```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:5000`

## 📡 API Endpoints

### Servicios
- `GET /api/services` - Listar servicios
- `GET /api/services/:slug` - Obtener servicio por slug
- `POST /api/services` - Crear servicio (admin)
- `PUT /api/services/:id` - Actualizar servicio (admin)
- `DELETE /api/services/:id` - Eliminar servicio (admin)

### Portafolio
- `GET /api/portfolio` - Listar proyectos
- `GET /api/portfolio/:slug` - Obtener proyecto por slug
- `POST /api/portfolio` - Crear proyecto (admin)
- `PUT /api/portfolio/:id` - Actualizar proyecto (admin)
- `DELETE /api/portfolio/:id` - Eliminar proyecto (admin)

### Contacto
- `GET /api/contact` - Listar contactos (admin)
- `GET /api/contact/stats` - Estadísticas de contactos (admin)
- `POST /api/contact` - Enviar mensaje de contacto (público)
- `PUT /api/contact/:id` - Actualizar contacto (admin)
- `DELETE /api/contact/:id` - Eliminar contacto (admin)

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión

## 📚 Modelos de Datos

### Service (Servicios)
- name, slug, description, category
- price, priceType
- features, technologies
- available, featured, order
- stats (views, inquiries, conversions)

### Portfolio (Proyectos)
- title, slug, description
- client, industry, projectType
- featuredImage, gallery
- technologies, liveUrl, repoUrl
- testimonial, results
- published, featured

### Contact (Contactos)
- name, email, phone, company
- subject, serviceType, message
- budget, budgetRange, source
- status, priority
- internalNotes, attachments

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para autenticación. Para acceder a endpoints protegidos:

1. Registra un usuario o inicia sesión
2. Recibe el token JWT
3. Incluye el token en el header: `Authorization: Bearer <token>`

## 🎯 Próximos Pasos

- [ ] Configurar frontend con React + Vite
- [ ] Crear componentes React reutilizables
- [ ] Implementar routing en frontend
- [ ] Conectar frontend con backend
- [ ] Agregar SEO optimizado
- [ ] Configurar analytics
- [ ] Implementar deploy en producción

## 📖 Aprendizaje

Este proyecto está diseñado para aprender:
- Arquitectura full stack moderna
- API RESTful con Express
- Modelado de datos con MongoDB
- Autenticación y seguridad
- Estructura de proyectos profesionales
- Migración de legacy a moderno

## 🤝 Contribuciones

Si deseas contribuir, por favor:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Crea un Pull Request

## 📄 Licencia

Este proyecto es para fines educativos y de portafolio.

## 👨‍💻 Autor

Desarrollado como proyecto de aprendizaje y portafolio para una agencia de soluciones tecnológicas.

---

**¡Gracias por tu interés en este proyecto!** 🚀