import * as React from "react";
const F1TelemetryParser = require("f1-telemetry-parser").default;
//import styles from "./styles.css";

export class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      session: {}
    };

    const client = new F1TelemetryParser();
    client.on("SESSION", m => console.log("SESSION", m));
    client.on("MOTION", m => console.log("MOTION", m));
    client.on("LAP_DATA", m => console.log("LAP_DATA", m));
    client.on("EVENT", m => console.log("EVENT", m));
    client.on("PARTICIPANTS", m => console.log("PARTICIPANTS", m));
    client.on("CAR_SETUPS", m => console.log("CAR_SETUPS", m));
    client.on("CAR_TELEMETRY", m => console.log("CAR_TELEMETRY", m));
    client.on("CAR_STATUS", m => console.log("CAR_STATUS", m));
    client.start();
  }

  render() {
    return <div>Hello Appo</div>;
  }
}
