import React, { Component } from 'react'
import { Random } from 'meteor/random'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Container, Loader, Image, Button, Sticky, Message} from 'semantic-ui-react'
import { createContainer } from 'meteor/react-meteor-data'
import { Consults } from '/imports/api/consults/consults'
import { Projects } from '/imports/api/projects/projects'
import { Configuration } from '/imports/api/configuration/configuration'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { Candidates } from '/imports/api/candidates/candidates'
import { CandidatesVotes } from '/imports/api/candidates_votes/candidates_votes'
import { Partners } from '/imports/api/partners/partners'
import CandidatePartial from '/imports/components/candidates/CandidatePartial'
import Navbar from '/imports/components/navigation/Navbar'
import styled from 'styled-components'

export class Landing extends TrackerReact(Component) {

  state = {
    my_candidates: []
  }

  toggleVote = candidate => {
    let my_candidates = Session.get('votes') || []
    const { nb_elected_candidates } = this.props.global_configuration
    if (_.find(my_candidates, v => v._id === candidate._id)) {
      console.log('found in votes')
      my_candidates = _.filter(my_candidates, v => v._id !== candidate._id)
      Session.set("votes", my_candidates)
    } else {
      console.log('not found in votes')
      // Check has already gender voted
        my_candidates = _.filter(my_candidates, v => v.gender !== candidate.gender)
        my_candidates.push(candidate)
        Session.set("votes", my_candidates)
    }

  }

  render() {
    const {
      consults,
      global_configuration,
      loading,
      candidates,
      has_voted,
      my_candidates,
      partners
    } = this.props
    const {
      landing_header_background_url,
      main_title,
      landing_main_title_color,
      landing_header_description_color,
      landing_main_title,
      landing_header_description,
      landing_consults_background_color,
      landing_explain_text,
      animate,
      vote_step,
      nb_elected_candidates
    } = global_configuration

    if (!loading) {
      if(animate){
        return <Redirect to='/resultsAnimate' />
      }
      return (
        <div>
          <Grid stackable centered className="landing-page">
            <Grid.Column width={16}>
              <Grid className="landing-header" style={{ backgroundImage: "url(" + landing_header_background_url + ")" }} verticalAlign="middle">
                <Grid.Column width={16}>
                  <HeaderText className="landing-header-text">
                    <h2>Votez pour</h2>
                    <h1>La Femina Numerica et l'Homo Numericus 2018</h1>
                  </HeaderText>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column
              width={16}
              className="center-align landing-part"
              verticalAlign="middle"
              style={{ paddingTop: '0px' }}
            >
              <Grid verticalAlign="middle" stackable>
                <Grid.Column width={16}>
                  <div
                    style={{
                      backgroundColor: '#2699FB',
                      padding: '2em',
                      marginBottom: '4em',
                    }}
                  >
                    <Container>
                      <div style={{color: "white"}} dangerouslySetInnerHTML={{ __html: landing_explain_text }}></div>
                    </Container>
                  </div>
                  { has_voted &&
                    <Grid centered style={{paddingBottom: '5em'}} stackable>
                      <Grid.Column width={4} >
                        <Message
                          className="wow fadeInUp"
                          info
                          centered
                          style={{textAlign: 'center'}}
                        >Votre vote a bien été pris en compte !
                        </Message>
                      </Grid.Column>
                    </Grid>
                  }
                  { Meteor.isClient && !Meteor.userId() &&
                    <Grid centered style={{paddingBottom: '5em'}} stackable>
                      <Grid.Column width={6} >
                        <Message
                          className="wow fadeInUp"
                          info
                          centered
                          >
                            <Message.Header>
                              Que dois-je faire pour voter ?
                            </Message.Header>
                            <p>Vous devez créer un compte sur cette plateforme.</p>
                            <p>Une fois votre compte créé, vous pourrez alors voter pour 2 candidats sur cette page, une femme et un homme, en cliquant sur
                            le bouton "Voter"</p>
                            <Link to="/sign_up">
                              <Button color="blue">Créer mon compte pour voter</Button>
                            </Link>
                        </Message>
                      </Grid.Column>
                    </Grid>
                  }
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
                    {candidates.map(candidate => (
                      <CandidatePartial
                        key={candidate._id}
                        candidate={candidate}
                        votable={vote_step !== "close" && Meteor.isClient && Meteor.userId() && !has_voted}
                        voted={_.find(my_candidates, my_candidate => my_candidate._id === candidate._id)}
                        toggleVote={this.toggleVote}
                      />
                    ))}
                  </div>
                </Grid.Column>
              </Grid>
            </Grid.Column>        
          </Grid>
        </div>
      )
    } else {
      return <Loader className="inline-block">Chargement de la page</Loader>
    }
  }
}

export default LandingContainer = createContainer(() => {
  const landingConsultsPublication = Meteor.isClient && Meteor.subscribe('consults.landing')
  const candidatesPublication = Meteor.isClient && Meteor.subscribe('candidates.active')
  const globalConfigurationPublication = Meteor.isClient && Meteor.subscribe('global_configuration')
  const candidatesVotesPublication = Meteor.isClient && Meteor.subscribe('candidates_votes.me')
  const loading = Meteor.isClient && (
       !landingConsultsPublication.ready()
    || !globalConfigurationPublication.ready()
    || !candidatesPublication.ready()
    || !candidatesVotesPublication.ready()
  )
  const consults = Consults.find({ landing_display: true }).fetch()
  const candidates = Candidates.find({ active: true }).fetch()
  const has_voted = CandidatesVotes.findOne();
  const global_configuration = Configuration.findOne()
  const my_candidates = Meteor.isClient && Session.get('votes')
  return {
    loading,
    consults,
    candidates,
    has_voted,
    global_configuration,
    my_candidates,
  }
}, Landing)

const HeaderText = styled.div`
  display: inline-block;
  text-align: left;

  > h2 {
    font-size: 2em;
    margin-bottom: 0;
  }

  > h1 {
    font-size: 3em;
    margin-top: 0;
  }
`