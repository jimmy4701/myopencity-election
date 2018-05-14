import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Container, Loader, Image, Button} from 'semantic-ui-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Consults} from '/imports/api/consults/consults'
import {Projects} from '/imports/api/projects/projects'
import {Configuration} from '/imports/api/configuration/configuration'
import {Link} from 'react-router-dom'
import CardCandidate from '/imports/components/candidates/CardCandidate';

export class Landing extends TrackerReact(Component){

  constructor(props){
    super(props)
    this.state = {
      voted: false,
    }
  }

  toggleVote = () => this.setState({voted: !this.state.voted});

  render(){

    const {consults, projects, global_configuration, loading} = this.props
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
      const { voted } = this.state;
      return(
        <Grid stackable centered className="landing-page">
          <Grid.Column width={16}>
            <Grid className="landing-header" style={{backgroundImage: "url(" + landing_header_background_url + ")"}} verticalAlign="middle">
              <Grid.Column width={16}>
                <Header className="wow fadeInUp main-title" style={{color: landing_main_title_color}} as="h1">{landing_main_title ? landing_main_title : main_title }</Header>
                <Header className="wow fadeInUp" style={{color: landing_header_description_color}} data-wow-delay="1s" as="h2">{landing_header_description}</Header>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column width={16} className="center-align landing-part" verticalAlign="middle">
            <Grid verticalAlign="middle" stackable>
              <Grid.Column width={16} className="center-align landing-title-container">
                <div className="landing-back-title">{main_title}</div>
                <Header as="h2">Qu'est-ce que c'est ?</Header>
              </Grid.Column>
              <Grid.Column width={16}>
                <Container>
                  <div dangerouslySetInnerHTML={{__html: landing_explain_text }}></div>
                  <Grid stackable centered >
                  <Grid.Column width={5}>
                  <CardCandidate
                    candidate={{
                      image_url: 'https://plateforme.com/wp-content/uploads/2016/09/business-man-avatar-1560x1560.png',
                      firstname: 'Prénom',
                      lastname: 'Nom de famille',
                      punchline: 'Changons le monde !',
                      bio: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem hic necessitatibus dolorum nisi nihil, cum quos harum. Incidunt, totam. Ratione accusamus ipsa magni sapiente corrupti! Ducimus, perferendis totam. Atque dolores repudiandae iusto! Omnis consequatur quos eius nostrum ratione temporibus pariatur fugiat similique tenetur accusamus incidunt nemo voluptatibus ducimus, commodi repellat eaque recusandae. Voluptatum, aliquid nihil! Accusamus, laboriosam placeat asperiores, ad exercitationem earum quaerat sint nesciunt repudiandae dignissimos rem doloribus porro ex natus. Nobis beatae magni ducimus cum vero quos ea! Hic aut dolore asperiores quidem provident vel aperiam libero vitae. Mollitia sed aspernatur neque obcaecati debitis soluta repudiandae numquam? Quasi?',
                      social_url: '#',
                    }}
                    voted={voted}
                    voteForMe={() => console.log("Vote !!!")}
                  />
                  </Grid.Column>
                  <Grid.Column width={5}>
                  <CardCandidate
                    candidate={{
                      image_url: 'https://plateforme.com/wp-content/uploads/2016/09/business-man-avatar-1560x1560.png',
                      firstname: 'Prénom',
                      lastname: 'Nom de famille',
                      punchline: 'Changons le monde !',
                      bio: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem hic necessitatibus dolorum nisi nihil, cum quos harum. Incidunt, totam. Ratione accusamus ipsa magni sapiente corrupti! Ducimus, perferendis totam. Atque dolores repudiandae iusto! Omnis consequatur quos eius nostrum ratione temporibus pariatur fugiat similique tenetur accusamus incidunt nemo voluptatibus ducimus, commodi repellat eaque recusandae. Voluptatum, aliquid nihil! Accusamus, laboriosam placeat asperiores, ad exercitationem earum quaerat sint nesciunt repudiandae dignissimos rem doloribus porro ex natus. Nobis beatae magni ducimus cum vero quos ea! Hic aut dolore asperiores quidem provident vel aperiam libero vitae. Mollitia sed aspernatur neque obcaecati debitis soluta repudiandae numquam? Quasi?',
                      social_url: '#',
                    }}
                    voted={voted}
                    voteForMe={() => console.log("Vote !!!")}
                  />
                  </Grid.Column>
                  <Grid.Column width={5}>
                  <CardCandidate
                    candidate={{
                      image_url: 'https://plateforme.com/wp-content/uploads/2016/09/business-man-avatar-1560x1560.png',
                      firstname: 'Prénom',
                      lastname: 'Nom de famille',
                      punchline: 'Changons le monde !',
                      bio: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem hic necessitatibus dolorum nisi nihil, cum quos harum. Incidunt, totam. Ratione accusamus ipsa magni sapiente corrupti! Ducimus, perferendis totam. Atque dolores repudiandae iusto! Omnis consequatur quos eius nostrum ratione temporibus pariatur fugiat similique tenetur accusamus incidunt nemo voluptatibus ducimus, commodi repellat eaque recusandae. Voluptatum, aliquid nihil! Accusamus, laboriosam placeat asperiores, ad exercitationem earum quaerat sint nesciunt repudiandae dignissimos rem doloribus porro ex natus. Nobis beatae magni ducimus cum vero quos ea! Hic aut dolore asperiores quidem provident vel aperiam libero vitae. Mollitia sed aspernatur neque obcaecati debitis soluta repudiandae numquam? Quasi?',
                      social_url: '#',
                    }}
                    voted={voted}
                    voteForMe={() => console.log("Vote !!!")}
                  />
                  </Grid.Column>
                  </Grid>
                </Container>
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
            {projects.length > 0 ?
                <Grid.Column width={16} className="center-align landing-title-container">
                  <div className="landing-back-title">PROPOSITIONS</div>
                  <Header as="h2">Les projets proposés du moment</Header>
                </Grid.Column>
            : ''}
            {projects.length > 0 ?
                <Grid.Column width={16} className="landing-consults-part" style={{backgroundColor: landing_consults_background_color}}>
                  {projects.map((project, index) => {
                    return (
                      <Grid verticalAlign="middle background-img" style={{minHeight: "20em", backgroundImage: "url(" + project.image_url + ")"}} stackable>
                        <Grid.Column width={16} className="center-align landing-consult-container" >
                          <Container className="landing-consult-text">
                            <Header as="h2" style={{color: "white"}}>{project.title}</Header>
                            <p>{project.description}</p>
                            <Link to={"/projects/" + project.shorten_url}>
                              <Button>Voir la proposition</Button>
                            </Link>
                          </Container>
                        </Grid.Column>
                      </Grid>
                    )
                  })}
                </Grid.Column>
              : ''}
          </Grid>
        )
    }else{
      return <Loader className="inline-block">Chargement de la page</Loader>
    }
  }
}

export default LandingContainer = createContainer(() => {
  const landingConsultsPublication = Meteor.isClient && Meteor.subscribe('consults.landing')
  const landingProjectsPublication = Meteor.isClient && Meteor.subscribe('projects.landing')
  const globalConfigurationPublication = Meteor.isClient && Meteor.subscribe('global_configuration')
  const loading = Meteor.isClient && (!landingConsultsPublication.ready() || !landingProjectsPublication.ready() || !globalConfigurationPublication.ready())
  const consults = Consults.find({landing_display: true}).fetch()
  const projects = Projects.find({landing_display: true}).fetch()
  const global_configuration = Configuration.findOne()
  return {
    loading,
    consults,
    projects,
    global_configuration
  }
}, Landing)
