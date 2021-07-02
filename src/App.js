import NavBar from './components/navbar';
import ChooseCreate from './components/chooseCreate';
import Create from './components/create';
import Footer from './components/footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
     {/* <ChooseCreate /> */}
     <Create />
      <Footer />
      
    
    </div>
  );
}

export default App;
