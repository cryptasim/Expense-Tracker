import express from 'express';
import Expense from '../models/Expense.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new expense
router.post('/', protect, async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    const expense = new Expense({
      user: req.user,
      title,
      amount,
      category,
      date,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    console.error('Create Expense Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all expenses for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user });
    res.json(expenses);
  } catch (err) {
    console.error('Get Expenses Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an expense by ID
router.put('/:id', protect, async (req, res) => {
  try {
    console.log('req.user:', req.user);

    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    console.log('expense.user:', expense.user.toString());

    if (expense.user.toString() !== req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { title, amount, category, date } = req.body;

    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.date = date || expense.date;

    await expense.save();
    res.json(expense);
  } catch (err) {
    console.error('Update Expense Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an expense by ID
router.delete('/:id', protect, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    if (expense.user.toString() !== req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await expense.deleteOne();  
    res.json({ message: 'Expense removed' });
  } catch (err) {
    console.error('Delete Expense Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
