import './App.css';
import VirtualShelfList from './VirtualShelfList';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AddVirtualShelf from './AddVirtualShelf';
import AddBook from './AddBook';



function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element = {<VirtualShelfList/>} />
            <Route path="/AddVirtualShelf" element = {<AddVirtualShelf/>} />
            <Route path="/AddVirtualShelf/:id" element = {<AddVirtualShelf/>} />
            <Route path="/AddBook/:id" element = {<AddBook/>} />
          </Routes>
        
        </BrowserRouter>
    </div>
  );
}

export default App;
