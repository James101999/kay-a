import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import AddItem from './components/AddItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>KAY-A</h2>
        <p>KAY-A is an application made with ReactJS to help its users track their groceries/stocks at home.</p>
      </header>
      <AddItem />
    </div>
  );
}

export default App;
