import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import Room from './pages/Room';

import { AuthContenxtProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContenxtProvider>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContenxtProvider>
    </BrowserRouter >
  );
}

export default App;
