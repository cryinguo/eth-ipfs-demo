import React from 'react'
import {Route, Link} from './my-react-router-dom'
import Home from './routes/Home'
import User from './routes/User'
import Topics from './routes/Topics'

const App = () => (
    <div>
        <ul className="nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/user">User</Link></li>
            <li><Link to="/topics">Topics</Link></li>
        </ul>
        <hr/>

        <Route exact path="/" component={Home}/>
        <Route path="/user" component={User}/>
        <Route path="/topics" component={Topics}/>
    </div>
);


export default App