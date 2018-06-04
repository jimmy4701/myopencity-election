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

const CandidatePartialMini = ({ candidate, className }) => (
  <div className={className + " wow fadeInUp "}>
      <div
        className="avatar"
        style={{background: `url(${candidate.image_url}) no-repeat center center`}}
        onClick={() => this.handleDisplay('photo')}
      />
      <div className="identity">
        <h3>{candidate.lastname}</h3>
        <p>{candidate.firstname}</p>
      </div>
  </div>
);

export default styled(CandidatePartialMini)`
    background-color: #2699FB;
    width: 30em;
    margin: auto;
    padding: 2em;
    margin-bottom: 3em;
    border: 15px solid ${({voted}) => voted ? '#B8FFFC' : 'white'};
    border-top-left-radius: 5em;
    height: 11em;
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
    }
`;