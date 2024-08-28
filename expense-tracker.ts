import { Command } from "commander";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs/promises";
import * as path from "path";

interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
}

const DATA_FILE = path.join(__dirname, "expenses.json");

async function readExpenses(): Promise<Expense[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeExpenses(expenses: Expense[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(expenses, null, 2));
}

async function addExpense(description: string, amount: number): Promise<void> {
  const expenses = await readExpenses();
  const newExpense: Expense = {
    id: uuidv4(),
    date: new Date().toISOString().split("T")[0],
    description,
    amount,
  };
  expenses.push(newExpense);
  await writeExpenses(expenses);
  console.log(`Expense added successfully (ID: ${newExpense.id})`);
}

async function updateExpense(
  id: string,
  description: string,
  amount: number
): Promise<void> {
  const expenses = await readExpenses();
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) {
    console.log("Expense not found");
    return;
  }
  expenses[index] = { ...expenses[index], description, amount };
  await writeExpenses(expenses);
  console.log("Expense updated successfully");
}

async function deleteExpense(id: string): Promise<void> {
  const expenses = await readExpenses();
  const updatedExpenses = expenses.filter((e) => e.id !== id);
  if (expenses.length === updatedExpenses.length) {
    console.log("Expense not found");
    return;
  }
  await writeExpenses(updatedExpenses);
  console.log("Expense deleted successfully");
}

async function listExpenses(): Promise<void> {
  const expenses = await readExpenses();
  console.log("ID\tDate\t\tDescription\tAmount");
  expenses.forEach((e) => {
    console.log(`${e.id}\t${e.date}\t${e.description}\t$${e.amount}`);
  });
}

async function summary(): Promise<void> {
  const expenses = await readExpenses();
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  console.log(`Total expenses: $${total}`);
}

async function monthlySummary(month: number): Promise<void> {
  const expenses = await readExpenses();
  const filteredExpenses = expenses.filter((e) => {
    const expenseMonth = new Date(e.date).getMonth() + 1;
    return expenseMonth === month;
  });
  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  console.log(`Total expenses for month ${month}: $${total}`);
}

const program = new Command();

program
  .name("expense-tracker")
  .description("A simple expense tracker CLI application")
  .version("1.0.0");

program
  .command("add")
  .description("Add a new expense")
  .requiredOption("-d, --description <description>", "Expense description")
  .requiredOption("-a, --amount <amount>", "Expense amount")
  .action(async (options) => {
    await addExpense(options.description, parseFloat(options.amount));
  });

program
  .command("update")
  .description("Update an existing expense")
  .requiredOption("-i, --id <id>", "Expense ID")
  .requiredOption("-d, --description <description>", "New expense description")
  .requiredOption("-a, --amount <amount>", "New expense amount")
  .action(async (options) => {
    await updateExpense(
      options.id,
      options.description,
      parseFloat(options.amount)
    );
  });

program
  .command("delete")
  .description("Delete an expense")
  .requiredOption("-i, --id <id>", "Expense ID")
  .action(async (options) => {
    await deleteExpense(options.id);
  });

program
  .command("list")
  .description("List all expenses")
  .action(async () => {
    await listExpenses();
  });

program
  .command("summary")
  .description("Show expense summary")
  .option("-m, --month <month>", "Show summary for a specific month")
  .action(async (options) => {
    if (options.month) {
      await monthlySummary(parseInt(options.month));
    } else {
      await summary();
    }
  });

program.parse(process.argv);
