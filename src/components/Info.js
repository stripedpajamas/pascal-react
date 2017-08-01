import React from 'react';

class Info extends React.Component {
  render() {
    return (
      <div className="info">
        This tool colors <a href="https://en.wikipedia.org/wiki/Pascal%27s_triangle">Pascal's Triangle</a> based
        on whether or not a node in the triangle is divisible by the specified number (Decider).
      </div>
    )
  }
}

export default Info;