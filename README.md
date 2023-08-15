# FastTransfer - an Inventory Management Program

## Introduction

The purpose of this project is to create a inventory management app which helps companies can manage the internal transfer of product and they can focus on their Logistics and Supply Chain Policy.

## Live demo

You can perform live demo here. [Live Demo](http://www.fasttransfer.id.vn/).

## Screenshots

- Landing page
  ![App Screenshot](/mediafiles/landing_page.png?raw=true "Landing Page")

- Login page
  ![App Screenshot](/mediafiles/login_page.png?raw=true "Login Page")
- Register page
  ![App Screenshot](/mediafiles/register_page.png?raw=true "Login Page")
  ![App Screenshot](/mediafiles/register_page_2.png?raw=true "Login Page")

- Product management
  ![App Screenshot](/mediafiles/product_list.png?raw=true "Product Page")

- Warehouse management
  ![App Screenshot](/mediafiles/warehouse_management.png?raw=true "Warehouse Page")

- Location management
  ![App Screenshot](/mediafiles/location_management.png?raw=true "Location Page")

- Outcome management
  ![App Screenshot](/mediafiles/outcome_management.png?raw=true "Outcome Page")

- Transfer management
  ![App Screenshot](/mediafiles/transfer_management.png?raw=true "Transfer Page")

- Stock management
  ![App Screenshot](/mediafiles/stock_management.png?raw=true "Stock Page")

- Rule of product management
  ![App Screenshot](/mediafiles/rule_management.png?raw=true "Rule product Page")

## Table of Contents

- [Techstacks](#techstacks)
- [Features](#features)
- [Setup](#setup)
- [Development](#development)
- [Room for Improvement](#room-for-improvement)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Techstacks

- Django
- Mailgun (Mail service)
- Sentry (Error handling)
- JWT (Authentication)
- PostgreSQL (Database)

## Features

1. Product Management

- Create product belongs to user's company
- View list product, product's detail, update and delete product

2. Product Stock Management

- Add stock directly or create purchase to buy product from partner to location
- View list location stock, stock's detail, delete stock of product at location

3. Warehouse Management:

- Create Warehouse belongs to user's company
- View list warehouse, warehouse's detail, update warehouse and delete warehouse

4. Location Management:

- Create location belongs to warehouse
- View list location, location's detail, update location and delete location

5. Rule Stock Management:

- Set up rule based on user's requirements (User need to choose source location, destination location, method to create rule)
- Bundle rules into a group and apply that group to a specific product

6. Transfer Management:

- Automatically create transfer invoices based on rules being applied to product
- Product get from partner's outcome

## Setup

```bash

# Clone this repository
$ git clone https://github.com/lucqng111/InventoryManagementProgram.git

# Go into the repository
$ cd InventoryManagementProgram

# Install dependencies
$ pip install -r requirements.txt

# Run the app
$ python3 manage.py makemigrations
$ python3 manage.py migrate

# Run the app
$ python3 manage.py runserver
```

## Development

To run program in product environment:

- docker and docker-compose
- git

1. Clone the reposity:

```bash
    git clone https://github.com/lucqng111/InventoryManagementProgram.git
```

2. From within the repository directory, run:

```bash
    docker-compose up --build
```

## Acknowledgements

- Backend skills: Know how to develop a project by using Django framework.

- Research skills

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Running Tests

To run tests, run the following command

```bash
    python3 manage.py test
```
