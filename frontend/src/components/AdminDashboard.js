import { useEffect, useState } from "react";
import { Typography, List, ListItem, ListItemText } from '@mui/material';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/users", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Admin Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        User Management
      </Typography>
      {loading ? (
        <Typography>Loading users...</Typography>
      ) : (
        <List>
          {users.map(u => (
            <ListItem key={u._id}>
              <ListItemText primary={`${u.name} - ${u.role}`} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}
