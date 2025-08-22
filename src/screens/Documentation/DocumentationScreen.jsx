import React from 'react';
import { Box, Typography, Stack, Card, TextField, Button, IconButton } from '@mui/material';
import { collection, onSnapshot, query, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { Edit, Trash2 } from 'lucide-react';
import { db } from '../../App';

export const DocumentationScreen = ({ userId }) => {
  const [docs, setDocs] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [editingId, setEditingId] = React.useState(null);

  React.useEffect(() => {
    if (!userId) return;
    const q = query(collection(db, `users/${userId}/docs`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDocs(data);
    });
    return () => unsubscribe();
  }, [userId]);

  const handleSaveDoc = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }
    const dataToSave = { title, content, updatedAt: serverTimestamp() };
    if (editingId) {
      const docRef = doc(db, `users/${userId}/docs`, editingId);
      await updateDoc(docRef, dataToSave);
    } else {
      await addDoc(collection(db, `users/${userId}/docs`), { 
        ...dataToSave, 
        createdAt: serverTimestamp() 
      });
    }
    resetForm();
  };

  const handleEdit = (doc) => {
    setTitle(doc.title);
    setContent(doc.content);
    setEditingId(doc.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      const docRef = doc(db, `users/${userId}/docs`, id);
      await deleteDoc(docRef);
    }
  };
  
  const resetForm = () => {
    setTitle('');
    setContent('');
    setEditingId(null);
  };

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Manrope, Helvetica",
          fontWeight: 800,
          color: "white",
          fontSize: "32px",
          mb: 4,
        }}
      >
        Documentation
      </Typography>

      <Stack direction="row" spacing={4}>
        {/* Form */}
        <Card
          sx={{
            width: "400px",
            background: "rgba(250, 251, 252, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "10px",
            p: 3,
            height: "fit-content",
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
            {editingId ? 'Edit Document' : 'New Document'}
          </Typography>
          
          <Stack spacing={3}>
            <TextField
              placeholder="Document Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              placeholder="Document content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              rows={12}
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              <Button
                onClick={handleSaveDoc}
                sx={{
                  flex: 1,
                  height: "40px",
                  borderRadius: "8px",
                  background: "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
                  color: "white",
                  fontFamily: "Sora",
                  fontWeight: 600,
                  fontSize: "12px",
                  textTransform: "none",
                }}
              >
                {editingId ? 'Update' : 'Save'}
              </Button>
              {editingId && (
                <Button
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
              )}
            </Stack>
          </Stack>
        </Card>

        {/* Documents List */}
        <Box sx={{ flex: 1 }}>
          <Stack spacing={3}>
            {docs.map(doc => (
              <Card
                key={doc.id}
                sx={{
                  background: "rgba(250, 251, 252, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  p: 3,
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "Manrope",
                        fontWeight: 700,
                        color: "white",
                        fontSize: "16px",
                        mb: 1,
                      }}
                    >
                      {doc.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Sora",
                        fontWeight: 400,
                        color: "#a4b4cb",
                        fontSize: "10px",
                      }}
                    >
                      Last updated: {doc.updatedAt?.toDate().toLocaleString()}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      onClick={() => handleEdit(doc)}
                      sx={{ color: "#01b8e3", "&:hover": { color: "#3d7ae5" } }}
                      size="small"
                    >
                      <Edit size={16} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(doc.id)}
                      sx={{ color: "#f87171", "&:hover": { color: "#ef4444" } }}
                      size="small"
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </Stack>
                </Stack>
                <Typography
                  sx={{
                    fontFamily: "Sora",
                    fontWeight: 400,
                    color: "#d2e0f5",
                    fontSize: "12px",
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.6,
                  }}
                >
                  {doc.content}
                </Typography>
              </Card>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
