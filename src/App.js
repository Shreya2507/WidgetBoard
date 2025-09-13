import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import { DataProvider } from './context/DataProvider';

function App() {
  return (
    <DataProvider >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
