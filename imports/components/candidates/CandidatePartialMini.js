import React from 'react'
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
    }
*/

const CandidatePartialMini = ({ candidate, className, nbVotes }) => (
  <div className={className + " animated fadeInUp "}>
      <div
        className="avatar"
        style={{background: `url(${candidate.image_url}) no-repeat center center`}}
        onClick={() => this.handleDisplay('photo')}
      />
      <div className="identity">
        <h3>{candidate.lastname}</h3>
        <p className="firstname">{candidate.firstname}</p>
      </div>
      <p className="total-votes">{candidate.votes} votes</p>
  </div>
);

export default styled(CandidatePartialMini)`
    background-color: #2699FB;
    width: 30em;
    margin: auto;
    padding: 1em 2em 2em 2em;
    margin-bottom: 3em;
    border: 15px solid ${({voted}) => voted ? '#B8FFFC' : 'white'};
    border-top-left-radius: 5em;
    height: 14em;
    position: relative;

    > .avatar {
      position: relative;
      bottom: 4.5em;
      cursor: pointer;
      right: 4em; 
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 7px solid ${({voted}) => voted ? '#B8FFFC' : 'white'};
      background-size: cover !important;
    }
    > .identity {
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
      > .firstname {
        margin-bottom: 0;
      }
      
    }
    > .total-votes{
      font-size: 1.6em;
      position: absolute;
      right: 0.5em;
      color: white;
      bottom: 0.5em;
    }
`;