# CafeNet

CafeNet is a modern, full-featured café management system designed to streamline order processing, menu management, payments, and reporting for cafés and restaurants. Built with ASP.NET Core and Entity Framework, CafeNet provides a robust backend for handling orders, discounts, taxes, and user management.

## Features

- **Order Management**: Create, update, and track orders with support for item variations, taxes, and discounts.
- **Menu Management**: Manage menu items, categories, and item variations.
- **Discounts & Taxes**: Flexible discount and tax models, including percentage and fixed-amount discounts.
- **User & Location Management**: Support for multiple users and locations, with role-based access.
- **Payment Processing**: Record and track payments for orders.
- **API-First**: RESTful API endpoints for all major operations.
- **Extensible**: Easily add new features or integrate with external systems.

## Project Structure

- `Business Management/DTOs/` – Data transfer objects for API requests and responses
- `Controllers/` – API controllers for handling HTTP requests
- `Data/` – Database context, models, enums, and repositories
- `Infrastructure/` – Extensions, pagination, and Swagger setup
- `Migrations/` – Entity Framework Core migrations
- `Program.cs` – Application entry point

## Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- PostgreSQL (or your configured database)

### Setup
1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd CafeNet
   ```
2. **Configure the database**
   - Update `appsettings.json` with your database connection string.
3. **Apply migrations**
   ```sh
   dotnet ef database update
   ```
4. **Run the application**
   ```sh
   dotnet run
   ```
5. **Access the API**
   - The API will be available at `https://localhost:7153`.
   - Swagger UI is available at `/swagger` for API exploration.
6. **Access the UI**
   - Run Vite application in CafeNet.Front folder's integrated terminal.
   - It is available at `https://localhost:5173`

## Development
- Use the provided DTOs and repository patterns to extend business logic.
- Add new migrations with:
  ```sh
  dotnet ef migrations add <MigrationName>
  ```
- Update the database after changes:
  ```sh
  dotnet ef database update
  ```

## License
This project is licensed under the MIT License.
