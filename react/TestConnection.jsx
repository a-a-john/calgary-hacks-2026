import { useEffect, useState } from "react";

export default function TestConnection() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/memories/1")
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Connection Test</h1>

      {data.map(memory => (
        <div key={memory.memory_id}>
          <h3>{memory.caption}</h3>
          <p>{memory.memory_date}</p>
          {memory.image_data && (
            <img src={memory.image_data} width="200" />
          )}
        </div>
      ))}
    </div>
  );
}
