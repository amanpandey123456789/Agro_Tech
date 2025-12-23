import { useState, useEffect } from "react";
import { TextField, Button, Typography, Alert, Card, CardContent, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function FarmerDashboard() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [crops, setCrops] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/crops/my", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      const data = await res.json();
      setCrops(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addCrop = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/crops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({ name, price: parseFloat(price), quantity: parseInt(qty) })
      });
      if (res.ok) {
        alert("Crop Added");
        setName("");
        setPrice("");
        setQty("");
        fetchCrops();
      } else {
        const data = await res.json();
        setError(data.message || "Failed to add crop");
      }
    } catch (err) {
      setError("Network error");
    }
    setLoading(false);
  };

  const deleteCrop = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Are you sure you want to delete this crop?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/crops/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      if (res.ok) {
        fetchCrops();
      } else {
        alert("Failed to delete crop");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  const startEdit = (crop) => {
    setEditing(crop._id);
    setName(crop.name);
    setPrice(crop.price.toString());
    setQty(crop.quantity.toString());
  };

  const updateCrop = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:5000/api/crops/${editing}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({ name, price: parseFloat(price), quantity: parseInt(qty) })
      });
      if (res.ok) {
        alert("Crop Updated");
        setName("");
        setPrice("");
        setQty("");
        setEditing(null);
        fetchCrops();
      } else {
        const data = await res.json();
        setError(data.message || "Failed to update crop");
      }
    } catch (err) {
      setError("Network error");
    }
    setLoading(false);
  };

  const cancelEdit = () => {
    setEditing(null);
    setName("");
    setPrice("");
    setQty("");
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Farmer Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        {editing ? "Edit Crop" : "Add New Crop"}
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', marginBottom: '32px' }}>
        <TextField
          label="Crop Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
        <TextField
          label="Quantity (kg)"
          type="number"
          value={qty}
          onChange={e => setQty(e.target.value)}
          required
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={editing ? updateCrop : addCrop}
            disabled={loading}
          >
            {loading ? (editing ? "Updating..." : "Adding...") : (editing ? "Update Crop" : "Add Crop")}
          </Button>
          {editing && (
            <Button
              variant="outlined"
              onClick={cancelEdit}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      <Typography variant="h6" gutterBottom>
        My Crops
      </Typography>
      <Grid container spacing={2}>
        {crops.map(c => (
          <Grid item xs={12} sm={6} md={4} key={c._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{c.name}</Typography>
                <Typography>Price: ₹{c.price}</Typography>
                <Typography>Quantity: {c.quantity} kg</Typography>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                  <IconButton onClick={() => startEdit(c)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteCrop(c._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
