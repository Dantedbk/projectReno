import './App.css';
import { Reno } from './Components/RenoComponent/RenoComponent';
import { ProfilerComponent } from './Components/ProfilerComponent/ProfilerComponent';
import IPInfo from 'ip-info-react';
import CodeRunner from "./Components/CodeRunner/CodeEditor";

function App() {


  return (
    <IPInfo>
    <div className="App">

      <div className='nihil'>
          <div className='poe-container'>
           <h2>there was nothing..</h2>
          <Reno/>
          </div>

          <div className='context-container'>
            <ProfilerComponent/>
          </div>

          <div className='text-container'>
            <CodeRunner/>
          </div>


      </div>

    </div>
    </IPInfo>

  );
}

export default App;
