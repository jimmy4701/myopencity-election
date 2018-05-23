import React, { Component } from 'react'
import { Image, Button, Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import _ from 'lodash'

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
    toggleVote: functionCallback,
*/

class CandidatePartial extends Component {
  state = {
    display: 'default', // default - bio - photo
  }

  handleDisplay = (value) => this.setState({display: value})

  toggleVote = () => this.props.toggleVote(this.props.candidate)

  render = () => {
    const { display } = this.state
    const { candidate, className, voted } = this.props
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
              <Button
                onClick={this.toggleVote}
                className="vote-button"
              >{voted ? 'Annuler' : 'Voter' }
              </Button>
              <p>{candidate.punchline}</p>
              <p>{_.truncate(candidate.bio, {length: 200, separator: '...'})}</p>
              <Button
                onClick={() => this.handleDisplay('bio')}
              >Voir plus
              </Button>
            </div>
           ) : display === 'photo' ? (
            <div className="photo-container">
              <Icon onClick={() => this.handleDisplay('default')} name="remove" className="remove-icon"/>
            </div>
          ) : display === 'bio' ? (
            <div>
              <Icon onClick={() => this.handleDisplay('default')} name="remove" className="remove-icon" />
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
    height: 37em;
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
      width: 13em;
      position: relative;
      top: -7em;
      right: -5.4em;
      text-transform: uppercase;
      font-size: 2em;
      color: white;
      text-align: left;
      > h3 {
        margin-bottom: 0;
        font-size: 
      }
    }
    > div .vote-button {
      background-color: white;
      color: #2699FB;
      border-radius: 0 1em !important;
      font-size: 1.5em;
      width: 9em;
      position: relative;
      top: -8em;
      right: -4em;
      padding: 0.5em;
    }
    > .photo-container {
      background-image: url('${({candidate}) => candidate.image_url}');
      height: 85%;
      background-repeat: no-repeat;
      background-color: red;
      margin-top: 1em;
      background-size: cover;
      background-position: center;

      > .remove-icon {
        position: relative;
        top: -0.3em;
        right: 3.8em;
        font-size: 3em;
      }
    }
`;