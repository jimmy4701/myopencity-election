import React, { Component } from 'react'
import { Grid, Table, Button, Loader, Form, Input, Container } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import 'setimmediate';
import csv from 'csv'
global.Buffer = global.Buffer || require("buffer").Buffer;

import {AuthorizedEmails} from '/imports/api/authorized_emails/authorized_emails';

class AdminAuthoriezdEmailsPage extends Component {
    state = {
        email: "",
    }

    loadCsvFile = (e) => {
        e.preventDefault()
        const fr = new FileReader();
        fr.readAsText(e.target.files[0]);
        fr.onload = () => {
            csv.parse(fr.result, (e, emails) => {
                if(e) {
                    Bert.alert({
                        title: "Erreur lors de l'import du fichier",
                        message: e.reason,
                        type: 'danger',
                        style: 'growl-bottom-left',
                    })
                } else {
                    Meteor.call('authorized_emails.add', emails.map(email => email[0]), (e) => {
                        if (e) {
                            Bert.alert({
                                title: "Erreur lors de l'ajout des emails",
                                message: e.reason,
                                type: 'danger',
                                style: 'growl-bottom-left',
                            })
                        } else {
                            Bert.alert({
                                title: "Les emails ont bien été ajouté de ceux autorisés à voter",
                                type: 'success',
                                style: 'growl-bottom-left',
                            })
                        }
                    })
                }
            });
        }
        e.target.value = null;
    }

    addEmail = (e) => {
        e.preventDefault();
        Meteor.call('authorized_emails.add', this.state.email, (e) => {
            if (e) {
                Bert.alert({
                    title: "Erreur lors de l'ajout de l'email",
                    message: e.reason,
                    type: 'danger',
                    style: 'growl-bottom-left',
                })
            } else {
                Bert.alert({
                    title: "L'Email est bien été ajouté de ceux autorisés à voter",
                    type: 'success',
                    style: 'growl-bottom-left',
                })
                this.setState({email: ""})
            }
        })
    }

    daleteAllEmails = () => {
        Meteor.call('authorized_emails.remove_all', (e) => {
            if (e) {
                Bert.alert({
                    title: "Erreur lors de la suppression des emails",
                    message: e.reason,
                    type: 'danger',
                    style: 'growl-bottom-left',
                })
            } else {
                Bert.alert({
                    title: "La liste des emails autorisés a été supprimée",
                    type: 'success',
                    style: 'growl-bottom-left',
                })
            }
        })
    }

    deleteEmail = (email) => {
        Meteor.call('authorized_emails.remove', email, (e) => {
            if (e) {
                Bert.alert({
                    title: "Erreur lors de la suppression de l'email",
                    message: e.reason,
                    type: 'danger',
                    style: 'growl-bottom-left',
                })
            } else {
                Bert.alert({
                    title: "L'Email est bien été supprimé de ceux autorisés à voter",
                    type: 'success',
                    style: 'growl-bottom-left',
                })
            }
        })
    }

    update = (e, {name, value}) => this.setState({[name]: value})

    render() {
        const { authorized_emails, loading } = this.props;
        const { email } = this.state;
        if ( loading ) {
            return <Loader inline>Chargement de la liste d'email</Loader>
        }
        return (
            <Grid stackable  style={{paddingTop: '6em'}} centered >
                <Grid.Column width={4}>
                    <Form onSubmit={this.addEmail} >
                        <Form.Group inline>
                            <Form.Input
                                type="email"
                                inline
                                placeholder="Email à ajouter à la liste"
                                name="email"
                                value={email}
                                onChange={this.update}
                            />
                            <Button inline>Ajouter</Button>
                        </Form.Group>
                    </Form>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Input
                        inline
                        type="file"
                        label="Ajout de masse"
                        onChange={this.loadCsvFile}
                    />
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button onClick={this.daleteAllEmails} negative>
                        Supprimer tout
                    </Button>
                </Grid.Column>                      
                <Grid.Column width={3}>
                    <Button as="a" href="/ressources/example.csv" >
                        Télécharger un fichier d'exemple
                    </Button>
                </Grid.Column>     
                <Grid.Column width={16}>
                  <Container>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {authorized_emails.map(authorized_email => (
                            <Table.Row key={authorized_email._id}>
                                <Table.Cell>{authorized_email.email}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        onClick={() => this.deleteEmail(authorized_email.email)}
                                        negative
                                    >Supprimer
                                    </Button>
                                </Table.Cell>
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
    const authorizedEmailsPublication = Meteor.isClient && Meteor.subscribe('authorized_emails.all')
    const loading = Meteor.isClient && !authorizedEmailsPublication.ready()
    const authorized_emails = AuthorizedEmails.find({}).fetch()
    return {
        loading,
        authorized_emails
    }
})(AdminAuthoriezdEmailsPage);