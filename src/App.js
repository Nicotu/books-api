import "./App.css";
import { BookList } from "./components/BookList";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Container maxWidth="lg">
          <Route exact path="/:id?" component={BookList} />
        </Container>
      </Router>
    </div>
  );
}

export default App;
