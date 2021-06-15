import { useCallback, useEffect, useMemo, useState } from "react";
import { withRouter } from "react-router";
import Button from "../../atoms/Button";
import "./style.css";

function Stepper({ location, history, steps, children }) {

  const [isCompleted, setIsCompleted] = useState(false);

  const currentIndex = useMemo(
    () => steps.findIndex((el) => el.path === location.pathname) || 0,
    [location, steps]
  );
  const isFirstStep = useMemo(() => currentIndex === 0, [currentIndex]);
  const isLastStep = useMemo(
    () => currentIndex === steps.length - 1,
    [currentIndex, steps]
  );

  useEffect(() => {
    setIsCompleted(false);
  }, [currentIndex]);

  const nextStep = useCallback(() => {
    if (currentIndex >= steps.length - 1) {
      return;
    }
    history.replace(steps[currentIndex + 1].path);
    localStorage.setItem("Step", currentIndex+1);
  }, [currentIndex, steps]);

  const previousStep = useCallback(() => {
    localStorage.setItem("Step", currentIndex-1);
    history.replace(steps[currentIndex - 1].path);
  }, [currentIndex, steps]);

  const setAllStepsCompleted = useCallback(() => {
    localStorage.removeItem("Step");
    setIsCompleted(true);
  }, []);

  const reset = useCallback(() => {
    history.replace(steps[0].path);
  }, []);

  return (
    <div>
      <div className="stepsTitleWrapper">
        {steps.map((el, i) => (
          <div
            key={i}
            className={
              (currentIndex === i && !isCompleted
                ? "active "
                : currentIndex >= i
                  ? "complete "
                  : "") + "stepTitle"
            }
          >
            <p>{el.name}</p>
            {i !== steps.length - 1 && <div className="horizontalLine" />}
          </div>
        ))}
      </div>
      <section className="stepsWrapper">
        {isCompleted ? <p>All steps completed - you're finished</p> : children}
      </section>
      <div className="buttonsWrapper">
        {isCompleted ? (
          <Button onClick={reset}>Reset</Button>
        ) : (
          <>
            {!isFirstStep && (
              <Button onClick={previousStep} className="buttonLeft">
                Back
              </Button>
            )}
            <Button
              onClick={!isLastStep ? nextStep : setAllStepsCompleted}
              className="buttonRight"
            >
              {!isLastStep ? "Next" : "Finish"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default withRouter(Stepper);
