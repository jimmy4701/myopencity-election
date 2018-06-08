import React, {Component} from 'react'
import { Grid, Table, Button, Loader, Form, Input, Container, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import 'setimmediate';
import csv from 'csv'
global.Buffer = global.Buffer || require("buffer").Buffer;

import { AuthorizedEmails } from '/imports/api/authorized_emails/authorized_emails';
import { CandidatesVotes } from '/imports/api/candidates_votes/candidates_votes';

class AdminCandidatesVotesPage extends Component {
    export = () => {
        const {candidates_votes} = this.props;
        csv.stringify(
            [["Nom / Prénom"    , "Email"        , "Horodatage du vote"]].concat(candidates_votes.map(candidate =>
            [candidate.username, candidate.email, candidate.created_at.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })])),
            (e, result) => {
                const blob = new Blob([result])
                if (window.navigator.msSaveOrOpenBlob) {  // IE hack see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
                window.navigator.msSaveBlob(blob, "voteurs.csv")
                } else {
                    const a = window.document.createElement("a")
                    a.href = window.URL.createObjectURL(blob, {type: "text/plain;charset=UTF-8"})
                    a.download = "voteurs.csv"
                    document.body.appendChild(a)
                    a.click()  // IE: "Access is denied" see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
                    document.body.removeChild(a)
                }
            }
        )
    }
    render() {
    const { candidates_votes, loading } = this.props
    if (loading) {
        return <Loader inline>Chargement de la liste de voteurs</Loader>
    }
    return (
        <Grid stackable style={{ paddingTop: '6em' }} centered >
            <Grid.Column width={6} centered>
                <Button onClick={this.export}>
                    Exporter les statistiques de votes
                </Button>
            </Grid.Column>
            <Grid.Column width={6} centered>                
                <Header as="h2">
                    Total des votes : {candidates_votes.length}
                </Header>
            </Grid.Column>
            <Grid.Column width={16}>
                <Container>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Nom / Prénom</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Horodatage de vote</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {candidates_votes.map(voter => (
                                <Table.Row key={voter._id}>
                                    <Table.Cell>{voter.username}</Table.Cell>
                                    <Table.Cell>{voter.email}</Table.Cell>
                                    <Table.Cell>{voter.created_at.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Container>
            </Grid.Column>
        </Grid>
    );
}
}

export default withTracker(() => {
    const candidatesVotesPublication = Meteor.isClient && Meteor.subscribe('candidates_votes.all')
    const loading = Meteor.isClient && !candidatesVotesPublication.ready()
    const candidates_votes = CandidatesVotes.find({}).fetch()
    return {
        loading,
        candidates_votes
    }
})(AdminCandidatesVotesPage);