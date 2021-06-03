import { BrowserRouter as Router, Route } from 'react-router-dom';

import Page from './components/Page';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Session from './pages/Session';

function App() {
    return (
        <Page>
            <Router>
                <Route exact path="/" component={Home} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/session" component={Session} />
            </Router>
        </Page>
    );
}

export default App;
