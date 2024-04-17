import ReactGA from "react-ga4";
import "./App.css";
import {Wrapper} from "./GlobalStyles";
import Header from "./components/Header";
import Transcription from "./components/Transcription";
import {useEffect} from "react";
import {tracking_id} from "./API";


function App() {
    useEffect(() => {
        ReactGA.initialize(tracking_id);
        ReactGA.send("pageview");
    }, []);
    return (
        <div className="h-screen">
            <Header/>
            <Wrapper>
                <Transcription/>
            </Wrapper>
        </div>
    );
}

export default App;
