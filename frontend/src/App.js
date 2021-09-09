import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Auth from "./Components/Auth/Auth";
import Chat from "./Components/Chat/Chat";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Auth} />
      <Route path="/chats" component={Chat} />
    </Router>
  );
};
export default App;
