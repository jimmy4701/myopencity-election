import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Menu, Container, Sidebar, Icon} from 'semantic-ui-react'
import NavbarAccountItem from '/imports/components/navigation/NavbarAccountItem'
import {Link} from 'react-router-dom'

export default class Navbar extends TrackerReact(Component){

  constructor(props){
    super(props)
    this.state = {
      open_sidebar: false
    }
  }

  componentDidMount(){
    this.setState({screen_size: window.innerWidth})
  }

  toggleSidebar(e){
    e.preventDefault()
    Session.set('open_sidebar', !Session.get('open_sidebar'))
  }

  render(){
    const {navbar_color, main_title, navbar_consults, navbar_projects} = Session.get('global_configuration')
    const { votes } = this.props;
    return(
      <div>
        {this.state.screen_size > 768 ?
          <Menu
            secondary
            className="main-navbar"
            size="massive"
            style={{backgroundColor: navbar_color}}
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
                {votes !== undefined ? `votes restants : ${10 - votes}/10` : ''}
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
      </div>
    )
  }
}
