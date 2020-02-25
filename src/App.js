import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

function App() {
  const [devs, setDevs] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorSend, setErrorSend] = useState(false);

  useEffect(() => {
    async function loadDevs() {
      try {
        const response = await api.get("/devs");
        setDevs(response.data);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    try {
      const response = await api.post("/devs", data);

      setDevs([...devs, response.data]);
    } catch {
      setErrorSend(true);
    }
  }

  return (
    <div id="app">
      {loading ? (
        <div className="loading">Loading</div>
      ) : (
        <div>
          <aside>
            <strong>Cadastrar</strong>
            <DevForm onSubmit={handleAddDev} error={errorSend} />
          </aside>
          <main>
            {error && !loading ? (
              <div className="error">
                <p>Error to connecting to server...</p>
              </div>
            ) : (
              <ul>
                {devs.map(dev => (
                  <DevItem key={dev._id} dev={dev} />
                ))}
              </ul>
            )}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
