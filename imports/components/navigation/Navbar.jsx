import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Menu, Container, Sidebar, Icon, Button, Grid, GridColumn, Modal} from 'semantic-ui-react'
import NavbarAccountItem from '/imports/components/navigation/NavbarAccountItem'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

class Navbar extends TrackerReact(Component){

  state = {
    open_sidebar: false,
    open_modal: false
  }

  componentDidMount(){
    this.setState({screen_size: window.innerWidth})
  }

  toggleSidebar(e){
    e.preventDefault()
    Session.set('open_sidebar', !Session.get('open_sidebar'))
  }

  toggleModal = (e) => {
    e.preventDefault()
    this.setState({open_modal: !this.state.open_modal})
  }

  sendVotes = () => {
    const votes = Meteor.isClient && Session.get('votes')
    if (Array.isArray(votes) && votes.length > 10) {
      Bert.alert({
        title: "Vous ne pouvez voter que pour 10 candidats",
        type: "danger",
        style: "growl-bottom-left",
      })
    } else {
      Meteor.call('candidates_votes.vote', votes, (e) => {
        if (e) {
          Bert.alert({
            title: e.message,
            type: "danger",
            style: "growl-bottom-left",
          })
        } else {
          Bert.alert({
            title: "Votre vote à bien été pris en compte !",
            type: 'success',
            style: 'growl-bottom-left',
          })
          Session.set('votes', null);
          this.setState({open_modal: false});
        }
      })
    }
  }

  render(){
    const {navbar_color, main_title, navbar_consults, navbar_projects} = Session.get('global_configuration')
    const { className } = this.props
    const { open_modal } = this.state
    const votes = Meteor.isClient && Session.get('votes')
    return(
      <div className={className}>
        <Grid width={16} centered>
          <Grid.Column width={16}>
        {this.state.screen_size > 768 ?
          <Menu
            secondary
            className="main-navbar"
            size="massive"
            style={{backgroundColor: navbar_color}}
            {...this.props}
          >
            <Container>
              <Link className="item" to='/'>
                <div className="navbar-item" header>
                  Intro
                </div>
              </Link>
              <Link className="item" to='/'>
                <div className="navbar-item" header>
                  Candidats
                </div>
              </Link>
              <Link className="item" to='/'>
                <div className="navbar-item" header>
                  Partenaires
                </div>
              </Link>
              <Menu.Menu position='right' className="item">
                {votes !== undefined ? `votes restants : ${10 - votes.length}/10` : ''}
                <NavbarAccountItem />
              </Menu.Menu>
            </Container>
          </Menu>
          :
          <Menu secondary className="main-navbar" size="large" style={{backgroundColor: navbar_color}}>
            <Container>
              <Menu.Item className="navbar-item" icon="content" onClick={(e) => {this.toggleSidebar(e) }} header/>
            </Container>
          </Menu>
        }
          </Grid.Column>
        {votes !== undefined && votes.length &&
          <Grid.Column width={16} style={{marginTop: '3em', backgroundColor: '#0064b9', textAlign: 'center'}}>
            { open_modal && [
              <h3>Confirmer la validation des votes ?</h3>,
              <p>(irreversible aucune modification ne sera possible)</p>,
              <Button onClick={this.sendVotes} positive>Valider</Button>
            ]}
            <Button onClick={this.toggleModal} negative={open_modal}>{open_modal? 'Annuler' : 'Valider les votes ?'}</Button>
          </Grid.Column>
        }
        </Grid>
        <Modal basic open={open_modal}>
        </Modal>
      </div>
    )
  }
}

export default styled(Navbar)`
  position: fixed;
  width: 100vw;
  z-index: 1001;
`
