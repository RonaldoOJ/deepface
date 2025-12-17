import { useState } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!image) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Face Analyzer (DeepFace)</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>
        Analyze
      </button>

      {loading && <p>Analyzing...</p>}

      {result && (
        <div>
          <h3>Result</h3>
          <p><b>Age:</b> {result.age}</p>
          <p><b>Gender:</b> {result.gender}</p>
          <p><b>Emotion:</b> {result.emotion}</p>
        </div>
      )}
    </div>
  );
}

export default App;

