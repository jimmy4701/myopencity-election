import React, {Component} from 'react'
import { Grid, Loader, Header, Container, Button } from 'semantic-ui-react'
import AdminPartnerPartial from '/imports/components/partners/AdminPartnerPartial'
import { withTracker } from 'meteor/react-meteor-data'
import {Partners} from '/imports/api/partners/partners'
import PartnerForm from '/imports/components/partners/PartnerForm'

class AdminPartnersPage extends Component {
    state = {
        editing_partner: null,
        display_form: false
    }

    edit = (editing_partner) => this.setState({editing_partner, display_form: true})

    toggleState = (e, {name}) => this.setState({[name]: !this.state[name]})

    resetEditing = () => this.setState({editing_partner: null, display_form: false})

    render(){
        const {loading, partners} = this.props
        const {editing_partner, display_form} = this.state

        if(!loading){
            return(
                <Grid stackable style={{marginTop: "5em"}}>
                    <Grid.Column width={16}>
                        <Container>
                            <Header as='h2'>Gestion des partenaires</Header>
                            <Button onClick={this.toggleState} name="display_form">{display_form ? "Annuler" : "Ajouter partenaire"}</Button>
                        </Container>
                    </Grid.Column>
                    {display_form ?
                        <Grid.Column width={16}>
                            <Container>
                                <PartnerForm partner={editing_partner} onSubmitForm={this.resetEditing} />
                            </Container>
                        </Grid.Column>
                    :
                        <Grid.Column width={16}>
                            <Container>
                                <Grid stackable>
                                    {partners.map(partner => {
                                        return(
                                            <Grid.Column width={4} key={partner._id}>
                                                <AdminPartnerPartial partner={partner} onEditClick={this.edit} />
                                            </Grid.Column>
                                        ) 
                                    })}
                                </Grid>
                            </Container>
                        </Grid.Column>
                    }
                </Grid>
            )
        }else{
            return <Loader inline>Chargement des partenaires</Loader>
        }
    }
}

export default withTracker(() => {
    const partnersPublication = Meteor.subscribe('partners.all')
    const loading = !partnersPublication.ready()
    const partners = Partners.find({}).fetch()
    return {
        loading,
        partners
    }
})(AdminPartnersPage)