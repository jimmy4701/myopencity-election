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
      social_url
    },
    voted: Boolean,
    voteForMe: functionCallback,
*/

class CandidatePartial extends Component {
  state = {
    display: 'default', // default - bio - photo
  }

  handleDisplay = (value) => this.setState({display: value})

  voteForMe = () => this.props.voteForMe(this.props.candidate._id)

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
              <div className="identity">
                <h3>{candidate.lastname}</h3>
                <p>{candidate.firstname}</p>
              </div>
              <div
                onClick={this.voteForMe}
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

export default styled(CandidatePartial)`
    background-color: #2699FB;
    width: 30em;
    margin: auto;
    padding: 2em;
    border: 15px solid ${({voted}) => voted ? '#B8FFFC' : 'white'};
    border-top-left-radius: 5em;
    > div .avatar {
      position: relative;
      bottom: 4.5em;
      right: 4em; 
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 7px solid ${({voted}) => voted ? '#B8FFFC' : 'white'};
      background-size: cover !important;
    }
    > div .identity {
      border: 1px solid red;
      width: 13em;
      position: absolute;
      top: 3em;
      right: 3em;
    }
`;