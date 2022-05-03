import React, {useState} from 'react';
import Routes from './Routes';
import { HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from './Components/Slider/Slider'

const App = () => {
    return <div className="grid grid-cols-12 gap-4">
        <Slider left="1" /><div className="col-span-8 lg:col-span-8 md:col-span-12 sm:col-span-12 xs:col-span-12"><HashRouter><Routes /></HashRouter></div><Slider left="2"/>
    </div>;
}

export default App;