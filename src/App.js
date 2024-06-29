import {Route, Redirect, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import RenderVideo from './components/RenderVideo'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/videos/:id" component={RenderVideo} />
    <ProtectedRoute exact path="/trending" component={Trending} />
    <ProtectedRoute exact path="/gaming" component={Gaming} />
    <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
    <Route exact path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
