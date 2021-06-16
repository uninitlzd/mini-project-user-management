# mini-project-user-management

This repository includes backend and frontend code, implemented using Laravel, Laravel Passport for Auth, Vue 3, and TailwindCSS

## Installation

### Backend

1. Clone the repository

2. Switch to the backend folder first

    ```cd mini-project-user-management/backend```

3. Install all the dependencies using composer

    ```composer install```

4. Copy the example env file and make the required configuration changes in the .env file

    ```cp .env.example .env```

5. Generate a new application key

    ```php artisan key:generate```

6. Run the database migrations (**Set the database connection in .env before migrating**)

    ```php artisan migrate```
    
7. Run the database seeder

    ```php artisan db:seed```

8. Install passport

    ```php artisan passport:install```
    
9. Set **PASSPORT_CLIENT_ID** and **PASSPORT_CLIENT_SECRET** of .env using Password Grant client id and client secret from the result of passport install command    

10. Start the local development server

    ```php artisan serve```

You can now access the server at http://localhost:8000

---
### Frontend

1. Switch to the frontend folder

    ```cd ../frontend/```

2. Install all the dependencies using yarn or npm

    ```yarn install```

3. Copy the example env file and populate it with values according to your laravel .env

    ```cp .env.example .env```

4. serve with hot reload at localhost:3000

    ```yarn run dev```

---

## Credentials

### Admin:
Email

    admin@example.com

Password

    password
    
---

### User:
Email

    user@example.com

Password

    password

---
