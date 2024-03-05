import './App.css';
import Competitions from './Competitions';

import { BrowserRouter, Route, Routes } from "react-router-dom"
import NotFound from './notFound';
import Add from './addCompetition';


function App() {
    return (
        <BrowserRouter>
          
            <Routes>
                <Route path="/" element={<Competitions />} />
                <Route path="/CompetitionDetails" element={<competitionDetails />} />
                <Route path="/add" element={<Add />} /> 
                <Route path="*" element={<NotFound />} />  
            </Routes>
        </BrowserRouter>
       
    );
}

export default App;