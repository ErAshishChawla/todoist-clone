# todoist-clone

To run this project

For frontend:
open a terminal for frontend folder
1. npm i
2. npm run dev

For backend:
1. create a .env file with following variables:
   # Server
    NODE_ENV = "development"
    PORT = 3001

    #JWT SECRET KEY
    JWT_SECRET_KEY = ""

    # HASHING SALTS
    HASHING_SALTS = "12"

    #Database
    DB_NAME = "todo"
    DB_HOST = "localhost"
    DB_CONNECTION_STRING = ""

    #MAILING SERVICE
    SENDGRID_API_KEY = ""

    #ICONS SEARCH API KEY:
    ICON_SEARCH_API_KEY = ""
2. After creating this file in backend folder, run npm i in terminal for backend folder
3. npm start
