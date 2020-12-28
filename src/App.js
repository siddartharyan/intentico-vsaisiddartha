import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./styles.css";

export default function App() {
  let [ans, setAns] = useState("");
  let [userinput, setUserinput] = useState("");
  let [user, setUser] = useState(false);
  function handleClick() {
    if (ans.length === 0) return;
    let dup = ans;
    let time = new Date();
    time = Number(time.getHours());
    if (time < 12 && dup === "Good Morning") {
      setUserinput("Great day it is");
    } else if (time === 12 && dup === "Good Morning") {
      setUserinput("Its not a morning. isn't it ?");
    } else if (time < 12 && dup === "Good Morning") {
      setUserinput("Hello,GM?");
    } else if (time === 12 && dup === "Good Morning") {
      setUserinput("Hello, how are you ?");
    } else if (dup !== "Good Morning") {
      setUserinput("Thank you");
    }

    setAns("");
  }

  useEffect(() => {
    try {
      if (Cookies.get("visitor")) {
        let k = Cookies.get("visitor");
        k = k.split("$");
        let cnt = Number(k[0]);
        let time = Number(k[1]);
        let d = Date.now();
        if (d - time >= 86400000) {
          ++cnt;
          let val = `${cnt}$${d}`.toString();
          Cookies.set("visitor", val);
        }
        if (cnt === 7) {
          setUser(true);
        }
      }
    } catch {
      let k = `1$${new Date().getHours()}`.toString();
      Cookies.set("visitor", k);
    }
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="user-input"
        value={ans}
        onChange={(evnt) => setAns(evnt.target.value)}
      />
      <button onClick={handleClick}>submit</button>
      <p>{userinput ? `The message is ${userinput}` : ""}</p>
      <p>{user ? `he logged in 7 days continuously` : ""}</p>
    </div>
  );
}
