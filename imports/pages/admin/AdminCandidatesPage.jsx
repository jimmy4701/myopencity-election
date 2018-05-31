import React, {Component} from 'react'
import csv from 'csv'
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

    exportCanidates = () => {
        const {candidates} = this.props;
        csv.stringify(
            candidates.map(candidate => [candidate.lastname, candidate.firstname, candidate.votes]),
            (e, result) => {
                const blob = new Blob([result])
                if (window.navigator.msSaveOrOpenBlob) {  // IE hack see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
                window.navigator.msSaveBlob(blob, "candidats.csv")
                } else {
                    const a = window.document.createElement("a")
                    a.href = window.URL.createObjectURL(blob, {type: "text/plain;charset=UTF-8"})
                    a.download = "candidats.csv"
                    document.body.appendChild(a)
                    a.click()  // IE: "Access is denied" see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
                    document.body.removeChild(a)
                }
            }
        )
    }

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
                            <Button onClick={this.exportCanidates}>Exporter les statistiques</Button>
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