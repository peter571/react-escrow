import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { EscrowProvider } from './context/EscrowContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <EscrowProvider>
    <App />
  </EscrowProvider>
);
