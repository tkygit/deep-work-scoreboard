import { BrowserRouter as Router, Route } from 'react-router-dom';

import { AuthProvider } from './context/auth';

import Page from './components/Page';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import StartSession from './pages/StartSession';
import SingleSession from './pages/SingleSession';

function App() {
    return (
        <AuthProvider>
            <Page>
                <Router>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/session" component={StartSession} />
                    <Route exact path="/session/:sessionId" component={SingleSession} />
                </Router>
            </Page>
        </AuthProvider>
    );
}

export default App;
