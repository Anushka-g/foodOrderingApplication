# Food Ordering Application

**TECHNOLOGIES**: 
Angular 12.1.0, Node.JS, Express.JS, MongoDB

**ACHIEVEMENT**:
Successfully developed and deployed a feature-rich Food Application, enabling seamless communication between customers and restaurants.

**KEY FEATURES**
1. Implemented robust authentication and Role-Based Authorization to ensure data security and prevent unauthorized access, significantly reducing the risk of misuse and data breaches.
2. Enabled customers to create accounts, facilitating direct order placement, personal information updates (e.g., date of birth, phone number), profile picture uploads, and password       changes within the application.
3. Provided Admin Users with extensive controls for efficient business management, including user account management without data loss, addition of new recipes through form or bulk        upload features, and real-time order status updates for enhanced user experience.

**SETTING UP YOUR DEVELOPMENT ENVIRONMENT**
1. For local setup, ensure you have Angular 12.1.0, Node v15.14.0, MongoDB, and Studio 3T installed.
  
2. Clone the repository to your local machine.<br>
   ```git clone https://github.com/Anushka-g/foodOrderingApplication.git```
   
3. Navigate to the project directory.
   ```cd backend_node.js```
   
4. Install dependencies using ```npm install``` or ```npm i```

5. Create .env.development file under src folder of backend_node.js folder. Add below properties.
   
   - PORT
   - JWT_SECRET: Any string character
   - MONGODB_URL: mongodb://127.0.0.1:27017/<DB_name>

6. Create a folder to store mongoDB data in your project directory. Start MongoDB from command line using
   ```<path_to_mongodb>/bin/mongod --dbpath=<data_directory>```
   replacing `<path_to_mongodb>` with the path to your MongoDB installation directory and `<data_directory>` with the path to the folder        created.

7. Start Studio 3T and connect to your local MongoDB instance.

8. Start server by running ```npm run dev```

9. Upon successful setup, one will receive the following message.
 
   ``` 
   > node@1.0.0 dev
   > env-cmd -f .env.development nodemon src/index.js
  
   [nodemon] 2.0.12
   [nodemon] to restart at any time, enter `rs`
   [nodemon] watching path(s): *.*
   [nodemon] watching extensions: js,mjs,json
   [nodemon] starting `node src/index.js`
   Server is up on port 3000
   ```

10. Navigate to the project directory.
    ```cd frontend_angular```

11. Start user interface by running ```ng serve```

12. Upon successful setup, one will receive the following message.
    ```
    ** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
    
    ✔ Compiled successfully.
    ```

