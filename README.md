# Simple Blog

This is a simple blog project built using Vue.js and TypeScript. It utilizes various dependencies to enhance its functionality.

## Installation

To run this project locally, make sure you have [Node.js](https://nodejs.org) installed on your system. Then, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/parsajiravand/simple-blog.git
   ```

2. Navigate to the project's root directory:

   ```bash
   cd simple-blog
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

Once you have installed the dependencies, you can use the following scripts to interact with the project:

- `npm run dev`: Starts the development server using [Vite](https://vitejs.dev).
- `npm run build`: Builds the project for production.
- `npm run preview`: Serves the production build locally for preview.

## Dependencies

The project has the following dependencies:

- [axios](https://github.com/axios/axios): A promise-based HTTP client for the browser and Node.js.
- [dotenv](https://github.com/motdotla/dotenv): Loads environment variables from a `.env` file.
- [lodash](https://lodash.com): A utility library delivering modularity, performance, and extra features.
- [pinia](https://pinia.esm.dev): A Vue.js state management system.
- [vue](https://vuejs.org): A progressive JavaScript framework for building user interfaces.
- [vue-router](https://router.vuejs.org): The official router for Vue.js.

## Development Dependencies

The project has the following development dependencies:

- [@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue): A Vite plugin for Vue 3.
- [autoprefixer](https://github.com/postcss/autoprefixer): A plugin to parse CSS and add vendor prefixes automatically.
- [postcss](https://postcss.org): A tool for transforming CSS with JavaScript.
- [sass](https://sass-lang.com): A mature, stable, and powerful professional-grade CSS extension language.
- [sass-loader](https://github.com/webpack-contrib/sass-loader): Loads a Sass/SCSS file and compiles it to CSS.
- [tailwindcss](https://tailwindcss.com): A highly customizable, low-level CSS framework.
- [typescript](https://www.typescriptlang.org): A typed superset of JavaScript that compiles to plain JavaScript.
- [vite](https://vitejs.dev): A fast development server and build tool for modern web applications.
- [vue-tsc](https://github.com/johnsoncodehk/vue-tsc): A TypeScript compiler for Vue Single File Components.

# Server

This is the server component of the Kubes Task project. It provides mock API endpoints for posts and user data using JSON Server and Faker.

## Installation

To run the server locally, make sure you have [Node.js](https://nodejs.org) installed on your system. Then, follow these steps:

1. Navigate to the server folder:

   ```bash
   cd server
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run on local machine:

   ```bash
   npm run start
   ```

## Usage

Once you have installed the dependencies, you can use the following scripts to interact with the server:

- `npm start`: Starts the server using [JSON Server](https://github.com/typicode/json-server).
- `npm run dev`: Starts the server using [Nodemon](https://nodemon.io) for development, which automatically restarts the server when changes are detected.

## API Endpoints

The server exposes the following API endpoints:

- `/posts`: Provides a CRUD API for managing blog posts.
- `/users`: Provides a CRUD API for managing user data.

The data served by these endpoints is dynamically generated using [Faker](https://github.com/Marak/Faker.js) to create realistic mock data.

## Dependencies

The server has the following dependencies:

- [json-server](https://github.com/typicode/json-server): A full fake REST API server implemented with JSON.
- [faker](https://github.com/Marak/Faker.js): A library for generating realistic mock data.

## License

This server component is licensed under the [ISC License](LICENSE).
