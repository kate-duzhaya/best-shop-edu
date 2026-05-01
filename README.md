## Setup & Installation

This project is powered by [Vite](https://vitejs.dev/) and utilizes TypeScript and SASS. The development environment has been streamlined so you can get everything up and running with just two commands.

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed on your machine. Required Node version is 22.9.0.

### 1. Install Dependencies

Once you have cloned the repository, navigate to the project root directory and install all necessary dependencies (including Vite, SASS, and TypeScript) by running:

```bash
npm install
```

### 2. Launch the project

To compile the assets and start the local developmnt server, run:

```bash
npm run dev
```

Running npm run dev starts the Vite development server. Vite automatically handles the SASS to CSS compilation and TypeScript transpilation. It also uses vite-plugin-html-inject to construct the final HTML.

The project implementation checklist is added to the project files. I've completed 63 out of 64 checklist points. I've not considered the "Compiled CSS files are placed in dist folder" point as a completed one because there is no dist folder when running the project by npm run dev. But it still appears after building the project.
