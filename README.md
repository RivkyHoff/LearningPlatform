# AI Learning Platform

A full-stack web application for managing users, courses, and AI-powered learning content.

---

## 🚀 Technologies Used

- **Frontend:** React (with Hooks, functional components, Axios/Fetch)
- **Backend:** ASP.NET Core Web API (C#)
- **Database:** SQL Server (can be run via Docker Compose)
- **AI Service:** OpenAI API (GPT-4)
- **Configuration:** dotenv (`.env`) for environment variables
- **Containerization:** Docker, Docker Compose

---

## 📝 Assumptions Made

- The backend will be run locally or in a Docker container; frontend and backend can communicate over localhost.
- The OpenAI API key will be provided by the developer via environment variable or `.env` file.
- The SQL Server database will be created and managed via Docker Compose for ease of local setup.
- CORS is properly configured on the backend to allow the frontend to access APIs.
- Proper error handling and input validation are implemented both client and server side.
- **User authentication is required to view courses and learning history; user data is private and cannot be accessed by others.**

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/RivkyHoff/LearningPlatform.git
cd ai-learning-platform
```

### 2. Environment Variables

Copy the `.env.example` file to `.env` and fill in your secrets:

```bash
cp .env.example .env
```

Edit `.env` as needed.

### 3. Run the Database with Docker Compose

Ensure Docker is installed and running.

```bash
docker-compose up -d
```

This will spin up a SQL Server instance and any other required services.

### 4. Backend Setup

- Navigate to the backend folder (e.g., `cd server`).
- Restore dependencies and run migrations if needed.
- Start the API:

```bash
dotnet restore
dotnet ef database update  
dotnet run
```

### 5. Frontend Setup

- Navigate to the frontend folder (e.g., `cd client`).
- Install dependencies and start the development server:

```bash
npm install
npm start
```

Open [http://localhost:3001](http://localhost:3001) (or as configured) in your browser.

---

## 🏗️ How to Run Locally

1. **Start the database** via Docker Compose:  
   `docker-compose up -d`

2. **Start the backend** API (default: `https://localhost:7099`):  
   `dotnet run` (inside the backend folder)

3. **Start the frontend** React app (default: `http://localhost:3001`):  
   `npm start` (inside the frontend folder)

4. **Test endpoints** via Swagger (`https://localhost:7099/swagger`) or from the frontend UI.

---

## 🧪 Sample `.env` Example

```dotenv name=.env.example
# Frontend
REACT_APP_API_URL=http://localhost:7099

# Backend
OPENAI_API_KEY=your-openai-api-key-here
DB_CONNECTION_STRING=Server=localhost,1433;Database=AILearning;User Id=sa;Password=yourStrong(!)Password;

```

---

## 🐳 Docker / Docker Compose Example

```yaml name=docker-compose.yml
version: '3.8'
services:
  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      SA_PASSWORD: "yourStrong(!)Password" i don't want to share passwords here!
      ACCEPT_EULA: "Y"
    ports:
      - "1433:1433"
    volumes:
      - mssqldata:/var/opt/mssql
volumes:
  mssqldata:
```

---

## 💡 Best Practices

- Code is modular, well-commented, and follows established conventions for both C# and React.
- Sensitive configuration is managed via dotenv and not committed to version control.
- Input validation is performed on both frontend and backend.
- API errors are caught and user-friendly messages are displayed.
- The public repository includes a clear, linear commit history and no sensitive data.
- **Authentication is enforced for all protected resources; only authenticated users can view their own courses and learning history.**

---

## 📋 Input Validation & Error Handling

- All API endpoints validate input and return appropriate error messages and HTTP status codes.
- The frontend checks required fields and displays errors to the user.
- Duplicate registrations (e.g., same username) are prevented, and user data is updated safely.
- Async operations in both frontend and backend use try/catch blocks for robust error handling.
---

## 📚 Further Notes

- To contribute, fork the repo and submit a pull request with clear, concise commit messages.
- For production deployments, ensure secrets are stored securely (not in `.env`) and HTTPS is enforced.

---

**Enjoy my app!**
