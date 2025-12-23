import { useEffect, useState } from "react";
import { Typography, Grid, Card, CardContent } from '@mui/material';

export default function CustomerDashboard() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/crops")
      .then(res => res.json())
      .then(data => {
        setCrops(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Customer Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        Browse Available Crops
      </Typography>
      {loading ? (
        <Typography>Loading crops...</Typography>
      ) : (
        <Grid container spacing={2}>
          {crops.map(c => (
            <Grid item xs={12} sm={6} md={4} key={c._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{c.name}</Typography>
                  <Typography>Price: ₹{c.price}</Typography>
                  <Typography>Quantity: {c.quantity} kg</Typography>
                  <Typography>Farmer: {c.farmerId?.name || 'Unknown'}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}