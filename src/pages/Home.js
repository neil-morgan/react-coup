import React, { useEffect } from "react";
import { Lobby } from "../components";

const Home = ({ history }) => {
  // const [errMsg, setErrMsg] = useState("")

  // handle URL to a room that doesn't exist
  useEffect(() => {
    let timer;
    if (history.location.state && history.location.state.invalidRoom) {
      // setErrMsg("room does not exist!")
      // reset error message
      timer = setTimeout(() => {
        // setErrMsg("")
        history.replace();
      }, 4000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [history]);

  return <Lobby history={history} />;
};

export default Home;
