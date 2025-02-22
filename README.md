# ORION project

## Description
This project consists of two main codebases:
- **front**: all the frontend for the social network MDD
- **back**: all the backend for the social network MDD

## Prerequisites
- **Frontend**:
  - Angular CLI `19.1.5`
  - Material angular `19.1.3`
  
- **Backend**:
  - Spring boot `3.4.3` 
  - Java `21`
  - PostgreSQL `17`

## User database credentials  
- **Email :** josefa.fox@mdd.com
- **Password :** aqw!AQW!123

# Installation

## Frontend

### Technologies Frontend
- **Angular**: Framework for building the web application.
- **Material angular**:  UI component library
### Installation Frontend 

Navigate to the `front` folder
>  `cd front`

Run to install dependencies
``` 
npm install
``` 

Start the application with
``` 
npm run start
``` 

The app will be available at `http://localhost:4200`.

## Backend

### Technologies Backend
- **Spring boot 3** 
- **Java 21**
- **Lombok**
- **Mapstruct**



### Installation Backend

Navigate to the `back` folder
>  `cd back`

### Start Backend
Start the application with
``` 
mvn spring-boot:run
``` 

The app will be available at `http://localhost:8080`.

### Build documentation
``` 
mvn javadoc:javadoc
```

## Database  

You will find the sql script in path: 
> `resources > sql > script.sql`

### Step 1: Create a Database
> Open pgAdmin and connect to your PostgreSQL server.

> Right-click on Databases in the left sidebar.

> Select Create > Database.

>Enter a name for your database and click Save.

### Step 2: Import the SQL Script
> Expand the newly created database.

> Open the Query Tool by clicking the tool icon or right-clicking the database and selecting Query Tool.

> Open your script.sql file in a text editor and copy its content.

> Paste the SQL script into the Query Tool.

> Click Execute (or press F5) to run the script and import the data.

## Postman

### Import Postman Routes

Select "Import" in the sidebar. 
The JSON file will be located at the root of the project in the folder: 
> `resources > postman > mdd.postman_collection.json`

