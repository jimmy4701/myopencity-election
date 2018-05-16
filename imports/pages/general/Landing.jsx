import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Container, Loader, Image, Button, GridColumn, Sticky} from 'semantic-ui-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Consults} from '/imports/api/consults/consults'
import {Projects} from '/imports/api/projects/projects'
import {Configuration} from '/imports/api/configuration/configuration'
import {Link, withRouter} from 'react-router-dom'
import CardCandidate from '/imports/components/candidates/CardCandidate';
import Navbar from '/imports/components/navigation/Navbar';

export class Landing extends TrackerReact(Component){

  constructor(props){
    super(props)
    this.state = {
      my_candidates: [],
    }
  }

  toggleVote = candidate => {
    const { my_candidates } = this.state;
    if (my_candidates.find(v => v === candidate) !== undefined) {
      this.setState({my_candidates: my_candidates.filter(v => v !== candidate)});
    } else {
      if(my_candidates.length >= 10){
        Bert.alert({
          title: "Vous ne pouvez voter que pour 10 candidats",
          type: "danger",
          style: "growl-bottom-left",
        })
      } else {
        my_candidates.push(candidate);
        this.setState({my_candidates});
      }
    }
  }

  handleContextRef = contextRef => this.setState({ contextRef })

  render(){

    const {consults, global_configuration, loading} = this.props
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
      const { my_candidates, contextRef } = this.state;
      return(
        <div ref={this.handleContextRef}>
        <Grid stackable centered className="landing-page">   
          <Grid.Column width={16}>
            { Meteor.isClient ? (
              // <Sticky context={contextRef} >
              //   <Navbar votes={my_candidates.length} />
              // </Sticky>
              <Navbar votes={my_candidates.length} />
            ) : '' }
          </Grid.Column>
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
                <CardCandidate
                  candidate={{
                    image_url: 'https://plateforme.com/wp-content/uploads/2016/09/business-man-avatar-1560x1560.png',
                    firstname: 'Prénom',
                    lastname: 'Nom de famille',
                    punchline: 'Changons le monde !',
                    bio: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem hic necessitatibus dolorum nisi nihil, cum quos harum. Incidunt, totam. Ratione accusamus ipsa magni sapiente corrupti! Ducimus, perferendis totam. Atque dolores repudiandae iusto! Omnis consequatur quos eius nostrum ratione temporibus pariatur fugiat similique tenetur accusamus incidunt nemo voluptatibus ducimus, commodi repellat eaque recusandae. Voluptatum, aliquid nihil! Accusamus, laboriosam placeat asperiores, ad exercitationem earum quaerat sint nesciunt repudiandae dignissimos rem doloribus porro ex natus. Nobis beatae magni ducimus cum vero quos ea! Hic aut dolore asperiores quidem provident vel aperiam libero vitae. Mollitia sed aspernatur neque obcaecati debitis soluta repudiandae numquam? Quasi?',
                    social_url: '#',
                  }}
                  voted={my_candidates.find(v => v === 1) !== undefined}
                  voteForMe={() => this.toggleVote(1)}
                />
                <CardCandidate
                  candidate={{
                    image_url: 'https://plateforme.com/wp-content/uploads/2016/09/business-man-avatar-1560x1560.png',
                    firstname: 'Prénom',
                    lastname: 'Nom de famille',
                    punchline: 'Changons le monde !',
                    bio: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem hic necessitatibus dolorum nisi nihil, cum quos harum. Incidunt, totam. Ratione accusamus ipsa magni sapiente corrupti! Ducimus, perferendis totam. Atque dolores repudiandae iusto! Omnis consequatur quos eius nostrum ratione temporibus pariatur fugiat similique tenetur accusamus incidunt nemo voluptatibus ducimus, commodi repellat eaque recusandae. Voluptatum, aliquid nihil! Accusamus, laboriosam placeat asperiores, ad exercitationem earum quaerat sint nesciunt repudiandae dignissimos rem doloribus porro ex natus. Nobis beatae magni ducimus cum vero quos ea! Hic aut dolore asperiores quidem provident vel aperiam libero vitae. Mollitia sed aspernatur neque obcaecati debitis soluta repudiandae numquam? Quasi?',
                    social_url: '#',
                  }}
                  voted={my_candidates.find(v => v === 2) !== undefined}
                  voteForMe={() => this.toggleVote(2)}
                />
                <CardCandidate
                  candidate={{
                    image_url: 'https://plateforme.com/wp-content/uploads/2016/09/business-man-avatar-1560x1560.png',
                    firstname: 'Prénom',
                    lastname: 'Nom de famille',
                    punchline: 'Changons le monde !',
                    bio: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem hic necessitatibus dolorum nisi nihil, cum quos harum. Incidunt, totam. Ratione accusamus ipsa magni sapiente corrupti! Ducimus, perferendis totam. Atque dolores repudiandae iusto! Omnis consequatur quos eius nostrum ratione temporibus pariatur fugiat similique tenetur accusamus incidunt nemo voluptatibus ducimus, commodi repellat eaque recusandae. Voluptatum, aliquid nihil! Accusamus, laboriosam placeat asperiores, ad exercitationem earum quaerat sint nesciunt repudiandae dignissimos rem doloribus porro ex natus. Nobis beatae magni ducimus cum vero quos ea! Hic aut dolore asperiores quidem provident vel aperiam libero vitae. Mollitia sed aspernatur neque obcaecati debitis soluta repudiandae numquam? Quasi?',
                    social_url: '#',
                  }}
                  voted={my_candidates.find(v => v === 3) !== undefined}
                  voteForMe={() => this.toggleVote(3)}
                />
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
  const globalConfigurationPublication = Meteor.isClient && Meteor.subscribe('global_configuration')
  const loading = Meteor.isClient && (!landingConsultsPublication.ready() || !globalConfigurationPublication.ready())
  const consults = Consults.find({landing_display: true}).fetch()
  const global_configuration = Configuration.findOne()
  return {
    loading,
    consults,
    global_configuration
  }
}, Landing)
