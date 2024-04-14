# To-Do

## Database Architecture and Modeling

- [X] Create the database architecture
  - [X] Identify main entities (e.g., Store, Product, Employee)
  - [X] Define attributes for each entity
  - [X] Establish relationships between entities
  - [X] Create types

- [X] Develop database schema
  - [X] Create tables for each identified entity
  - [X] Define data types and constraints for each attribute
  - [ ] Establish primary and foreign keys

## Backend and RESTful API

- [X] Implement basic backend structure
  - [X] Set up development environment, server, and related configurations
  - [X] Define the architecture
  - [\] Configure database connection and choose technologies for it
    - Bun SQLite for dev
    - ???? For production

- [ ] Create RESTful API endpoints
  - [ ] Endpoint to add a new product to the inventory
  - [ ] Endpoint to update information of an existing product
  - [ ] Endpoint to delete a product from the inventory
  - [ ] Endpoint to view all available products
  - [ ] Endpoint to search products by name or category

- [ ] Implement business logic
  - [ ] Logic to share inventory between stores
  - [ ] Logic for generating performance reports
  - [ ] Logic for user management and permissions

## Performance Optimization and Security

- [ ] Optimize SQL queries
  - [ ] Identify frequent queries and apply appropriate indexes
  - [ ] Implement pagination strategies for large queries

- [ ] Implement data validation and security
  - [ ] Validate input data to prevent injection attacks
  - [ ] Implement authentication and authorization to protect sensitive endpoints

- [ ] Implement caching
  - [ ] Choose caching technology

## Testing and Documentation

- [ ] Write automated tests
  - [ ] Unit tests for backend functions
  - [ ] Integration tests to verify integration between components
  - [ ] Load tests to evaluate system performance under load

- [ ] Document the RESTful API
  - [ ] Create clear and concise documentation of available endpoints
  - [ ] Include usage examples and description of accepted parameters
