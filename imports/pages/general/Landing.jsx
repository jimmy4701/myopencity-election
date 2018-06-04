import React, { Component } from 'react'
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
      if (my_candidates.length >= nb_elected_candidates) {
        Bert.alert({
          title: `Vous ne pouvez voter que pour ${nb_elected_candidates} candidats`,
          type: "danger",
          style: "growl-bottom-left",
        })
      } else {
        my_candidates.push(candidate)
        Session.set("votes", my_candidates)
      }
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
                  {/* <Header className="wow fadeInUp main-title" style={{ color: landing_main_title_color }} as="h1">{landing_main_title ? landing_main_title : main_title}</Header>
                  <Header className="wow fadeInUp" style={{ color: landing_header_description_color }} data-wow-delay="1s" as="h2">{landing_header_description}</Header> */}
                  <Image src="/images/ag-melee.gif" size="big" inline />
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
                    <Grid centered style={{paddingBottom: '5em'}}>
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
                    <Grid centered style={{paddingBottom: '5em'}}>
                      <Grid.Column width={4} >
                        <Message
                          className="wow fadeInUp"
                          info
                          centered
                          style={{textAlign: 'center'}}
                        >Vous devez vous connecter pour voter !
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
