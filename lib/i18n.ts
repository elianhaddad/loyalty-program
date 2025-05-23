type Locale = "es" | "en";

type Translations = {
  [key in Locale]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  es: {
    // Auth
    "auth.login": "Iniciar Sesión",
    "auth.logout": "Cerrar Sesión",
    "auth.email": "Correo electrónico",
    "auth.password": "Contraseña",
    "auth.dni": "DNI",
    "auth.dni.placeholder": "Ingresa tu DNI",
    "auth.login.error": "Error al iniciar sesión",
    "auth.error.title": "Error de Autenticación",
    "auth.error.generic": "Ocurrió un error durante la autenticación.",
    "auth.error.credentialsSignin":
      "Correo o contraseña inválidos. Intenta de nuevo.",
    "auth.error.accessDenied": "No tienes permiso para acceder a este recurso.",
    "auth.error.unexpected":
      "Ocurrió un error inesperado. Por favor, intenta más tarde.",
    "auth.edit.user": "Editar Usuario",
    "auth.edit.add": "Añadir nuevo Usuario",
    "auth.edit.manage": "Usuarios",
    "auth.password.notmatch": "Passwords do not match",

    // User Form
    "userForm.name": "Nombre",
    "userForm.newPassword":
      "Nueva Contraseña (dejar en blanco para mantener actual)",
    "userForm.confirmPassword": "Confirmar Contraseña",
    "userForm.role": "Rol",
    "userForm.role.user": "Usuario",
    "userForm.role.admin": "Administrador",
    "userForm.button.cancel": "Cancelar",
    "userForm.button.create": "Crear Usuario",
    "userForm.button.update": "Actualizar Usuario",
    "userForm.error.generic": "Ocurrió un error",

    // Dashboard
    "dashboard.title": "Panel de Control",
    "dashboard.welcome": "Bienvenido",
    "dashboard.points": "Puntos",
    "dashboard.transactions": "Transacciones",
    "dashboard.redemptions": "Canjes",

    // Clients
    "clients.title": "Clientes",
    "clients.add": "Agregar Cliente",
    "clients.edit": "Editar Cliente",
    "clients.delete": "Eliminar Cliente",
    "clients.name": "Nombre",
    "clients.email": "Correo electrónico",
    "clients.phone": "Teléfono",
    "clients.dni": "DNI",
    "clients.points": "Puntos",
    "clients.search": "Buscar cliente",
    "clients.no_results": "No se encontraron resultados",
    "clients.details": "Detalles del Cliente",
    "clients.search.placeholder": "Buscar por nombre, DNI o teléfono...",
    "clients.fullName": "Nombre completo",
    "clients.actions": "Acciones",
    "clients.actions.view": "Ver Cliente",
    "clients.actions.edit": "Editar Cliente",
    "clients.since": "Cliente desde",

    "clients.whatsappSubscribed": "Suscribirse a mensajes de WhatsApp",
    "clients.phone.helper": "Incluir código de país (ej. +54 para Argentina)",

    "home.title": "Sistema de Gestión de Puntos",
    "home.menu.clients": "Clientes",
    "home.menu.purchases": "Compras",
    "home.menu.redemptions": "Canjes",
    "home.menu.configuration": "Configuración",

    // Transactions
    "transactions.title": "Transacciones",
    "transactions.add": "Agregar Transacción",
    "transactions.edit": "Editar Transacción",
    "transactions.delete": "Eliminar Transacción",
    "transactions.date": "Fecha",
    "transactions.amount": "Monto",
    "transactions.points": "Puntos",
    "transactions.client": "Cliente",
    "transactions.description": "Descripción",
    "transactions.type": "Tipo",
    "transactions.no_results": "No se encontraron resultados",

    // transaction-history
    "transactionHistory.placeholder": "Buscar transacciones...",
    "transactionHistory.noResults": "No se encontraron transacciones.",
    "transactionHistory.tableAriaLabel": "tabla de historial de transacciones",
    "transactionHistory.date": "Fecha",
    "transactionHistory.type": "Tipo",
    "transactionHistory.amount": "Monto (ARS)",
    "transactionHistory.points": "Puntos",
    "transactionHistory.details": "Detalles",
    "transactionHistory.purchase": "Compra",
    "transactionHistory.redemption": "Canje",
    "transactionHistory.noDetails": "-",

    // Redemptions
    "redemptions.title": "Canjes",
    "redemptions.add": "Agregar Canje",
    "redemptions.edit": "Editar Canje",
    "redemptions.delete": "Eliminar Canje",
    "redemptions.date": "Fecha",
    "redemptions.points": "Puntos",
    "redemptions.client": "Cliente",
    "redemptions.details": "Detalles",
    "redemptions.type": "Tipo de Canje",
    "redemptions.type.placeholder": "Seleccionar tipo de canje",
    "redemptions.no_results": "No se encontraron resultados",
    "redemptionOption.edit": "Editar Opción de Canje",
    "redemptionOptions.title": "Opciones de Canje",
    "redemptionOption.new": "Agregar Nueva Opción",
    "redemptionOption.points": "Puntos",
    "redemptionOption.active": "Activo",
    "redemptionOption.details": "Detalles",
    "redemptionOption.details.placeholder": "Describe la opción de canje...",
    "redemptionOption.button.create": "Crear Opción de Canje",
    "redemptionOption.button.update": "Actualizar Opción de Canje",
    "redemptionOptions.search": "Buscar por detalles o puntos...",
    "redemptionOptions.table.ariaLabel": "tabla de opciones de canje",
    "redemptionOptions.delete.confirm":
      "¿Estás seguro de que deseas eliminar esta opción de canje?",
    "common.actions": "Acciones",
    "redemptionForm.selectOption": "Seleccionar canje",

    // Configuration
    "config.title": "Configuración",
    "config.points": "Configuración de Puntos",
    "config.redemptions": "Configuración de Canjes",
    "config.pesos_per_point": "Pesos por Punto",
    "config.pesos_per_point.description":
      "Cantidad de pesos equivalentes a un punto",
    "config.redemption_name": "Nombre del Canje",
    "config.redemption_details": "Detalles del Canje",
    "config.redemption_points": "Puntos del Canje",
    "config.redemption_active": "Activo",

    "configurationForm.title": "Tasas de Conversión de Puntos",
    "configurationForm.description":
      "Define cuántos puntos gana un cliente por cada peso argentino gastado en los distintos días de la semana.",
    "configurationForm.label.conversionRate": "Puntos por ARS",
    "configurationForm.button.save": "Guardar Configuración",
    "configurationForm.success": "Configuración actualizada correctamente",
    "configurationForm.error.generic":
      "Ocurrió un error al actualizar la configuración",

    "configurationPage.title": "Configuración del Sistema",
    "configurationPage.card.points.title": "Configuración de Puntos",
    "configurationPage.card.points.description":
      "Define la tasa de conversión para cada día de la semana",
    "configurationPage.card.points.button": "Administrar tasas de puntos",
    "configurationPage.card.redemptions.title": "Opciones de Canje",
    "configurationPage.card.redemptions.description":
      "Gestionar las opciones de canje disponibles para los clientes",
    "configurationPage.card.redemptions.button": "Administrar Canjes",
    "configurationPage.card.messages.title": "Mensajes de WhatsApp",
    "configurationPage.card.messages.description":
      "Configurar mensajes programados y de difusión",
    "configurationPage.card.messages.button": "Administrar Mensajes",
    "configurationPage.heading.form": "Tasas de Conversión de Puntos",

    "configurationForm.days.monday": "Lunes",
    "configurationForm.days.tuesday": "Martes",
    "configurationForm.days.wednesday": "Miércoles",
    "configurationForm.days.thursday": "Jueves",
    "configurationForm.days.friday": "Viernes",
    "configurationForm.days.saturday": "Sábado",
    "configurationForm.days.sunday": "Domingo",

    "configurationForm.label.pesosPerPoint": "Pesos por Punto",

    // Common
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.delete": "Eliminar",
    "common.edit": "Editar",
    "common.add": "Agregar",
    "common.search": "Buscar",
    "common.filter": "Filtrar",
    "common.loading": "Cargando...",
    "common.error": "Error",
    "common.success": "Éxito",
    "common.confirm": "Confirmar",
    "common.back": "Volver",
    "common.next": "Siguiente",
    "common.submit": "Enviar",
    "common.processing": "Procesando...",

    "navbar.title": "Sistema de Puntos",
    "navbar.home": "Inicio",
    "navbar.clients": "Clientes",
    "navbar.purchases": "Compras",
    "navbar.redemptions": "Canjes",
    "navbar.configuration": "Configuración",
    "navbar.userManagement": "Gestión de Usuarios",
    "navbar.signedInAs": "Conectado como",
    "navbar.logout": "Cerrar Sesión",
    "navbar.login": "Iniciar Sesión",

    "purchasePage.title": "Registrar Compra",

    "purchaseForm.selectClient": "Seleccionar Cliente",
    "purchaseForm.amount": "Monto",
    "purchaseForm.date": "Fecha",
    "purchaseForm.detailsOptional": "Detalles (Opcional)",
    "purchaseForm.pointsRateFor": "Tasa de Puntos para",
    "purchaseForm.pointsToBeEarned": "Puntos a ganar",
    "purchaseForm.recordPurchase": "Registrar Compra",
    "purchaseForm.error.loadClients": "Error al cargar clientes",
    "purchaseForm.error.selectClient": "Por favor selecciona un cliente",
    "purchaseForm.error.invalidAmount": "Por favor ingresa un monto válido",

    "redemptions.record": "Registrar Canje de Puntos",

    "redemptionForm.selectClient": "Seleccionar Cliente",
    "redemptionForm.availablePoints": "Puntos Disponibles:",
    "redemptionForm.pointsToRedeem": "Puntos a Canjear",
    "common.date": "Fecha",
    "redemptionForm.details": "Detalles del Canje",
    "redemptionForm.details.placeholder":
      "Describe para qué el cliente está canjeando puntos...",
    "redemptionForm.record": "Registrar Canje",
    "redemptionForm.error.exceedsPoints": "Supera los puntos disponibles",

    "setupPage.title": "Configuración del Sistema",
    "setupPage.description":
      "Esta página inicializará tu Sistema de Gestión de Puntos creando un usuario administrador.",
    "setupPage.error.unexpected":
      "Ocurrió un error inesperado durante la configuración.",
    "setupPage.button.setup": "Iniciar Configuración",
    "setupPage.button.setup.progress": "Configurando...",
    "setupPage.button.login": "Ir a Iniciar Sesión",

    "scheduledMessage.edit.title": "Editar mensaje programado",
    "scheduledMessage.new.title": "Crear nuevo mensaje programado",
    "scheduledMessages.title": "Mensajes programados de WhatsApp",
    "scheduledMessages.form.name": "Nombre",
    "scheduledMessages.form.namePlaceholder": "Ingresa el nombre del mensaje",
    "scheduledMessages.form.content": "Contenido",
    "scheduledMessages.form.contentPlaceholder":
      "Ingresa el contenido del mensaje",
    "scheduledMessages.form.type": "Tipo de mensaje",
    "scheduledMessages.form.oneTime": "Una sola vez",
    "scheduledMessages.form.recurring": "Recurrente",
    "scheduledMessages.form.scheduledDate": "Fecha programada",
    "scheduledMessages.form.recurrencePattern": "Patrón de recurrencia",
    "scheduledMessages.form.daily": "Diario",
    "scheduledMessages.form.weekly": "Semanal",
    "scheduledMessages.form.monthly": "Mensual",
    "scheduledMessages.form.daysOfWeek": "Días de la semana",
    "scheduledMessages.form.active": "Activo",

    "scheduledMessages.list.searchPlaceholder":
      "Buscar por nombre o contenido del mensaje...",
    "scheduledMessages.list.tableAriaLabel": "tabla de mensajes programados",
    "scheduledMessages.list.column.name": "Nombre",
    "scheduledMessages.list.column.type": "Tipo",
    "scheduledMessages.list.column.schedule": "Programación",
    "scheduledMessages.list.column.lastRun": "Última ejecución",
    "scheduledMessages.list.column.active": "Activo",
    "scheduledMessages.list.column.actions": "Acciones",
    "scheduledMessages.list.oneTime": "Una sola vez",
    "scheduledMessages.list.recurring": "Recurrente",
    "scheduledMessages.list.daily": "Diario",
    "scheduledMessages.list.weekly": "Semanal en",
    "scheduledMessages.list.monthlyLabel": "Mensual (1er día)",
    "scheduledMessages.list.notScheduled": "No programado",
    "scheduledMessages.list.never": "Nunca",
    "scheduledMessages.list.deleteConfirm":
      "¿Estás seguro de que deseas eliminar este mensaje programado?",
    "scheduledMessages.list.viewEdit": "Ver/Editar mensaje",
    "scheduledMessages.list.delete": "Eliminar mensaje",
    "scheduledMessages.form.dayOfMonth": "Dia del mes",

    "scheduledMessages.days.monday": "Lunes",
    "scheduledMessages.days.tuesday": "Martes",
    "scheduledMessages.days.wednesday": "Miércoles",
    "scheduledMessages.days.thursday": "Jueves",
    "scheduledMessages.days.friday": "Viernes",
    "scheduledMessages.days.saturday": "Sábado",
    "scheduledMessages.days.sunday": "Domingo",

    "scheduledMessages.error.contentEmpty":
      "El contenido del mensaje no puede estar vacío",
    "scheduledMessages.error.dateInPast":
      "La fecha programada debe ser en el futuro",
    "scheduledMessages.error.noDaysSelected":
      "Por favor selecciona al menos un día de la semana",
    "scheduledMessages.error.generic": "Ocurrió un error",

    "scheduledMessages.error.load": "Error al cargar mensajes programados",

    "scheduledMessages.error": "Error al cargar mensajes",
    "scheduledMessages.noMessages": "No hay mensajes programados",
    "scheduledMessages.noNextRun": "No hay próxima ejecución",
    "scheduledMessages.form.timeOfDay": "Hora",
  },
  en: {
    // Auth
    "auth.login": "Login",
    "auth.logout": "Logout",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.dni": "ID Number",
    "auth.dni.placeholder": "Enter your ID number",
    "auth.login.error": "Login error",
    "auth.error.title": "Authentication Error",
    "auth.error.generic": "An error occurred during authentication.",
    "auth.error.credentialsSignin":
      "Invalid email or password. Please try again.",
    "auth.error.accessDenied":
      "You do not have permission to access this resource.",
    "auth.error.unexpected":
      "An unexpected error occurred. Please try again later.",
    "auth.edit.user": "Edit User",
    "auth.edit.add": "Add New User",
    "auth.edit.manage": "User Management",

    // User Form
    "userForm.name": "Name",
    "userForm.newPassword": "New Password (leave blank to keep current)",
    "userForm.confirmPassword": "Confirm Password",
    "userForm.role": "Role",
    "userForm.role.user": "User",
    "userForm.role.admin": "Admin",
    "userForm.button.cancel": "Cancel",
    "userForm.button.create": "Create User",
    "userForm.button.update": "Update User",
    "userForm.error.generic": "An error occurred",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.welcome": "Welcome",
    "dashboard.points": "Points",
    "dashboard.transactions": "Transactions",
    "dashboard.redemptions": "Redemptions",

    // Clients
    "clients.title": "Clients",
    "clients.add": "Add Client",
    "clients.edit": "Edit Client",
    "clients.delete": "Delete Client",
    "clients.name": "Name",
    "clients.email": "Email",
    "clients.phone": "Phone",
    "clients.dni": "ID Number",
    "clients.points": "Points",
    "clients.search": "Search client",
    "clients.no_results": "No results found",
    "clients.details": "Client Details",
    "clients.phone.helper": "Include country code (e.g., +54 for Argentina)",
    "clients.whatsappSubscribed": "Suscribirse a mensajes de WhatsApp",
    "clients.search.placeholder": "Search by name, ID number or phone...",
    "clients.fullName": "Full Name",
    "clients.actions": "Actions",
    "clients.actions.view": "View Client",
    "clients.actions.edit": "Edit Client",
    "clients.since": "Client since",

    "configurationForm.days.monday": "Monday",
    "configurationForm.days.tuesday": "Tuesday",
    "configurationForm.days.wednesday": "Wednesday",
    "configurationForm.days.thursday": "Thursday",
    "configurationForm.days.friday": "Friday",
    "configurationForm.days.saturday": "Saturday",
    "configurationForm.days.sunday": "Sunday",

    "home.title": "Points Management System",
    "home.menu.clients": "Clients",
    "home.menu.purchases": "Purchases",
    "home.menu.redemptions": "Redemptions",
    "home.menu.configuration": "Configuration",

    // Transactions
    "transactions.title": "Transactions",
    "transactions.add": "Add Transaction",
    "transactions.edit": "Edit Transaction",
    "transactions.delete": "Delete Transaction",
    "transactions.date": "Date",
    "transactions.amount": "Amount",
    "transactions.points": "Points",
    "transactions.client": "Client",
    "transactions.description": "Description",
    "transactions.type": "Type",
    "transactions.no_results": "No results found",

    // transaction-history (en)
    "transactionHistory.placeholder": "Search transactions...",
    "transactionHistory.noResults": "No transactions found.",
    "transactionHistory.tableAriaLabel": "transaction history table",
    "transactionHistory.date": "Date",
    "transactionHistory.type": "Type",
    "transactionHistory.amount": "Amount (ARS)",
    "transactionHistory.points": "Points",
    "transactionHistory.details": "Details",
    "transactionHistory.purchase": "Purchase",
    "transactionHistory.redemption": "Redemption",
    "transactionHistory.noDetails": "-",

    // Redemptions
    "redemptions.title": "Redemptions",
    "redemptions.add": "Add Redemption",
    "redemptions.edit": "Edit Redemption",
    "redemptions.delete": "Delete Redemption",
    "redemptions.date": "Date",
    "redemptions.points": "Points",
    "redemptions.client": "Client",
    "redemptions.details": "Details",
    "redemptions.type": "Redemption Type",
    "redemptions.type.placeholder": "Select redemption type",
    "redemptions.no_results": "No results found",
    "redemptionOption.edit": "Edit Redemption Option",
    "redemptions.record": "Record Points Redemption",
    "redemptionOptions.title": "Redemption Options",
    "redemptionOption.new": "Add New Option",
    "redemptionOption.points": "Points",
    "redemptionOption.active": "Active",
    "redemptionOption.details": "Details",
    "redemptionOption.details.placeholder": "Describe the redemption option...",
    "redemptionOption.button.create": "Create Redemption Option",
    "redemptionOption.button.update": "Update Redemption Option",
    "redemptionOptions.search": "Search by details or points...",
    "redemptionOptions.table.ariaLabel": "redemption options table",
    "redemptionOptions.delete.confirm":
      "Are you sure you want to delete this redemption option?",
    "common.actions": "Actions",

    // Configuration
    "config.title": "Configuration",
    "config.points": "Points Configuration",
    "config.redemptions": "Redemptions Configuration",
    "config.pesos_per_point": "Pesos per Point",
    "config.pesos_per_point.description":
      "Amount of pesos equivalent to one point",
    "config.redemption_name": "Redemption Name",
    "config.redemption_details": "Redemption Details",
    "config.redemption_points": "Redemption Points",
    "config.redemption_active": "Active",

    "configurationForm.title": "Points Conversion Rates",
    "configurationForm.description":
      "Set how many points a client earns for each Argentine Peso spent on different days of the week.",
    "configurationForm.label.conversionRate": "Points per ARS",
    "configurationForm.button.save": "Save Configuration",
    "configurationForm.success": "Configuration updated successfully",
    "configurationForm.error.generic":
      "An error occurred while updating the configuration",

    "configurationPage.title": "System Configuration",
    "configurationPage.card.points.title": "Points Configuration",
    "configurationPage.card.points.description":
      "Set the conversion rate for each day of the week",
    "configurationPage.card.points.button": "Manage Points Rates",
    "configurationPage.card.redemptions.title": "Redemption Options",
    "configurationPage.card.redemptions.description":
      "Manage available redemption options for clients",
    "configurationPage.card.redemptions.button": "Manage Redemptions",
    "configurationPage.card.messages.title": "WhatsApp Messages",
    "configurationPage.card.messages.description":
      "Configure scheduled and broadcast messages",
    "configurationPage.card.messages.button": "Manage Messages",
    "configurationPage.heading.form": "Points Conversion Rates",

    "configurationForm.label.pesosPerPoint": "Pesos per Point",

    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.add": "Add",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.confirm": "Confirm",
    "common.back": "Back",
    "common.next": "Next",
    "common.submit": "Submit",
    "common.processing": "Processing...",

    "navbar.title": "Points System",
    "navbar.home": "Home",
    "navbar.clients": "Clients",
    "navbar.purchases": "Purchases",
    "navbar.redemptions": "Redemptions",
    "navbar.configuration": "Configuration",
    "navbar.userManagement": "User Management",
    "navbar.signedInAs": "Signed in as",
    "navbar.logout": "Logout",
    "navbar.login": "Login",

    "purchasePage.title": "Record Purchase",
    "purchaseForm.selectClient": "Select Client",
    "purchaseForm.amount": "Amount",
    "purchaseForm.date": "Date",
    "purchaseForm.detailsOptional": "Details (Optional)",
    "purchaseForm.pointsRateFor": "Points Rate for",
    "purchaseForm.pointsToBeEarned": "Points to be earned",
    "purchaseForm.recordPurchase": "Record Purchase",
    "purchaseForm.error.loadClients": "Failed to load clients",
    "purchaseForm.error.selectClient": "Please select a client",
    "purchaseForm.error.invalidAmount": "Please enter a valid amount",

    "redemptionForm.selectClient": "Select Client",
    "redemptionForm.availablePoints": "Available Points:",
    "redemptionForm.pointsToRedeem": "Points to Redeem",
    "common.date": "Date",
    "redemptionForm.details": "Redemption Details",
    "redemptionForm.details.placeholder":
      "Describe what the client is redeeming points for...",
    "redemptionForm.record": "Record Redemption",
    "redemptionForm.error.exceedsPoints": "Exceeds available points",

    "redemptionForm.selectOption": "Select option",

    "setupPage.title": "System Setup",
    "setupPage.description":
      "This page will initialize your Points Management System by creating an admin user.",
    "setupPage.error.unexpected": "An unexpected error occurred during setup.",
    "setupPage.button.setup": "Initialize System",
    "setupPage.button.setup.progress": "Setting Up...",
    "setupPage.button.login": "Go to Login",

    "scheduledMessage.edit.title": "Edit Scheduled Message",
    "scheduledMessage.new.title": "Create New Scheduled Message",
    "scheduledMessages.title": "WhatsApp Scheduled Messages",
    "scheduledMessages.form.name": "Name",
    "scheduledMessages.form.namePlaceholder": "Enter message name",
    "scheduledMessages.form.content": "Content",
    "scheduledMessages.form.contentPlaceholder": "Enter message content",
    "scheduledMessages.form.type": "Message type",
    "scheduledMessages.form.oneTime": "One-time",
    "scheduledMessages.form.recurring": "Recurring",
    "scheduledMessages.form.scheduledDate": "Scheduled date",
    "scheduledMessages.form.recurrencePattern": "Recurrence pattern",
    "scheduledMessages.form.daily": "Daily",
    "scheduledMessages.form.weekly": "Weekly",
    "scheduledMessages.form.monthly": "Monthly",
    "scheduledMessages.form.daysOfWeek": "Days of week",
    "scheduledMessages.form.active": "Active",

    "scheduledMessages.list.searchPlaceholder":
      "Search by name or message content...",
    "scheduledMessages.list.tableAriaLabel": "scheduled messages table",
    "scheduledMessages.list.column.name": "Name",
    "scheduledMessages.list.column.type": "Type",
    "scheduledMessages.list.column.schedule": "Schedule",
    "scheduledMessages.list.column.lastRun": "Last Run",
    "scheduledMessages.list.column.active": "Active",
    "scheduledMessages.list.column.actions": "Actions",
    "scheduledMessages.list.oneTime": "One-time",
    "scheduledMessages.list.recurring": "Recurring",
    "scheduledMessages.list.daily": "Daily",
    "scheduledMessages.list.weekly": "Weekly on",
    "scheduledMessages.list.monthlyLabel": "Monthly (1st day)",
    "scheduledMessages.list.notScheduled": "Not scheduled",
    "scheduledMessages.list.never": "Never",
    "scheduledMessages.list.deleteConfirm":
      "Are you sure you want to delete this scheduled message?",
    "scheduledMessages.list.viewEdit": "View/Edit message",
    "scheduledMessages.list.delete": "Delete message",

    "scheduledMessages.days.monday": "Monday",
    "scheduledMessages.days.tuesday": "Tuesday",
    "scheduledMessages.days.wednesday": "Wednesday",
    "scheduledMessages.days.thursday": "Thursday",
    "scheduledMessages.days.friday": "Friday",
    "scheduledMessages.days.saturday": "Saturday",
    "scheduledMessages.days.sunday": "Sunday",

    "scheduledMessages.error.contentEmpty": "Message content cannot be empty",
    "scheduledMessages.error.dateInPast":
      "Scheduled date must be in the future",
    "scheduledMessages.error.noDaysSelected":
      "Please select at least one day of the week",
    "scheduledMessages.error.generic": "An error occurred",

    "scheduledMessages.error.load": "Failed to load scheduled messages",

    "scheduledMessages.error": "Error loading messages",
    "scheduledMessages.noMessages": "No scheduled messages",
    "scheduledMessages.noNextRun": "No upcoming run",
    "scheduledMessages.form.timeOfDay": "Time",
    "scheduledMessages.form.dayOfMonth": "Day of month",
  },
};

// Default locale
let currentLocale: Locale = "es";

export function setLocale(locale: Locale) {
  currentLocale = locale;
}

export function getLocale(): Locale {
  return currentLocale;
}

export function t(key: string): string {
  return translations[currentLocale][key] || key;
}
