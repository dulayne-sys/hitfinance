import React from 'react';
import { Box, Typography, Stack, Card, CardContent, Button, TextField, Select, MenuItem, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip } from '@mui/material';
import { collection, onSnapshot, query, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { db } from '../../App';

export const LedgerScreen = ({ userId }) => {
  const [ledger, setLedger] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [formData, setFormData] = React.useState({ 
    date: '', 
    description: '', 
    category: '', 
    type: 'revenue', 
    amount: '' 
  });
  const [editingId, setEditingId] = React.useState(null);

  React.useEffect(() => {
    if (!userId) return;
    const q = query(collection(db, `users/${userId}/ledger`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(), 
        date: doc.data().date?.toDate().toISOString().split('T')[0] 
      }));
      setLedger(data);
    });
    return () => unsubscribe();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.description || !formData.amount) {
      alert("Please fill all required fields.");
      return;
    }
    
    const dataToSave = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date),
      createdAt: serverTimestamp()
    };

    if (editingId) {
      const docRef = doc(db, `users/${userId}/ledger`, editingId);
      await updateDoc(docRef, dataToSave);
    } else {
      await addDoc(collection(db, `users/${userId}/ledger`), dataToSave);
    }
    resetForm();
  };

  const handleEdit = (item) => {
    setFormData({ ...item, amount: item.amount.toString() });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      const docRef = doc(db, `users/${userId}/ledger`, id);
      await deleteDoc(docRef);
    }
  };

  const resetForm = () => {
    setFormData({ date: '', description: '', category: '', type: 'revenue', amount: '' });
    setEditingId(null);
    setShowForm(false);
  };

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
          Finance Ledger
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
          {showForm ? 'Close Form' : 'Add Entry'}
        </Button>
      </Stack>

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
            {editingId ? 'Edit Entry' : 'Add New Entry'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <TextField
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                sx={{ flex: 1 }}
              />
              <TextField
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
                sx={{ flex: 2 }}
              />
              <TextField
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleInputChange}
                sx={{ flex: 1 }}
              />
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <FormControl sx={{ flex: 1 }}>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <MenuItem value="revenue">Revenue</MenuItem>
                  <MenuItem value="cost">Cost</MenuItem>
                </Select>
              </FormControl>
              <TextField
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
                sx={{ flex: 1 }}
              />
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
                {editingId ? 'Update' : 'Save'} Entry
              </Button>
            </Stack>
          </Box>
        </Card>
      )}

      {/* Table */}
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
                <TableCell sx={{ color: "#d2e0f5", fontWeight: 600, fontSize: "12px" }}>Description</TableCell>
                <TableCell sx={{ color: "#d2e0f5", fontWeight: 600, fontSize: "12px" }}>Category</TableCell>
                <TableCell sx={{ color: "#d2e0f5", fontWeight: 600, fontSize: "12px" }}>Type</TableCell>
                <TableCell sx={{ color: "#d2e0f5", fontWeight: 600, fontSize: "12px" }}>Amount</TableCell>
                <TableCell sx={{ color: "#d2e0f5", fontWeight: 600, fontSize: "12px" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ledger.sort((a, b) => new Date(b.date) - new Date(a.date)).map(item => (
                <TableRow key={item.id} sx={{ "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.02)" } }}>
                  <TableCell sx={{ color: "white", fontSize: "12px" }}>{item.date}</TableCell>
                  <TableCell sx={{ color: "white", fontSize: "12px" }}>{item.description}</TableCell>
                  <TableCell sx={{ color: "white", fontSize: "12px" }}>{item.category}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.type}
                      sx={{
                        backgroundColor: item.type === 'revenue' ? "#c1f5af" : "#fdbcff",
                        color: item.type === 'revenue' ? "#45b01f" : "#d22bd5",
                        fontSize: "10px",
                        height: "20px",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "white", fontSize: "12px", fontWeight: 600 }}>
                    ${parseFloat(item.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        onClick={() => handleEdit(item)}
                        sx={{ color: "#01b8e3", "&:hover": { color: "#3d7ae5" } }}
                        size="small"
                      >
                        <Edit size={16} />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(item.id)}
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
    </Box>
  );
};
