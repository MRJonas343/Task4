# Full-Stack Admin Panel Task #4 🚀

## Description 📋

This is a full-stack web application featuring an admin panel, login, and registration functionalities. It is built with Next.js, Drizzle ORM, PostgreSQL, Auth.js, and Next UI. The project is 100% type-safe and uses React Hook Form and Zod for data validation. It implements server actions for database operations, with the `useOptimistic` hook providing a smooth, delay-free user experience. Password encryption is handled using bcrypt.

## Features 🛠️

- **Login and Registration**: User authentication with Auth.js.
- **Admin Panel**: Manage users with features to lock, unlock, and delete users.
- **Seed Users**: Button to create dummy users for testing.
- **Data Validation**: React Hook Form and Zod ensure data validity.
- **Optimistic Updates**: Smooth, delay-free user experience.
- **Security**: Password encryption with bcrypt.

## Requirements ⚙️

1. **Node.js**: Ensure Node.js is installed.
2. **PostgreSQL**: You'll need a PostgreSQL database.

## Project Setup ✍️

1. **Clone the repository**:

    ```bash
    git clone <REPOSITORY_URL>
    cd <REPOSITORY_NAME>
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Configure environment variables**:

    - Create a `.env` file in the root of the project and add the following variables:

    ```env
    POSTGRES_URL=<POSTGRESQL_CONNECTION_URL>
    POSTGRES_PASSWORD=<POSTGRESQL_PASSWORD>
    AUTH_SECRET=<AUTH_SECRET>
    ```

    - Generate an Auth.js secret with the following command:

    ```bash
    npx auth secret
    ```

4. **Run the project**:

    ```bash
    npm run dev
    ```

    or

    ```bash
    bun dev
    ```

## Admin Panel 🖥️

- **Seed Users**: Use the "Seed Users" button in the admin panel to create users. You can test user management by deleting and creating users. Clicking this button will regenerate the users. Disclaimer : This button doesn't have useOptimistic 😥
- **Predefined Accounts**: In the `seed` folder, you can find predefined users if you wish to log in with existing accounts.

Enjoy managing your admin panel and testing your application! 🎉

Remember your password is secure with me 😇
