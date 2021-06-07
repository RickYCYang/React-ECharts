import './App.css';
import EChart from './Component/EChart';

function App() {

  const style = {
    height: '100vh',
    width: '100vw',
    padding: '50px',
    boxSizing: 'border-box'
  }

  return (
    <div style = {style}>
      <EChart/>
    </div>
  );
}

export default App;
