import React, { Component, createContext } from "react";
const GhostSessions = createContext();
class GhostSessionsProvider extends Component {
  state = { user: "Гость", id: localStorage.getItem("id"), isGhost: true };
  render() {
    return (
      <GhostSessions.Provider value={this.state}>
        {this.props.children}
      </GhostSessions.Provider>
    );
  }
}
export { GhostSessions, GhostSessionsProvider };
