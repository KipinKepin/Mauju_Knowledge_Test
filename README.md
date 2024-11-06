# Project Setup Guide

## Instructions

1. Open two terminal windows.
2. In the first terminal, install dependencies by running:
   ```bash
   npm install
   ```
3. Install json-server globally by running:
   ```bash
   npm install -g json-server
   ```
4. In one of the terminals, start the JSON server with the command:
   ```bash
   json-server -w db.json -p 5000
   ```
5. In the other terminal, run the following command to start the development server:
   ```bash
   npm run dev
   ```
6. Open the link provided in your terminal to access the application.

## User Guide

1. Register an account if you do not already have one.
2. Log in using the email and password you registered with.
3. Upon successful login, you will be directed to the dashboard. From here, you can access other sections such as:

   - Users
   - Transactions
   - Profile
   - Logout

4. You can find Profile and Logout options by clicking the profile picture in the top-right corner of the navbar.
5. CRUD operations are available for transactions, but you do not have permission to modify other users' data.

## Final Steps

- Log out when you are finished using the web application.

Thank you for using this application!
