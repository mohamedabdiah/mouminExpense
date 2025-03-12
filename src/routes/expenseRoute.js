const express = require("express");
const { PrismaClient } = require("@prisma/client");
const auth = require("../middleware/auth");

const router = express.Router();
const prisma = new PrismaClient();

// create a new Expense
router.post("/", auth, async (re, res) => {
  try {
    const { description, amount, category, date } = req.body;
    const userId = req.user.id;

    if (!description || !amount || !category || !date) {
      return res.status(400).json({
        message:
          "Please provide all required feilds: Description, amount ,category, ",
      });
    }

    // Validate Amount
    const parseAmount = parseFloat(amount);
    if (isNaN(parseAmount) || parseAmount < 0) {
      return res.status(400).json({
        message: "Invalid Amount",
      });
    }

    // Validate Date
    const parseDate = new Date(date);
    if (isNaN(parseDate.getTime())) {
      return res.status(400).json({
        message: "Invalid Date",
      });
    }
    const expense = await prisma.expense.create({
      data: {
        description: description.trim(),
        amount: parseAmount,
        category: category.trim(),
        date: parseDate,
        userId,
      },
    });
    res.status(201).json(expense);
  } catch (error) {
    console.log("Expens Creation Error: ", error);
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Database Error",
      });
    }
    return;
  }
});

// Get All Expenses
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        date: "desc",
      },
    });

    // calculate total amount
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    res.status(200).json({
      expenses,
      total,
      count: expenses.length,
    });
  } catch (error) {
    console.log("Error Fetching Expeness");
  }
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // check if expense exist and belong
    const expense = await prisma.expense.findFirst({
      where: {
        id: Number(id),
        userId,
      },
    });
    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }
    await prisma.expense.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: "Success Deleted on Expense",
    });
  } catch (error) {
    console.log("Error Deleting");
  }
});

// Update
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { description, amount, category, date } = req.body;

    // check if a expense exist belong to user
    const existingExpense = await prisma.expense.findFirst({
      where: {
        id: Number(id),
        userId,
      },
    });
    if (!existingExpense) {
      return res.status(401).json({
        message: "Expense not found",
      });
    }
    const updatedExpense = await prisma.expense.update({
      where: {
        id: Number(id),
      },
      data: {
        description,
        amount: parseFloat(amount),
        category,
        date: new Date(date),
      },
    });
    res.status(200).json({
      updatedExpense,
    });
  } catch (error) {
    console.log("Error Updating Expense");
  }
});

module.exports = router;
