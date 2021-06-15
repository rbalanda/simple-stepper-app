import { useEffect } from "react";
import { useHistory } from "react-router";

function useInitApp(steps) {

  const history = useHistory();

  useEffect(() => {
    const oldSessionStep = localStorage.getItem("Step");
    oldSessionStep
      ? history.replace(steps[oldSessionStep].path)
      : history.replace(steps[0].path);
  }, []);
}

export default useInitApp;