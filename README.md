# SauceDemo - Pruebas automatizadas E2E

Suite de pruebas automatizadas end-to-end para [SauceDemo](https://www.saucedemo.com/), desarrollada con **Playwright Test** y **TypeScript**. El proyecto valida los flujos principales de autenticación, navegación del inventario, filtrado de productos, carrito de compras y checkout.

Las pruebas utilizan el patrón **Page Object Model (POM)** para separar:

- La lógica de negocio de cada escenario.
- Los localizadores y acciones de la interfaz.
- Los datos reutilizables de prueba.
- La configuración de ejecución y los reportes.

## Objetivos

El proyecto busca comprobar automáticamente que:

- Un usuario válido puede iniciar sesión.
- Un usuario puede cerrar sesión correctamente.
- Un usuario bloqueado recibe el mensaje esperado.
- Los formularios de login validan campos obligatorios.
- Los productos pueden ordenarse por nombre y precio.
- Los productos pueden agregarse al carrito.
- El flujo completo de compra finaliza correctamente.
- Los escenarios se comportan de forma consistente en varios navegadores.

## Tecnologías

| Tecnología | Uso |
| --- | --- |
| [Node.js](https://nodejs.org/) | Entorno de ejecución |
| [TypeScript](https://www.typescriptlang.org/) | Lenguaje de los tests y Page Objects |
| [Playwright Test](https://playwright.dev/) | Automatización E2E, assertions, fixtures y reportes |
| npm | Gestión de dependencias y scripts |
| GitHub Actions | Ejecución continua en cada push y pull request |
| GitHub Pages | Publicación del reporte HTML generado por Playwright |

La versión instalada de `@playwright/test` queda fijada en el `package-lock.json`. El paquete requiere Node.js 20 o superior.

## Requisitos previos

- Node.js 20 o una versión LTS posterior.
- npm, incluido normalmente con Node.js.
- Acceso a Internet para visitar `https://www.saucedemo.com/`.
- Navegadores de Playwright instalados localmente.

Para comprobar las versiones instaladas:

```bash
node --version
npm --version
```

## Instalación

1. Clona el repositorio y entra en su directorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd SauceDemo_Pruebas_Automatizadas
   ```

2. Instala las dependencias exactas del lockfile:

   ```bash
   npm ci
   ```

3. Instala los navegadores administrados por Playwright:

   ```bash
   npx playwright install
   ```

   En Linux o en un entorno CI, instala también las dependencias del sistema:

   ```bash
   npx playwright install --with-deps
   ```

## Ejecución de las pruebas

### Ejecutar toda la suite

```bash
npm test
```

La configuración ejecuta los tests definidos en `tests/` en los tres proyectos de navegador habilitados:

- Chromium.
- Firefox.
- WebKit.

Con 11 casos definidos, la ejecución completa realiza 33 ejecuciones de test, una por cada combinación de caso y navegador.

### Ejecutar con el navegador visible

Útil para observar paso a paso la interacción con SauceDemo:

```bash
npm run test:headed
```

### Ejecutar únicamente en Chromium

```bash
npm run test:chromium
```

### Ejecutar una suite o archivo concreto

```bash
npx playwright test tests/TC01-LoginExitoso.spec.ts
npx playwright test tests/TC02-LoginError.spec.ts
npx playwright test tests/TC03-Checkout.spec.ts
npx playwright test tests/TC04-Filtros.spec.ts
```

### Ejecutar un caso por su nombre

```bash
npx playwright test -g "Login Exitoso"
```

También es posible combinar el filtro con un navegador:

```bash
npx playwright test tests/TC03-Checkout.spec.ts --project=chromium
```

## Reportes y evidencias

El reporter configurado es el reporter HTML de Playwright. Después de una ejecución, abre el reporte con:

```bash
npm run test:report
```

Los resultados se generan en:

- `playwright-report/`: reporte HTML navegable.
- `test-results/`: resultados, trazas y evidencias asociadas a la ejecución.

En caso de reintento, la configuración conserva la traza del primer intento fallido mediante `trace: 'on-first-retry'`. Para abrir una traza disponible:

```bash
npx playwright show-trace test-results/<directorio-de-la-traza>/trace.zip
```

Los directorios de resultados y artefactos están excluidos de Git mediante `.gitignore`.

## Estructura del proyecto

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml       # Pipeline de pruebas y publicación del reporte
├── data/
│   └── testData.ts              # Usuarios y datos del checkout
├── fixtures/
│   └── page.ts                  # Fixture tipada con los Page Objects
├── pages/
│   ├── BasePage.ts              # Funcionalidad común de las páginas
│   ├── LoginPage.ts             # Página y acciones de autenticación
│   ├── InventoryPage.ts         # Inventario, filtros, carrito y logout
│   ├── CartPage.ts              # Carrito y compatibilidad con acciones de checkout
│   └── CheckoutPage.ts          # Formulario y finalización de compra
├── tests/
│   ├── TC01-LoginExitoso.spec.ts
│   ├── TC02-LoginError.spec.ts
│   ├── TC03-Checkout.spec.ts
│   └── TC04-Filtros.spec.ts
├── playwright.config.ts         # Configuración global de Playwright
├── tsconfig.json                # Configuración del compilador TypeScript
├── package.json                 # Scripts y dependencias
├── package-lock.json            # Versiones reproducibles
└── .gitignore
```

## Suites y cobertura funcional

### TC01 - Login exitoso

Archivo: `tests/TC01-LoginExitoso.spec.ts`

- Comprueba el acceso con `standard_user`.
- Verifica que se muestre la pantalla de inventario.
- Comprueba el cierre de sesión y el regreso a la pantalla de login.

### TC02 - Errores de login

Archivo: `tests/TC02-LoginError.spec.ts`

Valida los mensajes esperados para:

- Usuario bloqueado (`locked_out_user`).
- Usuario y contraseña vacíos.
- Usuario vacío.
- Contraseña vacía.

### TC03 - Checkout

Archivo: `tests/TC03-Checkout.spec.ts`

Ejecuta el flujo completo:

1. Iniciar sesión.
2. Agregar todos los productos al carrito.
3. Verificar que el carrito contenga seis elementos.
4. Ir al checkout.
5. Completar nombre, apellido y código postal.
6. Finalizar la orden.
7. Verificar el mensaje `Thank you for your order!`.

### TC04 - Filtros

Archivo: `tests/TC04-Filtros.spec.ts`

Comprueba que el inventario se ordene correctamente:

- Nombre de Z a A (`za`).
- Precio de menor a mayor (`lohi`).
- Precio de mayor a menor (`hilo`).
- Nombre de A a Z (`az`).

## Usuarios y datos de prueba

Los datos están centralizados en [`data/testData.ts`](./data/testData.ts):

| Usuario | Contraseña | Propósito |
| --- | --- | --- |
| `standard_user` | `secret_sauce` | Login y flujos exitosos |
| `locked_out_user` | `secret_sauce` | Validación de usuario bloqueado |

Datos usados para el checkout:

| Campo | Valor |
| --- | --- |
| Nombre | `Juan` |
| Apellido | `Perez` |
| Código postal | `10001` |

Estos son usuarios de demostración proporcionados por SauceDemo. No deben sustituirse por credenciales reales ni por secretos de producción.

## Arquitectura de pruebas

### Page Object Model

Cada Page Object encapsula localizadores y acciones de una sección de la aplicación:

- `BasePage` contiene el acceso común al objeto `Page` y la navegación.
- `LoginPage` gestiona login, errores y logout.
- `InventoryPage` gestiona productos, filtros y carrito.
- `CartPage` gestiona el contenido del carrito.
- `CheckoutPage` gestiona la información del comprador y la finalización de la orden.

Los tests importan `test` y `expect` desde `fixtures/page.ts`. La fixture crea automáticamente los Page Objects para cada test, manteniendo los escenarios legibles y aislados.

### Configuración de Playwright

[`playwright.config.ts`](./playwright.config.ts) define:

- Directorio de pruebas: `tests/`.
- Ejecución paralela de archivos.
- `baseURL`: `https://www.saucedemo.com/`.
- Reporter HTML.
- Trazas en el primer reintento.
- Tres proyectos: Chromium, Firefox y WebKit.
- Dos reintentos en CI.
- Un worker en CI para reducir interferencias entre ejecuciones.
- Protección contra `test.only` cuando la variable `CI` está activa.

No se utiliza un servidor local: las pruebas acceden directamente al sitio público de SauceDemo.

## Integración continua

El workflow [`playwright.yml`](./.github/workflows/playwright.yml) se ejecuta en:

- Push a `main` o `master`.
- Pull requests hacia `main` o `master`.

El pipeline:

1. Descarga el código.
2. Configura Node.js LTS.
3. Instala dependencias con `npm ci`.
4. Instala Playwright y sus dependencias del sistema.
5. Ejecuta la suite completa.
6. Sube `playwright-report/` como artefacto durante 30 días.
7. Publica el reporte en GitHub Pages, incluso si alguna prueba falla, para facilitar el diagnóstico.

Para que la publicación funcione, el repositorio debe tener GitHub Pages habilitado y el entorno `github-pages` disponible en la configuración de Actions.

## Solución de problemas

### No se encuentra un navegador de Playwright

Instala los navegadores nuevamente:

```bash
npx playwright install
```

En Linux:

```bash
npx playwright install --with-deps
```

### El test no puede abrir SauceDemo

Comprueba:

- Que exista conexión a Internet.
- Que `https://www.saucedemo.com/` esté disponible.
- Que un proxy, VPN o firewall no bloquee el acceso.

### El reporte no se abre

Genera una ejecución antes de abrirlo:

```bash
npm test
npm run test:report
```

### Una prueba funciona localmente pero falla en CI

Revisa primero el reporte y la traza del reintento. El pipeline utiliza reintentos automáticos en CI y ejecuta con un solo worker. También conviene validar que el fallo no sea causado por indisponibilidad temporal del sitio público o por cambios en sus localizadores.

## Buenas prácticas para contribuir

1. Mantén los localizadores y acciones dentro de los Page Objects.
2. Reutiliza los datos de `data/testData.ts` en lugar de duplicarlos.
3. Usa assertions explícitas con `expect`.
4. Asigna nombres descriptivos a los tests y conserva la nomenclatura `TCxx`.
5. Ejecuta al menos el archivo modificado antes de abrir un pull request.
6. Ejecuta `npm test` antes de integrar cambios que afecten fixtures, configuración o Page Objects.
7. No agregues `node_modules/`, reportes ni credenciales al repositorio.

## Licencia

El proyecto declara la licencia `ISC` en `package.json`. SauceDemo es un sitio de demostración externo; consulta sus términos y condiciones para cualquier uso fuera de pruebas educativas o de automatización autorizada.
