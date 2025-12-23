import { useState } from "react";

function AddCrop() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const addCrop = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/crops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({ name, price, quantity })
    });

    const data = await res.json();
    alert("Crop Added");
  };

  return (
    <div>
      <h2>Add Crop</h2>

      <input placeholder="Crop Name"
        onChange={(e) => setName(e.target.value)} />

      <input placeholder="Price"
        onChange={(e) => setPrice(e.target.value)} />

      <input placeholder="Quantity"
        onChange={(e) => setQuantity(e.target.value)} />

      <button onClick={addCrop}>Add Crop</button>
    </div>
  );
}

export default AddCrop;
