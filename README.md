# Cortexre Home Assignment

This project consists of a full-stack application divided into two main parts:

- **Backend (Firebase Functions)**: Contains API endpoints implemented using Express and deployed as Firebase Cloud Functions.
- **Frontend (React + Vite + MUI)**: A React-based user interface using Material-UI and Vite for rapid development.

---

## 🔧 Project Structure

```
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

Here's your updated `README.md` with the `.env.example` section and `cp` command instructions added under the **Frontend (React)** section:

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
Here's how you can update your `README.md` to include an explanation of the `swagger.sh` script and how it generates frontend types and API functions from the Swagger YAML file.

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

```
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

---

Let me know if you want me to also create a `.env.example` or update the `.gitignore` to avoid tracking generated files.

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
