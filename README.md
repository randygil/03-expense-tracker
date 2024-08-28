# Expense Tracker CLI

This project is a simple command-line interface (CLI) application for tracking expenses. Users can add, update, delete, and view their expenses, as well as see summaries of their spending.

## Requirements

The application runs from the command line and provides the following features:

1. Add an expense with a description and amount
2. Update an existing expense
3. Delete an expense
4. View all expenses
5. View a summary of all expenses
6. View a summary of expenses for a specific month (of the current year)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/randygil/03-expense-tracker
   cd 03-expense-tracker
   ```

2. Install dependencies:
   ```sh
   yarn
   ```

## Usage

To run the application, use the following command structure:

```sh
npm start -- <command> [options]
```

Available commands:

1. Add an expense:
   ```sh
   npm start -- add --description "Lunch" --amount 20
   ```

2. Update an expense:
   ```sh
   npm start -- update --id <expense-id> --description "Dinner" --amount 30
   ```

3. Delete an expense:
   ```sh
   npm start -- delete --id <expense-id>
   ```

4. List all expenses:
   ```sh
   npm start -- list
   ```

5. View expense summary:
   ```sh
   npm start -- summary
   ```

6. View expense summary for a specific month:
   ```sh
   npm start -- summary --month 8
   ```

## Example

```sh
$ npm start -- add --description "Lunch" --amount 20
Expense added successfully (ID: 1)

$ npm start -- add --description "Dinner" --amount 30
Expense added successfully (ID: 2)

$ npm start -- list
ID  Date        Description  Amount
1   2024-08-28  Lunch        $20
2   2024-08-28  Dinner       $30

$ npm start -- summary
Total expenses: $50

$ npm start -- delete --id 1
Expense deleted successfully

$ npm start -- summary
Total expenses: $30

$ npm start -- summary --month 8
Total expenses for August: $30
```

## Data Storage

Expenses are stored in a JSON file (`expenses.json`) in the same directory as the script.

## Contributions

If you find any issues or have suggestions to improve this project, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.