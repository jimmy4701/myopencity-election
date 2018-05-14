import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';
import _ from 'lodash';

/*
  @PROPS:
    candidate : {
      image_url,
      firstname,
      lastname,
      punchline,
      bio,
      social_url,
    },
    voted,
    voteForMe: functionCallback,
*/

class CardCandidate extends Component {
  state = {
    display: 'default', // default - bio - photo
  }

  vote = () => {
    console.log("vote !!");
  }

  handleDisplay = (value) => this.setState({display: value})

  render = () => {
    const { display } = this.state;
    const { candidate, className, voteForMe } = this.props;
    return (
      <div className={className}>
          { display === 'default' ? (
            <div>
              <div
                className="avatar"
                style={{background: `url(${candidate.image_url}) no-repeat center center`}}
                onClick={() => this.handleDisplay('photo')}
              />
              <h3>{candidate.lastname}</h3>
              <p>{candidate.firstname}</p>
              <div
                onClick={voteForMe}
              >Voter
              </div>
              <p>{candidate.punchline}</p>
              <p>{_.truncate(candidate.bio, {length: 200, separator: '...'})}</p>
              <div
                onClick={() => this.handleDisplay('bio')}
              >Voir plus
              </div>
            </div>
           ) : display === 'photo' ? (
            <div>
              <div onClick={() => this.handleDisplay('default')}>X</div>
              <Image src={candidate.image_url} size="small" />
            </div>
          ) : display === 'bio' ? (
            <div>
              <div onClick={() => this.handleDisplay('default')} >X</div>
              {candidate.bio}
            </div>
          ):''}
      </div>
    );
  }
}

export default styled(CardCandidate)`
    background-color: #2699FB;
    max-width: 35em;
    margin: auto;
    padding: 2em;
    border: 15px solid white;
    > div .avatar {
        position: relative;
        bottom: 4.5em;
        right: 4em; 
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 15px solid white;
        background-size: cover !important;
    }
`;