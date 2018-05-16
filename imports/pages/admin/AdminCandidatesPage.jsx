import React, {Component} from 'react'
import { Grid, Loader, Header, Container, Button } from 'semantic-ui-react'
import AdminCandidatePartial from '/imports/components/candidates/AdminCandidatePartial'
import { withTracker } from 'meteor/react-meteor-data'
import {Candidates} from '/imports/api/candidates/candidates'
import CandidateForm from '/imports/components/candidates/CandidateForm'

class AdminCandidatesPage extends Component {
    state = {
        editing_candidate: null
    }

    editCandidate = (editing_candidate) => this.setState({editing_candidate, display_form: true})

    toggleState = (e, {name}) => this.setState({[name]: !this.state[name]})

    resetEditing = () => this.setState({editing_candidate: null, display_form: false})

    render(){
        const {loading, candidates} = this.props
        const {editing_candidate, display_form} = this.state

        if(!loading){
            return(
                <Grid stackable style={{marginTop: "5em"}}>
                    <Grid.Column width={16}>
                        <Container>
                            <Header as='h2'>Gestion des candidats</Header>
                            <Button onClick={this.toggleState} name="display_form">{display_form ? "Annuler" : "Créer candidat"}</Button>
                        </Container>
                    </Grid.Column>
                    {display_form ?
                        <Grid.Column width={16}>
                            <Container>
                                <CandidateForm candidate={editing_candidate} onSubmitForm={this.resetEditing} />
                            </Container>
                        </Grid.Column>
                    :
                        <Grid.Column width={16}>
                            <Container>
                                <Grid stackable>
                                    {candidates.map(candidate => {
                                        return(
                                            <Grid.Column width={4} key={candidate._id}>
                                                <AdminCandidatePartial candidate={candidate} onEditClick={this.editCandidate} />
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
            return <Loader inline>Chargement des candidats</Loader>
        }
    }
}

export default AdminCandidatesPageContainer = withTracker(() => {
    const candidatesPublication = Meteor.subscribe('candidates.all')
    const loading = !candidatesPublication.ready()
    const candidates = Candidates.find({}).fetch()
    return {
        loading,
        candidates
    }
})(AdminCandidatesPage)