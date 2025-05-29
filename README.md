# Cortexre Home Assignment

This project consists of a full-stack application divided into two main parts:

- **Backend (Firebase Functions)**: Contains API endpoints implemented using Express and deployed as Firebase Cloud Functions.
- **Frontend (React + Vite + MUI)**: A React-based user interface using Material-UI and Vite for rapid development.

---

## 🔧 Project Structure

```txt
cortexre home assignment/
├── functions/         # Backend (Firebase Functions)
│   ├── src/
│   │   ├── index.ts           # Main API entry
│   │   ├── traffic/           # Traffic feature API logic
│   │   ├── types.ts           # Shared TypeScript types
│   │   └── ...
├── frontend/          # Frontend (React)
│   ├── app/
│   │   ├── root.tsx           # Root layout and routing
│   │   ├── config.ts          # API configuration
│   │   ├── routes.ts          # React Router paths
│   │   └── ...
```

---

## 🚀 Getting Started

### Backend (Firebase Functions)

1. Navigate to the backend folder:

   ```bash
   cd functions
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. To emulate locally:

   ```bash
   npm run serve
   ```

4. To deploy:

   ```bash
   firebase deploy --only functions
   ```

---

## Frontend (React)

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a local environment file:

   ```bash
   cp .env.example .env
   ```

   ### 🔐 Environment Variables

   The frontend uses the following environment variables. Add them to `.env.example`:

   ```bash
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   VITE_FIREBASE_MEASUREMENT_ID=
   ```

   Fill in your Firebase project details in the `.env` file before running the frontend.

   ---

4. Start the development server:

   ```bash
   npm run dev
   ```

## ✏️ Editor Access Control

Certain routes and actions in the backend are protected and require **editor-level access**. Only users whose email addresses are listed in the `editors.txt` file will be allowed to perform these protected operations (e.g., creating, updating, or deleting resources).

### 📄 File Location

The list of authorized editor emails is stored in:

```txt
functions/editors.txt
```

Each line should contain one email address:

```txt
nivdoron1234@gmail.com
editor2@example.com
admin@example.com
```

### ✅ Adding an Editor

To allow a user to access protected routes:

1. Open the `editors.txt` file located in the `functions/` directory.
2. Add the user's email on a **new line**.
3. Save the file.
4. If you're running locally, restart the server to apply the change.
5. If you're deploying, redeploy the functions using:

```bash
firebase deploy --only functions
```

### 🔐 How It Works

- The backend reads this file during server startup.
- Requests to protected routes (e.g., `POST`, `PUT`, `PATCH`) are blocked unless the authenticated user's email is found in this list.
- The file is loaded from disk using Node's `fs` module at runtime.

---

## 🔄 API Type Generation with Swagger

This project uses a Swagger/OpenAPI YAML file to define the backend API schema and automatically generate TypeScript types and API functions for the frontend.

### 📜 `swagger.sh` Script

Located at the root of the project, the `swagger.sh` script automates the generation process.

#### ✅ What it does

- Reads the `swagger.yaml` file (which defines the API schema).
- Uses [OpenAPI Generator](https://openapi-generator.tech/) to:

  - Generate TypeScript types.
  - Generate a fully typed API client using Axios.
- Outputs files into the frontend codebase for consistent API integration.

#### 📁 Output Directory

The generated files are saved in:

```txt
frontend/api/
├── api.ts           # Axios-based API functions
├── configuration.ts # Axios configuration
├── models/          # TypeScript interfaces for request/response models
```

---

### 🛠️ How to Run

1. Make sure you have the OpenAPI Generator installed globally. If not, install it:

   ```bash
   npm install @openapitools/openapi-generator-cli -g
   ```

2. Run the script:

   ```bash
   ./swagger.sh
   ```

This command will regenerate the API types and functions based on the current `swagger.yaml` definition.

> ⚠️ **Note:** Re-run this script whenever you make changes to `swagger.yaml` to keep the frontend types in sync.

## ✨ Features

- Firebase Authentication & Express-based middleware
- Traffic data API with filter and pagination
- React interface with form dialogs, charts, tables, and filters
- Centralized config and types
- Deployed using Firebase Hosting and Cloud Functions

---

## 📁 Key Files

- `functions/src/index.ts`: Main entry point for backend routing.
- `functions/src/traffic/`: Backend logic for traffic data.
- `frontend/app/root.tsx`: React layout and routes.
- `frontend/app/TrafficContainer.tsx`: Core UI for traffic dashboard.

---

## 📜 License

This project is provided as a coding assignment and is not licensed for commercial use.
