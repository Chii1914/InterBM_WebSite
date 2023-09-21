## Instalación de Paquetes

Para mejorar la funcionalidad y diseño de tu aplicación, es necesario instalar ciertos paquetes y bibliotecas. Ejecuta el siguiente comando en tu terminal:

```bash 
npm init react-app my-app
npm i react-router-dom @mui/material @emotion/react @emotion/styled @fontsource/roboto
npm install @mui/icons-material
````

## Configuración en index.js

Una vez instalados los paquetes, es necesario importar las fuentes que necesitas. Agrega las siguientes líneas al comienzo de tu archivo `index.js`:

```js
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

## Actualizar el archivo /public/index.html

Para garantizar una correcta visualización de las fuentes y los íconos de Material Design, es necesario añadir algunas etiquetas `<link>` en tu archivo `public/index.html`. Agrega las siguientes líneas dentro del `<head>` de tu documento HTML:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
```


## Organización del Proyecto
Para mantener nuestro proyecto React bien estructurado y escalable, vamos a dividir la aplicación en varias carpetas que se encargarán de diferentes aspectos.
### Carpeta `layout` 
Esta carpeta contendrá todos los componentes que actúan como contenedores para nuestras páginas. Estos layouts nos ayudarán a definir la estructura base de nuestras páginas, tales como cabeceras, pies de página, barras laterales, entre otros. De esta manera, podemos reutilizar estos componentes en diferentes páginas y mantener un diseño consistente en toda la aplicación. 
```bash
mkdir src/layout
```
Por ejemplo, puedes tener un archivo `MainLayout.js` dentro de la carpeta `layout` que define la estructura base con un encabezado y un pie de página que se utilizará en la mayoría de las páginas.

### Carpeta `routes`

La gestión de rutas es esencial para cualquier aplicación SPA (Single Page Application). Para mantener una organización clara de nuestras rutas, crearemos una carpeta `routes`. Aquí definiremos todos los caminos y componentes asociados que nuestra aplicación debe manejar. Usaremos `react-router-dom` para gestionar estas rutas.

```bash
mkdir src/routes
```
Dentro de esta carpeta, puedes tener un archivo `Router.js` que utiliza los componentes `BrowserRouter`, `Route` y `Switch` de `react-router-dom` para definir las diferentes rutas de tu aplicación.

Con esta estructura, tu proyecto estará bien organizado, facilitando la escalabilidad y el mantenimiento en el futuro. Además, al separar las responsabilidades en diferentes carpetas, otros desarrolladores podrán entender y trabajar en tu proyecto con mayor facilidad.

## Descripción del archivo `MainLayout.jsx`

Ubicado en la carpeta `src/layout`, el archivo `MainLayout.jsx` representa un componente fundamental de nuestra aplicación. Actúa como un contenedor principal, estableciendo reglas básicas para cargar la estructura y los componentes de la página.

```jsx
import { Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [loading, isLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      isLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Outlet />
        </>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}

export default MainLayout;

```

### Estructura del código:

1. **Importaciones**:
    - `Backdrop` y `CircularProgress` de `@mui/material`: Estos componentes son utilizados para mostrar una animación de carga mientras se espera que la aplicación esté lista.
    - `React`, `useEffect`, y `useState`: Se importan para manejar el estado y el ciclo de vida de nuestro componente.
    - `Outlet` de `react-router-dom`: Es un componente especial que renderiza el componente hijo de la ruta activa.

2. **Componente `MainLayout`**:
    - Se define un estado `loading` que determina si la aplicación está cargando o no.
    - El hook `useEffect` se utiliza para simular un tiempo de carga, donde después de 2 segundos, se establece el estado de `loading` en `false`.
    - Dentro del retorno del componente, se verifica el estado de `loading`. Si la aplicación no está cargando (`!loading`), se renderiza el componente `Outlet` que mostrará el contenido de la ruta actual.
    - En caso contrario, se muestra una animación de carga (`CircularProgress`) con un fondo (`Backdrop`) para indicar al usuario que la aplicación está cargando.

En futuras iteraciones de este archivo, podrías agregar componentes comunes que se compartan entre las diferentes páginas asociadas con este contenedor, como `Header`, `Menu`, `Footer`, entre otros. Estos componentes proporcionarán una estructura y diseño consistentes a lo largo de todas las páginas que utilicen `MainLayout` como su contenedor principal.

## Generamos primeras rutas en Single-page application (SPA)

Abordamos el proceso inicial de establecer rutas en nuestra aplicación de página única. Para lograr una navegación fluida y dinámica sin recargar la página completa, nos apoyamos en herramientas esenciales como `react-router` y `react-router-dom`. Estas bibliotecas nos permiten definir y gestionar diferentes rutas dentro de nuestra aplicación, canalizando así a los usuarios hacia distintos componentes y vistas con una experiencia de navegación ágil y sin interrupciones. Mediante la creación de un archivo de routing específico, centralizamos la gestión de estas rutas, garantizando una estructura organizada y fácil de mantener.

### Archivos previos

#### src/layouts/Loadable.js
Para mejorar la eficiencia de nuestra aplicación, es esencial que no carguemos todos los componentes inmediatamente al iniciar. En su lugar, podemos aprovechar la funcionalidad de carga perezosa (lazy loading) que React nos ofrece para cargar ciertos componentes solo cuando sean necesarios. Esto puede mejorar significativamente el tiempo de carga inicial y la eficiencia general de nuestra aplicación.
El archivo `Loadable.js` en nuestra carpeta `layouts` nos proporciona una función que envuelve un componente y le permite cargarse de manera perezosa. Veamos un desglose del archivo:
```jsx
import { Backdrop, CircularProgress } from '@mui/material';
import React, { Suspense } from 'react';
// ===========================|| LOADABLE - LAZY LOADING ||=========================== //
const Loadable = (Component) => (props) =>
  (
    <Suspense
      fallback={
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    >
      <Component {...props} />
    </Suspense>
  );
export default Loadable;
```
1.  **Importaciones**:
    
    -   `Backdrop` y `CircularProgress` de `@mui/material`: Estos componentes proporcionan una animación visual para informar al usuario que un contenido se está cargando.
    -   `React` y `Suspense`: Estos son cruciales para implementar la carga perezosa en React.
2.  **Función `Loadable`**:
    
    -   Esta función toma un componente (`Component`) como argumento y devuelve una versión "cargable" del mismo.
    -   Usando el componente `<Suspense>`, podemos definir qué mostrar mientras el componente está siendo cargado. En este caso, mostramos una animación de carga (`CircularProgress`) con un fondo (`Backdrop`).
    -   Una vez que el componente está listo para ser mostrado, se renderiza pasando todas las `props` que recibe.

Con el archivo `Loadable.js`, facilitamos la implementación de la carga perezosa en cualquier componente de nuestra aplicación. Solo necesitamos envolver el componente deseado con la función `Loadable` y React se encargará del resto.

#### src/components/PageContainer.js

El archivo `PageContainer.js` en nuestra carpeta `components` sirve como un contenedor general para las páginas de nuestra aplicación. Este componente tiene un propósito dual: gestionar metadatos de la página y proporcionar una estructura común para el contenido. Veamos un desglose de este archivo:

1.  **Importaciones**:
    
    -   `React`: Necesario para definir componentes en React.
    -   `PropTypes`: Una biblioteca que nos permite especificar y validar tipos para las props que pasamos a nuestros componentes, ayudando a garantizar que nuestra aplicación funcione como se espera.
    -   `Helmet` de `react-helmet`: Una herramienta útil para gestionar cambios en el `<head>` de nuestra aplicación, permitiendo actualizar dinámicamente títulos, metadatos y otros elementos del head. Para instalar el componente: 
 ```bash
npm i react-helmet
```
2.  **Componente `PageContainer`**:
    
    -   Recibe tres props: `title`, `description` y `children`.
    -   Dentro del componente, usamos `Helmet` para definir dinámicamente el título y la descripción de la página, basándonos en las props recibidas.
    -   El contenido principal (o hijos) del contenedor se renderiza después de `Helmet`, permitiendo que cualquier página o componente que use `PageContainer` incluya su propio contenido específico.
3.  **PropTypes**:
    
    -   `title` y `description`: Se espera que sean cadenas de texto. Estos representan el título y la descripción que se mostrarán en el head del documento.
    -   `children`: Representa los elementos hijos (o contenido) que se renderizarán dentro del contenedor. Se espera que sea un nodo.

**Archivo**:
```jsx
import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const PageContainer = ({ title, description, children }) => (
  <div>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </div>
);

PageContainer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default PageContainer;

```

El componente `PageContainer` es versátil y puede ser utilizado en múltiples lugares de nuestra aplicación para asegurar una consistencia en la gestión de metadatos y estructura.

#### src/pages/Error/404.jsx
Dentro de nuestra carpeta `pages`, el archivo `404.jsx` en el subdirectorio `Error` se encarga de presentar una página de error cuando los usuarios intentan acceder a una ruta inexistente en nuestra aplicación. Esta página proporciona una respuesta visual amigable para estas situaciones no deseadas, mejorando la experiencia general del usuario. 

```jsx
import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import PageContainer from "../../components/container/PageContainer";

const Error = () => (
  <PageContainer title="Error" description="Página de error">
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      textAlign="center"
      justifyContent="center"
      sx={{ backgroundColor: "#e4f5ff" }}
    >
      <Container maxWidth="md">
        <Typography align="center" variant="h1">
          404
        </Typography>
        <Typography align="center" variant="h4">
          This page could not be found.
        </Typography>
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to="/"
          disableElevation
        >
          Back to Home
        </Button>
      </Container>
    </Box>
  </PageContainer>
);

export default Error;
```

Desglosemos el archivo:

1.  **Importaciones**:
    
    -   `React`: Base para crear componentes.
    -   `Box`, `Container`, `Typography`, `Button` de `@mui/material`: Componentes de Material-UI para crear una UI estructurada y estilizada.
    -   `Link` de `react-router-dom`: Componente para la navegación entre páginas.
    -   `PageContainer` de `../../components/container/PageContainer`: Nuestro componente contenedor para páginas, que gestiona títulos y metadatos.
2.  **Componente `Error`**:
    
    -   Utiliza `PageContainer` para envolver el contenido, definiendo el título y la descripción para esta página de error.
    -   Dentro, un componente `Box` crea un contenedor flex que centra todo su contenido, proporcionando un fondo distintivo.
    -   Un `Container` de Material-UI limita el ancho del contenido.
    -   Las etiquetas `Typography` muestran un gran "404" y un mensaje descriptivo, indicando que la página solicitada no se encontró.
    -   Finalmente, un botón que redirige a los usuarios de regreso a la página principal (Home) proporciona una salida rápida y fácil de la página de error.
3.  **Exportación**:
    
    -   Exportamos el componente `Error` para poder usarlo en otros lugares de nuestra aplicación, especialmente dentro de nuestra configuración de rutas.

Esta página de error 404 es esencial para cualquier aplicación web, ya que ofrece una respuesta elegante y útil a los intentos de navegación a rutas desconocidas, evitando frustraciones y confusiones para el usuario.

#### src/pages/Home/Home.jsx
El archivo `Home.jsx` en el subdirectorio `Home` de nuestra carpeta `pages` sirve como la página principal o landing page de nuestra aplicación. Está diseñada para ser el punto de entrada de los usuarios y proporcionar una bienvenida visual al sitio. 

```jsx
import React from "react";
import PageContainer from "../../components/container/PageContainer";

function Home() {
  return (
    <PageContainer title="Pagina inicio" description="aaaaaaaaaaaaaaaaa">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <h1>Home</h1>
      </div>
    </PageContainer>
  );
}

export default Home;
```

A continuación, se hace un desglose de este archivo:

1.  **Importaciones**:
    
    -   `React`: Esencial para la creación de componentes en React.
    -   `PageContainer` de `../../components/container/PageContainer`: Es nuestro contenedor estándar para las páginas, que se encarga de gestionar títulos y metadatos.
2.  **Componente `Home`**:
    
    -   Envuelve su contenido en el `PageContainer`, definiendo un título y una descripción para la página de inicio. En este caso, el título es "Pagina inicio" y la descripción es "aaaaaaaaaaaaaaaaa" (puede que desees proporcionar una descripción más descriptiva en lugar de los 'a' repetidos).
    -   Dentro del contenedor, hay un `<div>` que utiliza estilos en línea para centrar su contenido tanto horizontal como verticalmente. Este estilo asegura que el `<h1>` con el texto "Home" se muestre en el centro de la pantalla, proporcionando una clara indicación de que el usuario está en la página principal.
3.  **Exportación**:
    
    -   Finalmente, exportamos el componente `Home` para que pueda ser incorporado en la estructura de rutas de nuestra aplicación y ser accesible para los usuarios.

El componente `Home` ofrece una sencilla página de inicio para los usuarios, pero su estructura permite fácilmente expandir y añadir más contenido conforme el proyecto crezca.

### Archivo de rutas `src/routes/Router.js`

Este archivo es fundamental para el funcionamiento de nuestra aplicación basada en React, ya que determina la estructura de navegación y cómo se mapean las rutas a los componentes específicos.

#### Descripción:

En `Router.js`, hemos definido las rutas y su estructura jerárquica utilizando la librería `react-router-dom`. Esta librería es la solución estándar para enrutamiento en aplicaciones React.

#### Usos:

1.  **Importaciones**:
    
    -   `React` y `lazy`: Usados para importar componentes de manera perezosa, lo que permite cargar el componente solo cuando es necesario.
    -   `Loadable`: Este es un HOC (Componente de Orden Superior) definido en `src/layouts/Loadable.js` que nos permite mostrar un indicador de carga mientras los componentes se están cargando.
    -   `Navigate`: De `react-router-dom`, es una utilidad para redirigir a otra ruta.
2.  **Definición de Layouts**:
    
    -   `FullLayout`: Es el diseño principal que se usa para envolver el contenido de la página.
3.  **Definición de Páginas**:
    
    -   `Error`: Página de error 404.
    -   `HomePage`: La página de inicio de la aplicación.
4.  **Definición de Rutas (`Router`)**:
    
    -   Definimos una ruta raíz (`/`) que utiliza `FullLayout`.
    -   Dentro de esta ruta, especificamos sus `children` que son las rutas hijas:
        -   Una ruta vacía (`""`) que lleva al `HomePage`.
        -   Una ruta `"*"` que maneja cualquier ruta desconocida y redirige al usuario a la página 404.
        -   Una ruta `"404"` que lleva directamente a la página de error 404.

#### Escalabilidad:

El diseño de este archivo permite una fácil escalabilidad. Si necesitas añadir más layouts, páginas o rutas, simplemente puedes seguir el patrón establecido. Por ejemplo, si tienes una sección de blog o perfil de usuario en el futuro, puedes importarlos y añadirlos en la sección correspondiente y luego especificar sus rutas dentro del objeto `Router`.

#### Librerías:

-   `react-router-dom`: Es una de las bibliotecas más populares y robustas para el enrutamiento en aplicaciones React. Nos permite crear rutas, redireccionar, navegar y mucho más. En este archivo, la utilizamos para definir nuestras rutas y la navegación.

### Habilitar el enrutamiento

 1. **Editar App.js**
Para integrar adecuadamente el sistema de rutas que hemos definido en `Router.js` en nuestra aplicación, es esencial hacer algunas modificaciones en el archivo principal `App.js`. En este archivo, empleamos el hook `useRoutes` de `react-router` para consumir la estructura de rutas definida anteriormente. El resultado de este hook, almacenado en la constante `routing`, contiene la representación React de la ruta actual, que luego renderizamos dentro de un fragmento de React (`<React.Fragment>`). Esta estructura garantiza que la aplicación mostrará el componente correcto según la ruta en la que se encuentre el usuario, proporcionando una navegación fluida y coherente en nuestra Single-page application (SPA).

```jsx
import React from "react";
import { useRoutes } from "react-router";
import Router from "./routes/Router";

function App() {
  const routing = useRoutes(Router);
  return (
    <React.Fragment>
      {routing}
    </React.Fragment>
  );
}
export default App;
```
 3. Editar Index.js
El archivo `index.js` sirve como punto de entrada a nuestra aplicación React. Aquí, la clave es el uso del componente `BrowserRouter` de `react-router-dom`.
`BrowserRouter` es un componente envolvente que maneja la funcionalidad del enrutamiento en aplicaciones web basadas en navegadores. Básicamente, se encarga de escuchar los cambios en la URL y de sincronizarlos con la interfaz de usuario de la aplicación. Al envolver nuestra aplicación (`<App />`) con `BrowserRouter`, estamos asegurando que cualquier componente hijo pueda tener acceso a la funcionalidad del enrutador, como la navegación, la recuperación de parámetros de la URL y más.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
```

### Resultados

 1. Ruta "/" referente al Home:
[![Home](https://i.gyazo.com/2af582cdd6b83c5b3c7b093cef05ca9d.png)](https://gyazo.com/2af582cdd6b83c5b3c7b093cef05ca9d)
 2. Ruta de error:
[![Image from Gyazo](https://i.gyazo.com/2888a1dd84d043e1ae1c31d113b1dbda.png)](https://gyazo.com/2888a1dd84d043e1ae1c31d113b1dbda)

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQ1NjA1MjU2OCwtMTQxMDIyNjUwMl19
-->