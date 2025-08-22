import React from 'react';
import { 
  Box, 
  Typography, 
  Stack, 
  Card, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  IconButton, 
  Chip, 
  Tabs, 
  Tab, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions 
} from '@mui/material';
import { collection, onSnapshot, query, addDoc, doc, updateDoc, deleteDoc, serverTimestamp, where } from 'firebase/firestore';
import { PlusCircle, Edit, Trash2, Calendar, MapPin, Receipt, CreditCard, FileText, Upload } from 'lucide-react';
import { db } from '../../App';

const expenseCategories = {
  subscriptions: {
    label: 'Subscriptions',
    icon: CreditCard,
    color: '#9513fb',
    bgColor: '#e6ccff',
    subcategories: ['Software', 'Services', 'Media', 'Cloud Storage', 'Marketing Tools', 'Other']
  },
  travel: {
    label: 'Travel',
    icon: MapPin,
    color: '#1092ef',
    bgColor: '#a6d6f8',
    subcategories: ['Flights', 'Hotels', 'Car Rental', 'Gas', 'Parking', 'Public Transport', 'Other']
  },
  meals: {
    label: 'Meals & Entertainment',
    icon: Receipt,
    color: '#f5640d',
    bgColor: '#ffc5a3',
    subcategories: ['Business Meals', 'Client Entertainment', 'Team Lunch', 'Conference Meals', 'Other']
  },
  office: {
    label: 'Office Expenses',
    icon: FileText,
    color: '#45b020',
    bgColor: '#c1f5af',
    subcategories: ['Supplies', 'Equipment', 'Furniture', 'Utilities', 'Internet', 'Phone', 'Other']
  }
};

