import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';

import { AuthContenxtProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContenxtProvider>
        <Route path="/" component={Home} exact />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContenxtProvider>
    </BrowserRouter >
  );
}

export default App;
