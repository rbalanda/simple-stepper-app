import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import Stepper from './organisms/Stepper';
import InitStateAppProvider from './hocs/InitStateAppProvider'
import { steps } from './steps';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <InitStateAppProvider steps={steps} >
        <Stepper steps={steps} >
          <Switch>
            {steps.map((el, i) => (
              <Route key={i} path={el.path}>
                <div className="currentStep">
                  <p> Step {el.name} </p>
                </div>
              </Route>
            ))}
          </Switch>
        </Stepper>
      </InitStateAppProvider>
    </BrowserRouter>
  );
}

export default App;
