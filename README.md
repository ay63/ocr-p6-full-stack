# ORION project

## Description
This project consists of two main codebases:
- **front**: all the frontend for the social network MDD
- **back**: all the backend for the social network MDD

## Prerequisites
- **Frontend**:
  - Angular CLI `19.1.5`
- **Backend**:
  - Java `21`
  - Mysql `8.0.30`
  
## Installation

## Frontend

### Technologies Frontend
- **Angular**: Framework for building the web application.
- **Material angular**:  UI component library
### Installation Frontend 

Run to install dependencies
>  `npm install` 

Start the application with
>  `npm run start`. 

The app will be available at `http://localhost:4200`.

## Backend

### Technologies Backend
- **Spring boot 3** 
- **Java 21**

### Installation Backend

Navigate to the `back` folder
>  `cd back`

### Start Backend
Start the application with 
> `mvn spring-boot:run` 

The app will be available at `http://localhost:8080`.

## Database  

### Using Command Line  

#### Import the script:  
> `source path/to/sql/script.sql`  

### Using MySQL Workbench  

1. Open MySQL Workbench.  
2. Connect to the MySQL server.  
3. Go to the **"File"** menu and select **"Run SQL Script"**.  
4. Select the SQL file to import, located in the project root: 
  > `resources > sql > script.sql`
-
## Postman

### Import Postman Routes

Select "Import" in the sidebar. 
The JSON file will be located at the root of the project in the folder: 
> `resources > postman > mdd.postman_collection.json`
