import ReactGA from "react-ga4";
import "./App.css";
import {Wrapper} from "./GlobalStyles";
import Header from "./components/Header";
import Transcription from "./components/Transcription";
import {useEffect} from "react";
import {tracking_id} from "./API";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import  Files  from "./components/Files/Files";
import View from "./components/View/View";



function App() {
    useEffect(() => {
        ReactGA.initialize(tracking_id);
        ReactGA.send("pageview");
    }, []);
    return (
        <Router>
            <div className="h-screen">
            <Header/>

            <Routes>
                
                    <Route path="/" element={<Wrapper><Transcription/></Wrapper> }/>
                    <Route path="/files" element={<Wrapper><Files/></Wrapper>}/>
                    <Route path="/files/edit/:id" element={<Wrapper><View/></Wrapper>}/>
               
            </Routes>
            
        </div>
        </Router>
        
    );
}

export default App;
