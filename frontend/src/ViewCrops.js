import { useEffect, useState } from "react";

function ViewCrops() {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/crops")
      .then(res => res.json())
      .then(data => setCrops(data));
  }, []);

  return (
    <div>
      <h2>Available Crops</h2>

      {crops.map((crop) => (
        <div key={crop._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <p><b>Name:</b> {crop.name}</p>
          <p><b>Price:</b> ₹{crop.price}</p>
          <p><b>Quantity:</b> {crop.quantity} kg</p>
        </div>
      ))}
    </div>
  );
}

export default ViewCrops;
