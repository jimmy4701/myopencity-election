import React, { Component } from "react"

//packages
import { Switch, withRouter } from 'react-router-dom'
import { Helmet } from "react-helmet"
import { createContainer } from 'meteor/react-meteor-data'
import { Loader, Grid, Sidebar, Button, Menu, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

// Components
import Navbar from '/imports/components/navigation/Navbar'
import Footer from '/imports/components/footer/Footer'

// routes
import Public from '/imports/components/routes/Public'

// Collection
import { Configuration } from '/imports/api/configuration/configuration'

// Pages
import Landing from '/imports/pages/general/Landing'
import SignupPage from '/imports/pages/accounts/SignupPage'
import SigninPage from '/imports/pages/accounts/SigninPage'
import ConsultsPage from '/imports/pages/consults/ConsultsPage'
import ConsultPage from '/imports/pages/consults/ConsultPage'
import MyProfile from '/imports/pages/accounts/MyProfile'
import ProfilePage from '/imports/pages/accounts/ProfilePage'
import ProjectsPage from '/imports/pages/projects/ProjectsPage'
import ProjectPage from '/imports/pages/projects/ProjectPage'
import NewProjectPage from '/imports/pages/projects/NewProjectPage'
import EditProjectPage from '/imports/pages/projects/EditProjectPage'
import MyProjectsPage from '/imports/pages/projects/MyProjectsPage'
import SendPasswordEmail from '/imports/pages/accounts/SendPasswordEmail'
import ResetPassword from '/imports/pages/accounts/ResetPassword'
import NotFound from '/imports/pages/general/NotFound'
import Results from '/imports/pages/general/Results'
import Conditions from '/imports/pages/general/Conditions'
import TrackerReact from 'meteor/ultimatejs:tracker-react'

export class MainLayout extends TrackerReact(Component) {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.setState({ loading: false })
  }

  componentWillReceiveProps(props) {
    console.log('this.props', props)
    if (props.global_configuration.initial_configuration) {
      props.history.push('/initial/presentation')
    }
  }

  toggleSidebar(e) {
    e.preventDefault()
    Session.set('open_sidebar', !Session.get('open_sidebar'))
  }

  go(route, e) {
    e.preventDefault()
    this.props.history.push(route)
    Session.set('open_sidebar', false)
    Session.set('votes', null)
  }

  logout = () => {
    Meteor.logout()
    this.props.history.push('/')
  }

  render() {
    const { global_configuration, loading, className } = this.props


    if (!loading) {
      Session.set('global_configuration', global_configuration)
      return (
        <div className={className + " main-container"}>
          <Helmet>
            <title>{global_configuration.main_title}</title>
            <meta name="description" content={global_configuration.main_description} />
            <link rel="icon" href={global_configuration.global_logo_url} />
            {!global_configuration.seo_active ?
              <meta name="robots" content="noindex" />
              : ''}
          </Helmet>
          { Meteor.isClient && <Navbar/> }
          <Sidebar.Pushable>
            <Sidebar as={Menu} animation='push' width='thin' visible={Session.get('open_sidebar')} className="main-sidebar" icon='labeled' vertical inverted>
              <Menu.Item name='consultations' onClick={(e) => { this.go('/', e) }}>
                Accueil
              </Menu.Item>
              {Meteor.userId() ?
                <span>
                  {Roles.userIsInRole(Meteor.userId(), ['admin', 'moderator']) ?
                    <Menu.Item floated="bottom" name='admin' onClick={(e) => { this.go('/admin/candidates', e) }}>
                      Admin
                    </Menu.Item>
                    : ''}
                  <Menu.Item floated="bottom" name='profile' onClick={this.logout}>
                    Déconnexion
                  </Menu.Item>
                </span>
                :
                <Menu.Item name='sign_in' onClick={(e) => { this.go('/sign_in', e) }}>
                  Connexion
                </Menu.Item>
              }
            </Sidebar>
            <Sidebar.Pusher>
            { Meteor.isClient && <Navbar/> }
              <Grid>
                <Grid.Column width={16}>
                  <main className="main-container">
                    <Switch>
                      <Public component={Landing} exact path="/" { ...this.props } />
                      <Public component={SignupPage} exact path="/sign_up"       { ...this.props } />
                      <Public component={SigninPage} exact path="/sign_in"       { ...this.props } />
                      <Public component={MyProfile} exact path="/me/profile"       { ...this.props } />
                      <Public component={SendPasswordEmail} exact path="/forgot_password" { ...this.props } />
                      <Public component={ResetPassword} exact path="/reset-password/:token" { ...this.props } />
                      <Public component={Conditions} exact path="/conditions" { ...this.props } />
                      <Public component={Results} exact path="/results" { ...this.props } />
                      <Public component={NotFound} path="*"  { ...this.props } />
                    </Switch>
                  </main>
                </Grid.Column>
                {global_configuration.footer_display &&
                  <Grid.Column width={16} className="footer-container">
                    <Footer />
                  </Grid.Column>
                }
              </Grid>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      )
    } else {
      return <Loader className="inline-block">Chargement de la page</Loader>
    }
  }
}

export default MainLayoutContainer = createContainer(() => {
  const globalConfigurationPublication = Meteor.subscribe('global_configuration')
  const loading = !globalConfigurationPublication.ready()
  const global_configuration = Configuration.findOne({})
  console.log('global conf', global_configuration)
  return {
    loading,
    global_configuration
  }
}, styled(withRouter(MainLayout))`
  > div div main.main-container{
    @media screen and (max-width: 768px) {
      padding: 1em;
    }
    margin-top: 5em;
  }
`)
