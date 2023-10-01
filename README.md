# Course Selling Application MERN

This is a simple Course selling application built using the MERN (MongoDB, Express, React, Node.js) stack.

It has two clients 

**1. Admin**

- Admins can login or create a new account
- Admins can Create, Update and Delete Courses

**2. User**

- Users can login or create a new account
- Users can View and Purchase Courses

## Table of Contents

-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Usage](#usage)

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   [Node.js](https://nodejs.org/) installed on your development machine.
-   [MongoDB](https://www.mongodb.com/) installed and running locally or a MongoDB Atlas account.

## Installation

**Clone the repository:**

```sh
git clone https://github.com/NaniTadala/Course-Selling-App-MERN.git

```

### Setup Server

**1. Navigate to the server folder:**

```sh
cd ./server
```

**2. Install the server dependencies:**

```sh
npm install
```

**3. Setup mongodb connection**

```env
MONGODB_URI="mongodb://localhost:27017/todoApp"
```

Replace mongodb://localhost:27017/todoApp with your MongoDB URI.

**4. Start the server:**

```sh
node server.js
```

### Setup Admin  Client

**1. Open a new terminal window/tab, navigate to the client-admin folder:**

```sh
cd ../client-admin
```

**2. Install the client dependencies:**

```sh
npm install
```

**3. Start the client:**

```sh
npm run dev
```

### Setup User Client

**1. Open a new terminal window/tab, navigate to the client-user folder:**

```sh
cd ../client-user
```

**2. Install the client dependencies:**

```sh
npm install
```

**3. Start the client:**

```sh
npm run dev
```

# Usage

Open your web browser and go to http://localhost:5173 to access the Course selling app.
