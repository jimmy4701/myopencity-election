import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Container, Loader, Image, Button, GridColumn, Sticky} from 'semantic-ui-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Consults} from '/imports/api/consults/consults'
import {Projects} from '/imports/api/projects/projects'
import {Configuration} from '/imports/api/configuration/configuration'
import {Link, withRouter} from 'react-router-dom'
import {Candidates} from '/imports/api/candidates/candidates'
import CardCandidate from '/imports/components/candidates/CardCandidate'
import Navbar from '/imports/components/navigation/Navbar'

export class Landing extends TrackerReact(Component){

  state = {
    my_candidates: []
  }

  toggleVote = candidate_id => {
    const { my_candidates } = this.state
    if (my_candidates.find(v => v === candidate_id) !== undefined) {
      this.setState({my_candidates: my_candidates.filter(v => v !== candidate_id)})
    } else {
      if(my_candidates.length >= 10){
        Bert.alert({
          title: "Vous ne pouvez voter que pour 10 candidats",
          type: "danger",
          style: "growl-bottom-left",
        })
      } else {
        my_candidates.push(candidate_id)
        this.setState({my_candidates})
      }
    }
  }

  render(){
    
    const { my_candidates } = this.state
    const {consults, global_configuration, loading, candidates} = this.props
    const {
      landing_header_background_url,
      main_title,
      landing_main_title_color,
      landing_header_description_color,
      landing_main_title,
      landing_header_description,
      landing_consults_background_color,
      landing_explain_text
    } = global_configuration

    if(!loading){
      return(
        <div>
        <Grid stackable centered className="landing-page">   
          <Grid.Column width={16}>
            <Grid className="landing-header" style={{backgroundImage: "url(" + landing_header_background_url + ")"}} verticalAlign="middle">
              <Grid.Column width={16}>
                <Header className="wow fadeInUp main-title" style={{color: landing_main_title_color}} as="h1">{landing_main_title ? landing_main_title : main_title }</Header>
                <Header className="wow fadeInUp" style={{color: landing_header_description_color}} data-wow-delay="1s" as="h2">{landing_header_description}</Header>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column
            width={16}
            className="center-align landing-part"
            verticalAlign="middle"
            style={{paddingTop: '0px'}}
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
                    <div dangerouslySetInnerHTML={{__html: landing_explain_text }}></div>
                  </Container>
                </div>
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
                  <CardCandidate
                    candidate={candidate}
                    voted={my_candidates.find(candidate_id => candidate_id === candidate._id) !== undefined}
                    voteForMe={this.toggleVote}
                  />
                ))}
                
                </div>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          {consults.length > 0 ?
              <Grid.Column width={16} className="center-align landing-title-container">
                <div className="landing-back-title">CONSULTATIONS</div>
                <Header as="h2">Les consultations du moment</Header>
              </Grid.Column>
          : ''}
          {consults.length > 0 ?
              <Grid.Column width={16} className="landing-consults-part" style={{backgroundColor: landing_consults_background_color}}>
                {consults.map((consult, index) => {
                  return (
                    <Grid verticalAlign="middle background-img" style={{minHeight: "20em", backgroundImage: "url(" + consult.image_url + ")"}} stackable>
                      <Grid.Column width={16} className="center-align landing-consult-container" >
                        <Container className="landing-consult-text">
                          <Header as="h2" style={{color: "white"}}>{consult.title}</Header>
                          <p>{consult.description}</p>
                          <Link to={"/consults/" + consult.url_shorten}>
                            <Button>Voir la consultation</Button>
                          </Link>
                        </Container>
                      </Grid.Column>
                    </Grid>
                  )
                })}
              </Grid.Column>
            : ''}
          </Grid>
          </div>
        )
    }else{
      return <Loader className="inline-block">Chargement de la page</Loader>
    }
  }
}

export default LandingContainer = createContainer(() => {
  const landingConsultsPublication = Meteor.isClient && Meteor.subscribe('consults.landing')
  const candidatesPublication = Meteor.isClient && Meteor.subscribe('candidates.active')
  const globalConfigurationPublication = Meteor.isClient && Meteor.subscribe('global_configuration')
  const loading = Meteor.isClient && (!landingConsultsPublication.ready() || !globalConfigurationPublication.ready() || !candidatesPublication.ready())
  const consults = Consults.find({landing_display: true}).fetch()
  const candidates = Candidates.find({active: true}).fetch()
  const global_configuration = Configuration.findOne()
  return {
    loading,
    consults,
    candidates,
    global_configuration
  }
}, Landing)
