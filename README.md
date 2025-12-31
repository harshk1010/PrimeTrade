# PrimeTrade Frontend (React)




## 🚀 Overview
This is the **Frontend** for the PrimeTrade assignment, built using **React 19**, **Vite**, **CSS**, and a modern dark UI theme inspired by trading dashboards.  
It integrates seamlessly with the backend (Node.js + MySQL) using JWT authentication.

---

## 📌 Features
### 🔐 Authentication
- Login & Register pages  
- Client-side validation (React Hook Form)  
- JWT stored in localStorage  
- Protected routes using `ProtectedRoute.jsx`

### 🧭 Navigation
- Responsive Navbar  
- Dark trading-style UI  
- Auto-hides links based on auth state  

### 📊 Dashboard
- Add tasks  
- View tasks  
- Search tasks  
- Delete tasks  
- Edit tasks (popup modal)  
- Uses backend CRUD APIs  

### 👤 User Profile
- Fetch profile  
- Update name & city  
- Realtime UI update  

---

## 🗂 Folder Structure

```
src/
│
├── api/
│   └── axiosInstance.js
│
├── components/
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   └── Profile.jsx
│
├── styles/
│   ├── LoginStyles.css
│   ├── RegisterStyles.css
│   ├── NavbarStyles.css
│   ├── DashboardStyles.css
│   └── ProfileStyles.css
│
├── App.jsx
└── main.jsx
```

---

## 🛠️ Tech Stack
- **React 19.1.0**
- **Vite**
- **React Router DOM**
- **React Hook Form**
- **Axios**
- **Custom CSS (Dark theme)**

---

## 🔧 Installation & Setup

### 1️⃣ Install dependencies
```
npm install
```

### 2️⃣ Start development server
```
npm run dev
```

### 3️⃣ Environment Variables
Create a `.env` file:

```
VITE_BACKEND_URL=http://localhost:3000/api
```

### 4️⃣ Axios Instance auto-attaches JWT  
Located in `src/api/axiosInstance.js`.

---

## 🔐 Protected Routes
`ProtectedRoute.jsx` prevents unauthorized access:

```jsx
if (!token) return <Navigate to="/login" />;
```

---

## 🎨 UI Theme
- Premium dark mode styling  
- Trading dashboard aesthetic  
- Neon green accents  
- Fully responsive  

---

## 🔗 Backend API Integration
Frontend communicates with backend routes:

- `POST /auth/login`
- `POST /auth/register`
- `GET /user/profile`
- `PUT /user/profile`
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

---

## 🧪 Testing
Use **Postman** or **Thunder Client** to verify backend routes before connecting UI.

---

## 🚀 Scaling Frontend–Backend Integration for Production

Here is how this project can be prepared for a real production environment:

1. Use separate `.env` files for development and production.
2. Deploy the frontend on Vercel/Netlify for global CDN performance.
3. Move MySQL to a managed cloud database such as Railway or PlanetScale.
4. Add stronger validation and restrict CORS to the production domain.
5. Implement backend logging (Winston/Morgan) and error tracking (Sentry).
6. Dockerize the backend for consistent deployments across environments.
7. Use GitHub Actions for automated CI/CD (build → test → deploy).

Simple, practical improvements that ensure stability, performance, and maintainability.

---

## 📦 Build for Production
```
npm run build
```

---

## 👨‍💻 Author
Harsh Kabra — Frontend Developer Intern Assignment (PrimeTrade AI)

---

## 📄 License
This project is for recruitment & assignment evaluation purposes only.
