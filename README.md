# Project Title

StockiStash

## Overview

StockiStash is a place where employers/management is able to keep track of inventory and have a clear vision of how the storage.

### Problem

In a production environment, one of the crutial points for a steady work-flow is to keep track of the inventory. Especially for small businesses where they can't afford for system storage checking or they have no idea about it. This also helps employees; Sometime, when we use a piece of equipment or maybe a small object that we can't identify. It is important for a visual present of the object in front of the screen along side with its information.

### User Profile

Managements: - checking for inventory quantity - have an idea to see what is about to run out
Employees: - abilities to have a visual of the items - abilities to take out an item - aibilities to put back an item - able to search for an item

### Features

- As a user, I want to learn more about the items
- As a user, I want to see how many available items
- As a user, I want to search for an item
- As a user, I want to be able to create an account
- As a user, I want to be able to login to my account
- As a user, I want to be able to logout of my account
- As a logged in employee, I want to be able to search for an item
- As a logged in employee, I want to be able to add an item onto my account
- As a logged in manager, I want to be able to edit an item in the inventory
- As a logged in manager, I want to be able to delete an item from the inventory
- As a logged in employee, I want to be able to see items that are related to my field
- As a logged in employee, I want to be able to report when an item is about to run out
- As a logged in employee, I want to be able to see items that are not available
- As a logged in employee, I want to be able to search for an item
- As a logged in employee, I will have a limit access to certain item that is not related to my fields
- As a logged in employee, I will have a daily quantity limited

## Implementation

### Tech Stack

- React
- MySQL
- Express
- Client libraries:
  - react
  - react-router
  - axios
- Server libraries:
  - knex
  - express
  - bcrypt for password hashing
  - nodemailer for sending report

### APIs

- No external APIs will be used for the first sprint

### Sitemap

- Home page
- Items page - shows all items
- Item page - shows a single item
- Register
- Login

### Mockups

#### Home Page

![](./src/assets/mockups/homepage.png)

#### Inventory Page

![](./src/assets/mockups/inventory_page.png)

#### Register Page

![](./src/assets/mockups/register_page.png)

#### Login Page

![](./src/assets/mockups/login_page.png)

#### Employee Page

![](./src/assets/mockups/employee_view.png)

#### Item Details Page

![](./src/assets/mockups/item_details.png)

### Data

User - id - user_name - password - user_role
Inventory - id - user_id- item_name - description - quantity - item_type - item_status - image
Report - id - user_id - inventory-id - report_date - report_description

### Endpoints

**GET /inventory**

- Returns all inventory items with their information and status.
  Parameters:

- Response:

```
[
    {
        "id": 1,
        "name": "Emery Strips",
        'description': 'This is a description',
        "quantity": 500,
        "grit": 100,
        "status": 'In Stock'
        'location': 'This is where to buy not require'
    },
    ...
]
```

**GET /inventory/:id**

- Returns a single inventory item with its information and limite of how much an employee can withdraw.

- id: item id as number
- Response:

````
[
    {
        "id": 1,
        "name": "Emery Strips",
        'description': 'This is a description',
        "quantity": 500,
        "grit": 100,
        "status": 'In Stock'
        'limite': 'how much you can take out'
    },
    ...
]
```

**POST /inventory**

- Logged in employee is able to report an item that is about to run out.

Parameters:

- id: item id
- token: JWT of the logged in user

Response:

[
    {
        "id": 1,
        "user_id": "1",
        "inventory_id": "1",
        'description': 'This is a description',
        "quantity": 500,
        "grit": 100,
        "status": 'Almost run Out'
    },
]
**POST /inventory/:id**

- Logged in manager is able to add an item to inventory.

Parameters:

- id: item id
- token: JWT of the logged in user

Response:

[
    {
        "id": 1,
        "user_id": "1",
        "inventory_id": "1",
        'description': 'This is a description',
        "quantity": 500,
        "grit": 100,
    },
]

**PATCH /inventory/edit/:id**

- Logged in management can update an item in inventory.

Parameters:

- id: item id
- token: JWT of the logged in user

Response:

```
    {
        "id": 1,
        "name": "Emery Strips",
        'description': 'This is a description',
        "quantity": 500,
        "grit": 100,
        "status": 'In Stock'
    },
```
**POST /users/register**

- Add a user account

Parameters:

- username: User's username
- password: User's provided password
- fields : User's fields

Response:

```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

**POST /users/login**

- Login a user

Parameters:

- username: User's username
- password: User's provided password
- fields : User's fields

Response:

```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

### Auth

- JWT auth
  - Before adding auth, all API requests will be using a fake user with id 1
  - Added after core features have first been implemented
  - Store JWT in localStorage, remove when a user logs out

## Roadmap

- Create client

  - react project with routes and boilerplate pages

- Create server

  - express project with routing, with placeholder 200 responses

- Create migrations

- Create seeds with items and users

- Deploy client and server projects so all commits will be reflected in production

- Feature: Keep track of inventory

  - Show all items in inventory and their status
  - Create GET /inventory endpoint

- Feature: View item

  - Show an item in detail
  - Create GET /inventory/:id

- Feature: Report item

  - Add  report feature so an employee can report an item that is about to run out
  - Create POST /inventory

- Feature: Home page

- Feature: Create account

  - Implement register page + form
  - Create POST /users/register endpoint

- Feature: Login

  - Implement login page + form
  - Create POST /users/login endpoint

- Feature: Implement JWT tokens

  - Server: Update expected requests / responses on protected endpoints
  - Client: Store JWT in local storage, include JWT on axios calls

- Bug fixes

- DEMO DAY

## Nice-to-haves
 - Manager role is able to see how many employees are there
 - Each item has a QR code to scan
 - Have a page dedicate to a tool in the inventory of how to use it
 - Add a forgot password functionality
 - Employee will have a cart and shows how many items has already been taken out
````
