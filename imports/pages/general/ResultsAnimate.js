import React, {Component} from 'react';

class ResultsAnimate extends Component {
  endAnimate = () => {
    Meteor.call('configuration.finish_animation');
    this.props.history.push('/results');
  }

  render = () => {
    setTimeout(this.endAnimate, 13000)
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: "url('/images/results-countdown.gif') center center / cover no-repeat"
        }}
      />
    );
  }
}

export default ResultsAnimate;