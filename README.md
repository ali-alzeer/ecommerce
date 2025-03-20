<br/>

## Table Of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Screenshot](#screenshot)
- [Database Diagram](#database-diagram)
- [Live Site](#live-site)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

## About The Project

It is a full-stack E-Commerce web application built with Angular for front-end, ASP.NET Core web API for back-end and SQL Server for the database.
It has a simple and user-friendly UI where users can view products, search for a product, add a product to cart, rate products, publish comments on them and manage their profiles on the app.

## Features

- User authentication using JWT
- Users capabilities to manage their own profiles
- Products searching, filtering
- Cart management (adding to cart, removing, calculating total ...)
- Products rating functionality
- Products commenting functionality

### Screenshot

![screenshot_1](https://res.cloudinary.com/alzeerecommerce/image/upload/v1736689294/z_jylljd.gif)

<hr />

### Database Diagram

![db_diagram](https://res.cloudinary.com/alzeerecommerce/image/upload/v1736688856/zedstore_diagram_scbstl.png)

## Live Site

[Zedstore](http://zedstore.tryasp.net)

## Built With

- Angular
- ASP.NET Core
- SQL Server

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Angular 18 or above
- .NET 8 or above
- Microsoft SQL Server
- Cloudinary account

### Installation

#### Getting the code

1. Clone the repo

```sh
    git clone https://github.com/ali-alzeer/ecommerce.git
```

#### Database

1. Import the database file from the folder "ecommerce.database"

#### Back-End

1. Configure connection string in "Settings.cs" file

```cs
    public static string GetConnectionString(){
        return "YOUR_CONNECTION_STRING"
    }
```

2. Configure JWT settings in "appsettings.json" file

```json
    "Jwt": {
        "Key": "YOUR_JWT_KEY",
        "Issuer": "YOUR_JWT_ISSUER",
        "Audience": "YOUR_JWT_AUDIENCE",
        "Subject": "YOUR_JWT_SUBJECT"
    }
```

3. Configure Cloudinary settings in "appsettings.json" file

```json
    "Cloudinary": {
        "CloudName": "YOUR_CLOUDINARY_CLOUDNAME",
        "ApiKey": "YOUR_CLOUDINARY_API_KEY",
        "ApiSecret": "YOUR_CLOUDINARY_API_SECRET"
    }
```

4. Change path to the back-end folder

```sh
    cd ecommerce.server
```

5. Install dependencies

```sh
    dotnet restore
```

6. Start Running

```sh
    dotnet run
```

#### Front-End

1. Configure your BASEURL and AI API in "environment.ts" file

```ts
    export const BASEURL: string = 'YOUR_BACKEND_URL';
    export const AI_REQUEST_URL = 'YOUR_AI_API_REQUEST_URL';
    export const AI_REQUEST_HEADERS = {
        headers: {
        'YOUR_AI_API_REQUEST_HEADERS'
        },
    };
    export function AI_REQUEST_BODY(content : string){ 
        return JSON.stringify({
            'YOUR_AI_API_REQUEST_BODY'
        })    
    };
```

2. Change path to the front-end folder

```sh
    cd ecommerce.client
```

3. Install dependencies

```sh
    npm install
```

4. Start Running

```sh
    ng serve
```
