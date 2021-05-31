import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Session from './pages/Session';

function App() {
    return (
        <Router>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/session" component={Session} />
        </Router>
    );
}

export default App;
