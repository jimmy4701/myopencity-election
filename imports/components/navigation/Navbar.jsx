import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Menu, Container, Sidebar, Icon, Button, Grid, GridColumn, Modal, Image} from 'semantic-ui-react'
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
    const { nb_elected_candidates } = Meteor.isClient && Session.get('global_configuration')
    if (Array.isArray(votes) && votes.length > nb_elected_candidates) {
      Bert.alert({
        title: `Vous ne pouvez voter que pour ${nb_elected_candidates} candidats`,
        type: "danger",
        style: "growl-bottom-left",
      })
    } else {
      Meteor.call('candidates_votes.vote', votes.map(vote => vote._id), (e) => {
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
    const {navbar_color, main_title, navbar_consults, navbar_projects, nb_elected_candidates} = Session.get('global_configuration')
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
                  Accueil
                </div>
              </Link>
              <Menu.Menu position='right' className="item">
                {votes ? `votes restants : ${nb_elected_candidates - votes.length}/${nb_elected_candidates}` : ''}
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
        {((votes && votes.length) || open_modal) &&
          <Grid.Column width={16} className="votebar" style={{}}>
            { open_modal && [
              <h3>Confirmer la validation des votes ?</h3>,
              <p>(irreversible aucune modification ne sera possible)</p>,
              <Button onClick={this.sendVotes} positive>Valider</Button>
            ]}
            <Button onClick={this.toggleModal} negative={open_modal}>{open_modal? 'Annuler' : 'Valider les votes ?'}</Button>
          </Grid.Column>
        }
        </Grid>
        <Modal basic size="mini" open={open_modal} style={{marginTop: '-17em'}} className="votebar-votes">
          {votes && votes.map(candidate => (
            <div key={candidate._id} style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1em"
            }}>
              <div style={{
                  color: "#b94040",
                  display: "inline-block",
                  width: "5em",
                  cursor: "pointer"
              }}>
                <Icon name="close" size="big" onClick={() => {Session.set('votes', votes.filter(vote => vote !== candidate ))}}/><br/>
                Retirer
              </div>
              <div style={{
                backgroundImage: "url(" + candidate.image_url + ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: "5em",
                height: "5em",
                borderRadius: "50em",
                marginRight: "1em"
              }}></div>
              {candidate.firstname}
            </div>
          ))}
        </Modal>
      </div>
    )
  }
}

export default styled(Navbar)`
  position: fixed;
  width: 100vw;
  z-index: 1001;
  > div .navbar-item {
    color: white !important;
  }
  > div .votebar {
    margin-top: 3em;
    background-color: #0064b9;
    text-align: center !important;

    @media screen and (max-width: 374px) {
      margin-top: -1em;
    }

  }
`
