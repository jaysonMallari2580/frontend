import logo from './logo.svg';
import './App.css';
import InterestratesService from './InterestratesService';
import InterestratesList from './InterestratesList';
import { BrowserRouter } from  'react-router-dom'
import { Route, Link } from  'react-router-dom'

function App() {

  const  BaseLayout  = () => (
    <div  className="container">
        <div  className="content">
            <Route  path="/"  exact  component={InterestratesList}  />
        </div>
    </div>
    )

  return (
    <BrowserRouter>
        <BaseLayout/>
    </BrowserRouter>
  );
}

export default App;
