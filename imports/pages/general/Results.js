import React, {Component} from 'react';
import { Container, Header, Grid } from 'semantic-ui-react';

import CandidatePartialMini from '/imports/components/candidates/CandidatePartialMini'

import _ from 'lodash';

class Results extends Component {
  state = {
    candidates: []
  }

  componentDidMount() {
    const { show_results } = Session.get('global_configuration');
    if(show_results) {
      Meteor.call('candidates.elected', (e, candidates) => {
        if (e) {
          Bert.alert({
            title: e.message,
            type: "danger",
            style: "growl-bottom-left",
          })
        } else {
          this.setState({candidates : _.sortBy(candidates, ["lastname", "firstname"])});
        }
      })
    }
  }

  render = () => {
    const { candidates } = this.state;
    return (
      <Grid style={{paddingTop: '5em'}}>
        <Grid.Column width={16}>
          <Header style={{paddingBottom: '2em'}} as="h1" >Resultats des votes</Header>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              alignItems: 'baseline',
              alignContent: 'stretch',
            }}
          >
            {candidates.map(candidate => <CandidatePartialMini candidate={candidate} />)}
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Results;