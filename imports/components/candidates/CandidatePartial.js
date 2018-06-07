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
    votable: boolean,
*/

class CandidatePartial extends Component {
  state = {
    display: 'default', // default - bio - photo
  }

  handleDisplay = (value) => this.setState({ display: value })

  toggleVote = () => this.props.toggleVote(this.props.candidate)

  render = () => {
    const { display } = this.state
    const { candidate, className, voted, votable } = this.props
    return (
      <div className={className + " wow fadeInUp " + (display == "photo" && " photo-mode ") + (display === "bio" && " bio-mode")}>
        {display === 'default' ? (
          <div className={"animated fadeIn"}>
            <div
              className="avatar"
              style={{ background: `url(${candidate.image_url}) no-repeat center center` }}
              onClick={() => this.handleDisplay('photo')}
            />
            <div className="identity">
              <h3>{candidate.lastname}</h3>
              <p>{candidate.firstname}</p>
            </div>
            {votable && candidate.votable &&
              <Button
                onClick={this.toggleVote}
                className="vote-button"
              >{voted ? 'Annuler' : 'Voter'}
              </Button>
            }
            <div className="quote">
              <Icon name="quote left" className="quote-left" size="big" />
              <p>{candidate.punchline}</p>
              <Icon className="quote-right" name="quote right" size="big" />
            </div>
            <p className="bio">{_.truncate(candidate.bio, { length: 200, separator: '...' })}</p>
            <Button
              onClick={() => this.handleDisplay('bio')}
              className="see-more-button"
            >Voir plus
            </Button>
            { candidate.social_url && candidate.social_url != '' &&
              <Button
                as="a"
                href={candidate.social_url}
                target="_blank"
                className="social-button"
              ><Icon name="linkify" /> Profil pro
              </Button>
            }
          </div>
        ) : display === 'photo' ? (
          <div className="photo-container animated flipInX">
            <Icon circular onClick={() => this.handleDisplay('default')} name="remove" className="remove-icon" />
          </div>
        ) : display === 'bio' ? (
          <div className="full-bio animated flipInX">
            <Icon circular onClick={() => this.handleDisplay('default')} name="remove" className="remove-icon" />
            {candidate.bio}
          </div>
        ) : ''}
      </div>
    );
  }
}

export default styled(CandidatePartial) `
    background-color: #2699FB;
    width: 30em;
    margin: auto;
    padding: 2em;
    margin-bottom: 2em;
    border: 20px solid ${({ voted }) => voted ? '#B8FFFC' : 'white'};
    border-top-left-radius: 5em;
    min-height: 37em;
    position: relative;

    &.photo-mode{
      background-color: white;
      border: 10px solid #2699FB;
    }

    &.bio-mode{
      background-color: white;
      border: 10px solid #2699FB;
    }

    > div .avatar {
      position: relative;
      bottom: 4.5em;
      cursor: pointer;
      right: 4em; 
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 7px solid ${({ voted }) => voted ? '#B8FFFC' : 'white'};
      background-size: cover !important;
    }
    > div .identity {
      width: 7em;
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
      background-image: url('${({ candidate }) => candidate.image_url}');
      height: 85%;
      background-repeat: no-repeat;
      background-color: red;
      margin-top: 1em;
      background-size: cover;
      background-position: center;
      min-height: 30em;

      > .remove-icon {
        position: absolute;
        background-color: white;
        top: -1.3em;
        right: 5em;
        font-size: 4em;
        cursor: pointer;
        
        @media screen and (max-width: 500px) {
          right: 4em;
        }

        @media screen and (max-width: 374px) {
          right: 3em;
        }
      }
    }
    > div .quote {
      color: white;
      margin-top: -10em;
      > p {
        text-align: center !important;
      }
      > .quote-left{
        position: relative;
        left: -170px;
        top: 5.6em;
        color: white;
        font-size: 1.2em;
        opacity: 0.4;
      }
      > .quote-right {
        position: relative;
        right: -173px;
        bottom: -4em;
        color: white;
        font-size: 1.2em;
        opacity: 0.4;
      }
    }
    > div .bio {
      color: white;
      font-weight: bold;
      @media screen and (max-width: 500px) {
        margin-bottom: 2em;
      }
    }
    > .full-bio {
      padding-top: 4em;
      > .remove-icon {
        position: absolute;
        background-color: white;
        top: -1.2em;
        right: 5.5em;
        font-size: 4em;
        cursor: pointer;
        @media screen and (max-width: 500px) {
          right: 4em;
        }

        @media screen and (max-width: 374px) {
          right: 3em;
        }
      }
    }
    > div .see-more-button {
      background-color: white;
      border-radius: 1em !important;
      position: absolute;
      bottom: 10px;
      left: 10px;
    }
    > div .social-button {
      background-color: white;
      border-radius: 1em !important;
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
`;