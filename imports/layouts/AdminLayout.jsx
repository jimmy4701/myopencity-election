import React, { Component } from "react"

//packages
import { Switch, withRouter }           from 'react-router-dom'
import { Helmet }           from "react-helmet"
import { createContainer } from 'meteor/react-meteor-data'
import {Loader, Sidebar, Menu, Button, Grid, Icon} from 'semantic-ui-react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'

// Components
import Navbar from '/imports/components/navigation/Navbar'

// routes
import Public from '/imports/components/routes/Public'
import Admin from '/imports/components/routes/Admin'

// Collection
import {Configuration} from '/imports/api/configuration/configuration'

// Pages
import AdminConfigurationPage from '/imports/pages/admin/AdminConfigurationPage'
import AdminApiAuthorizationsPage from '/imports/pages/admin/AdminApiAuthorizationsPage'
import AdminExternalApisPage from '/imports/pages/admin/AdminExternalApisPage'
import AdminUsersPage from '/imports/pages/admin/AdminUsersPage'
import AdminCandidatesPage from '/imports/pages/admin/AdminCandidatesPage'
import AdminAuthorizedEmailsPage from '/imports/pages/admin/AdminAuthorizedEmailsPage'
import AdminCandidatesVotesPage from '/imports/pages/admin/AdminCandidatesVotesPage'
import AdminVoteFraudsPage from '/imports/pages/admin/AdminVoteFraudsPage'
import NotFound from '/imports/pages/general/NotFound'

export class AdminLayout extends TrackerReact(Component) {

  state = {
    loading: true
  }

  componentDidMount(){
    this.setState({ loading: false })
  }

  toggleSidebar(e){
    e.preventDefault()
    Session.set('open_sidebar', !Session.get('open_sidebar'))
  }

  go(route){
    this.props.history.push(route)
    Session.set('open_sidebar', false)
  }

  render(){
    const { global_configuration, loading } = this.props

    if(!loading){
      Session.set('global_configuration', global_configuration)
      return(
        <div className="main-container">
          <Helmet>
            <title>Myopencity - Administration</title>
            <meta name="robots" content="noindex"/>
          </Helmet>
          <Sidebar.Pushable>
            <Sidebar as={Menu} animation='push' width='thin' visible={Session.get('open_sidebar')} className="main-sidebar" icon='labeled' vertical inverted>
              {Roles.userIsInRole(Meteor.userId(), 'admin') ?
                <Menu.Item onClick={() => {this.go('/admin/configuration')}} name='cogs'>
                  <Icon name='cogs' />
                  Configuration
                </Menu.Item>
              : ''}
              <Menu.Item onClick={() => {this.go('/admin/users')}} name='users'>
                <Icon name='users' />
                Utilisateurs
              </Menu.Item>
              {Roles.userIsInRole(Meteor.userId(), 'admin') ?
                <Menu.Item onClick={() => {this.go('/admin/external_apis')}} name='google'>
                  <Icon name='google' />
                  Services externes
                </Menu.Item>
              : ''}
              <Menu.Item onClick={() => {this.go('/admin/candidates')}} name='comments'>
                <Icon name='users' />
                Candidates
              </Menu.Item>
              <Menu.Item onClick={() => {this.go('/admin/authorized_emails')}} name='comments'>
                <Icon name='at' />
                Gestions des voteurs
              </Menu.Item>
              <Menu.Item onClick={() => {this.go('/admin/candidates_votes')}} name='comments'>
                <Icon name='bar chart' />
                Statistiques de votes
              </Menu.Item>
              <Menu.Item onClick={() => {this.go('/admin/vote_frauds')}} name='comments'>
                <Icon name='warning' />
                Tentatives de fraude
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Grid stackable>
                <Grid.Column width={16} className="navbar-container">
                  <Navbar />
                </Grid.Column>
                <Grid.Column width={16}>
                  <main>
                    <Switch>
                      <Admin component={ AdminConfigurationPage }  exact path="/admin/configuration" { ...this.props } />
                      <Admin component={ AdminCandidatesPage }  exact path="/admin/candidates" { ...this.props } />
                      <Admin component={ AdminApiAuthorizationsPage }  exact path="/admin/api_authorizations" { ...this.props } />
                      <Admin component={ AdminAuthorizedEmailsPage }  exact path="/admin/authorized_emails" { ...this.props } />
                      <Admin component={ AdminCandidatesVotesPage }  exact path="/admin/candidates_votes" { ...this.props } />
                      <Admin component={ AdminVoteFraudsPage }  exact path="/admin/vote_frauds" { ...this.props } />
                      <Admin component={ AdminExternalApisPage }  exact path="/admin/external_apis" { ...this.props } />
                      <Admin component={ AdminUsersPage }  exact path="/admin/users" { ...this.props } />
                      <Public component={ NotFound } path="*"  { ...this.props } />
                    </Switch>
                  </main>
                </Grid.Column>
              </Grid>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          <Button style={{backgroundColor: global_configuration.navbar_color, color: global_configuration.navbar_color}} onClick={(e) => {this.toggleSidebar(e)}} className="open-sidebar-button" rounded icon="content" size="big"></Button>
        </div>
      )
    }else{
      return <Loader className="inline-block">Chargement de la page</Loader>
    }
  }
}

export default AdminLayoutContainer = createContainer(() => {
  const globalConfigurationPublication = Meteor.subscribe('configuration.with_cgu')
  const loading = !globalConfigurationPublication.ready()
  const global_configuration = Configuration.findOne({})
  return {
    loading,
    global_configuration
  }
}, withRouter(AdminLayout))