export const ExpenseScreen = ({ userId }) => {
  const [expenses, setExpenses] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState('all');
  const [showForm, setShowForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    date: '',
    description: '',
    category: 'subscriptions',
    subcategory: '',
    amount: '',
    vendor: '',
    notes: '',
    receiptUrl: '',
    isRecurring: false,
    recurringPeriod: 'monthly'
  });
  const [editingId, setEditingId] = React.useState(null);
  const [showReceiptDialog, setShowReceiptDialog] = React.useState(false);
  const [selectedReceipt, setSelectedReceipt] = React.useState('');

  React.useEffect(() => {
    if (!userId) return;
    const q = query(collection(db, `users/${userId}/expenses`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate().toISOString().split('T')[0]
      }));
      setExpenses(data);
    });
    return () => unsubscribe();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      // Reset subcategory when category changes
      ...(name === 'category' ? { subcategory: '' } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.description || !formData.amount || !formData.vendor) {
      alert("Please fill all required fields.");
      return;
    }

    const dataToSave = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    if (editingId) {
      const docRef = doc(db, `users/${userId}/expenses`, editingId);
      await updateDoc(docRef, { ...dataToSave, updatedAt: serverTimestamp() });
    } else {
      await addDoc(collection(db, `users/${userId}/expenses`), dataToSave);
    }
    resetForm();
  };

  const handleEdit = (item) => {
    setFormData({
      ...item,
      amount: item.amount.toString(),
      isRecurring: item.isRecurring || false,
      recurringPeriod: item.recurringPeriod || 'monthly'
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      const docRef = doc(db, `users/${userId}/expenses`, id);
      await deleteDoc(docRef);
    }
  };

  const resetForm = () => {
    setFormData({
      date: '',
      description: '',
      category: 'subscriptions',
      subcategory: '',
      amount: '',
      vendor: '',
      notes: '',
      receiptUrl: '',
      isRecurring: false,
      recurringPeriod: 'monthly'
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleViewReceipt = (receiptUrl) => {
    setSelectedReceipt(receiptUrl);
    setShowReceiptDialog(true);
  };

  const filteredExpenses = activeTab === 'all' 
    ? expenses 
    : expenses.filter(expense => expense.category === activeTab);

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);

  const getExpensesByCategory = () => {
    const categoryTotals = {};
    Object.keys(expenseCategories).forEach(cat => {
      categoryTotals[cat] = expenses
        .filter(exp => exp.category === cat)
        .reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
    });
    return categoryTotals;
  };

  const categoryTotals = getExpensesByCategory();

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Manrope, Helvetica",
            fontWeight: 800,
            color: "white",
            fontSize: "32px",
          }}
        >
          Expense Manager
        </Typography>
        <Button
          onClick={() => { setShowForm(!showForm); if (editingId) resetForm(); }}
          sx={{
            height: "48px",
            borderRadius: "10px",
            background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
            fontFamily: "Sora",
            fontWeight: 600,
            fontSize: "12px",
            color: "white",
            textTransform: "none",
            px: 3,
            "&:hover": {
              background: "linear-gradient(90deg, rgba(62,121,229,0.8) 0%, rgba(1,184,227,0.8) 100%)",
            },
          }}
        >
          <PlusCircle size={18} style={{ marginRight: 8 }} />
          {showForm ? 'Close Form' : 'Add Expense'}
        </Button>
      </Stack>

      {/* Category Summary Cards */}
      <Stack direction="row" spacing={3} sx={{ mb: 4, overflowX: 'auto' }}>
        {Object.entries(expenseCategories).map(([key, category]) => {
          const IconComponent = category.icon;
          return (
            <Card
              key={key}
              sx={{
                minWidth: "200px",
                height: "100px",
                background: "rgba(250, 251, 252, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "10px",
                p: 2,
                cursor: "pointer",
                "&:hover": {
                  background: "rgba(250, 251, 252, 0.15)",
                },
              }}
              onClick={() => setActiveTab(key)}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    background: category.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconComponent size={20} color={category.color} />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Sora",
                      fontWeight: 600,
                      color: "white",
                      fontSize: "12px",
                      mb: 0.5,
                    }}
                  >
                    {category.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Manrope",
                      fontWeight: 700,
                      color: category.color,
                      fontSize: "18px",
                    }}
                  >
                    ${categoryTotals[key]?.toFixed(2) || '0.00'}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          );
        })}
      </Stack>

      {/* Tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            "& .MuiTab-root": {
              color: "#a4b4cb",
              fontFamily: "Sora",
              fontSize: "12px",
              textTransform: "none",
              "&.Mui-selected": {
                color: "#3d7ae5",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#3d7ae5",
            },
          }}
        >
          <Tab label="All Expenses" value="all" />
          <Tab label="Subscriptions" value="subscriptions" />
          <Tab label="Travel" value="travel" />
          <Tab label="Meals" value="meals" />
          <Tab label="Office" value="office" />
        </Tabs>
      </Box>

      {/* Form */}
      {showForm && (
        <Card
          sx={{
            width: "100%",
            background: "rgba(250, 251, 252, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "10px",
            p: 3,
            mb: 4,
          }}
        >
          <Typography
            sx={{
              fontFamily: "Sora",
              fontWeight: 600,
              color: "white",
              fontSize: "18px",
              mb: 3,
            }}
          >
            {editingId ? 'Edit Expense' : 'Add New Expense'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={2}>
                <TextField
                  type="date"
                  name="date"
                  label="Date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  sx={{ flex: 1 }}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  name="vendor"
                  label="Vendor/Company"
                  value={formData.vendor}
                  onChange={handleInputChange}
                  required
                  sx={{ flex: 1 }}
                />
                <TextField
                  type="number"
                  name="amount"
                  label="Amount ($)"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  sx={{ flex: 1 }}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flex: 1 }}>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    displayEmpty
                  >
                    {Object.entries(expenseCategories).map(([key, category]) => (
                      <MenuItem key={key} value={key}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                  <Select
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                    displayEmpty
                  >
                    <MenuItem value="">Select Subcategory</MenuItem>
                    {expenseCategories[formData.category]?.subcategories.map((sub) => (
                      <MenuItem key={sub} value={sub}>
                        {sub}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <TextField
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
                multiline
                rows={2}
              />

              <TextField
                name="notes"
                label="Additional Notes"
                value={formData.notes}
                onChange={handleInputChange}
                multiline
                rows={2}
              />

              <TextField
                name="receiptUrl"
                label="Receipt URL (optional)"
                value={formData.receiptUrl}
                onChange={handleInputChange}
                placeholder="https://..."
              />

              <Stack direction="row" spacing={2} alignItems="center">
                <FormControl>
                  <label>
                    <input
                      type="checkbox"
                      name="isRecurring"
                      checked={formData.isRecurring}
                      onChange={handleInputChange}
                      style={{ marginRight: 8 }}
                    />
                    <Typography component="span" sx={{ color: "white", fontSize: "12px" }}>
                      Recurring Expense
                    </Typography>
                  </label>
                </FormControl>
                {formData.isRecurring && (
                  <FormControl sx={{ minWidth: 120 }}>
                    <Select
                      name="recurringPeriod"
                      value={formData.recurringPeriod}
                      onChange={handleInputChange}
                      size="small"
                    >
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="quarterly">Quarterly</MenuItem>
                      <MenuItem value="yearly">Yearly</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </Stack>

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  type="button"
                  onClick={resetForm}
                  sx={{
                    height: "40px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#d2e0f5",
                    fontFamily: "Sora",
                    fontWeight: 400,
                    fontSize: "12px",
                    textTransform: "none",
                    px: 3,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  sx={{
                    height: "40px",
                    borderRadius: "8px",
                    background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
                    color: "white",
                    fontFamily: "Sora",
                    fontWeight: 600,
                    fontSize: "12px",
                    textTransform: "none",
                    px: 3,
                  }}
                >
                  {editingId ? 'Update' : 'Save'} Expense
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Card>
      )}

      {/* Summary */}
      <Card
        sx={{
          width: "100%",
          background: "rgba(250, 251, 252, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "10px",
          p: 3,
          mb: 3,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography
            sx={{
              fontFamily: "Sora",
              fontWeight: 600,
              color: "white",
              fontSize: "16px",
            }}
          >
            {activeTab === 'all' ? 'Total Expenses' : `${expenseCategories[activeTab]?.label} Expenses`}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Manrope",
              fontWeight: 800,
              color: "#f87171",
              fontSize: "24px",
            }}
          >
            ${totalExpenses.toFixed(2)}
          </Typography>
        </Stack>
      </Card>

      {/* Expenses Table */}
      <Card
        sx={{
          width: "100%",
          background: "rgba(250, 251, 252, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}>
              <TableRow>
                <TableCell sx={{ color: "#d2e0f5", fontWeight: 600, fontSize: "12px" }}>Date</TableCell>
                <TableCell sx={{ color: "#d2e0f5", fontWeight: 600, fontSize: "12px" }}>Vendor</TableCell>
                <TableCell sx={{ color: "#d2e0f5", fontWeight: 600, fontSize: "12px" }}>Description</TableCell>
                <TableCell sx={{ color: "#d2e0f5", fontWeight: 600, fontSize: "12px" }}>Category</TableCell>
                <TableCell sx={{ color: "#d2e0f5", fontWeight: 600, fontSize: "12px" }}>Amount</TableCell>
                <TableCell sx={{ color: "#d2e0f5", fontWeight: 600, fontSize: "12px" }}>Receipt</TableCell>
                <TableCell sx={{ color: "#d2e0f5", fontWeight: 600, fontSize: "12px" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map(expense => (
                <TableRow key={expense.id} sx={{ "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.02)" } }}>
                  <TableCell sx={{ color: "white", fontSize: "12px" }}>{expense.date}</TableCell>
                  <TableCell sx={{ color: "white", fontSize: "12px" }}>{expense.vendor}</TableCell>
                  <TableCell sx={{ color: "white", fontSize: "12px", maxWidth: "200px" }}>
                    {expense.description}
                    {expense.isRecurring && (
                      <Chip
                        label={`Recurring ${expense.recurringPeriod}`}
                        size="small"
                        sx={{
                          ml: 1,
                          backgroundColor: "#e6ccff",
                          color: "#9513fb",
                          fontSize: "8px",
                          height: "16px",
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip
                        label={expenseCategories[expense.category]?.label || expense.category}
                        sx={{
                          backgroundColor: expenseCategories[expense.category]?.bgColor || "#ffc5a3",
                          color: expenseCategories[expense.category]?.color || "#f5640d",
                          fontSize: "10px",
                          height: "20px",
                        }}
                      />
                      {expense.subcategory && (
                        <Typography sx={{ color: "#a4b4cb", fontSize: "10px" }}>
                          {expense.subcategory}
                        </Typography>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ color: "white", fontSize: "12px", fontWeight: 600 }}>
                    ${parseFloat(expense.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {expense.receiptUrl ? (
                      <IconButton
                        onClick={() => handleViewReceipt(expense.receiptUrl)}
                        sx={{ color: "#01b8e3", "&:hover": { color: "#3d7ae5" } }}
                        size="small"
                      >
                        <FileText size={16} />
                      </IconButton>
                    ) : (
                      <Typography sx={{ color: "#5b5b5b", fontSize: "10px" }}>No receipt</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        onClick={() => handleEdit(expense)}
                        sx={{ color: "#01b8e3", "&:hover": { color: "#3d7ae5" } }}
                        size="small"
                      >
                        <Edit size={16} />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(expense.id)}
                        sx={{ color: "#f87171", "&:hover": { color: "#ef4444" } }}
                        size="small"
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Receipt Dialog */}
      <Dialog
        open={showReceiptDialog}
        onClose={() => setShowReceiptDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ color: "white", backgroundColor: "#050624" }}>
          Receipt View
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#050624", p: 2 }}>
          {selectedReceipt ? (
            <Box
              component="iframe"
              src={selectedReceipt}
              sx={{
                width: "100%",
                height: "500px",
                border: "none",
                borderRadius: "8px",
              }}
            />
          ) : (
            <Typography sx={{ color: "white", textAlign: "center", py: 4 }}>
              No receipt available
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#050624" }}>
          <Button
            onClick={() => setShowReceiptDialog(false)}
            sx={{ color: "#d2e0f5" }}
          >
            Close
          </Button>
          {selectedReceipt && (
            <Button
              onClick={() => window.open(selectedReceipt, '_blank')}
              sx={{
                background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
                color: "white",
              }}
            >
              Open in New Tab
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};
