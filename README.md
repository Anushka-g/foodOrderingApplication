# Food Ordering Application

**Technologies**: 
Angular 12, Node.js, Express.js, MongoDB

**Achievement**: 
Successfully developed and deployed a feature-rich Food Application, enabling seamless communication between customers and restaurants.

**Key Features**:
1. Implemented robust authentication and Role-Based Authorization to ensure data security and prevent unauthorized access, significantly reducing the risk of misuse and data breaches.
2. Enabled customers to create accounts, facilitating direct order placement, personal information updates (e.g., date of birth, phone number), profile picture uploads, and password       changes within the application.
3. Provided Admin Users with extensive controls for efficient business management, including user account management without data loss, addition of new recipes through form or bulk        upload features, and real-time order status updates for enhanced user experience.

**Setting Up Your Development Environment**
1. For local setup, ensure you have Node, MongoDB, and Studio 3T installed.
  
2. Clone the repository to your local machine.<br>
   ```git clone https://github.com/Anushka-g/foodOrderingApplication.git```
   
3. Navigate to the project directory.
   ```cd backend_node.js```
   
4. Install dependencies using ```npm install``` or ```npm i```

5. Create .env.development file under src folder of backend_node.js folder. Add below properties.
   
   - PORT
   - JWT_SECRET: Any string character
   - MONGODB_URL: mongodb://<IP_address>:<Port>/<DB_name>

7. Create a folder to store mongoDB data. Start MongoDB from command line using
   ```<path_to_mongod>/bin/mongod --dbpath=<data_directory>```
   replacing `<path_to_mongodb>` with the path to your MongoDB installation directory and `<data_directory>` with the path to the folder        created.

8. Start Studio 3T and connect to your local MongoDB instance.

9. Start server by running ```npm run dev```

10. Upon successful setup, one will receive the following message.
 
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

