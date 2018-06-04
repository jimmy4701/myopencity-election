import React, {Component} from 'react'
import { Grid, Item, Button, Loader, Form, Input, Container, Header, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import 'setimmediate'
global.Buffer = global.Buffer || require("buffer").Buffer

import { VoteFrauds } from '/imports/api/vote_frauds/vote_frauds';

class AdminVoteFraudsPage extends Component {
    hidde = (id) => {
        Meteor.call('vote_frauds.hidde', id, (error) => {
            if(error){
                console.log(error)
                Bert.alert({
                  title: "Une erreur est survenue",
                  message: error.reason,
                  type: 'danger',
                  style: 'growl-bottom-left',
                })
              }
        })
    }

    render() {
    const { vote_frauds, loading } = this.props
    if (loading) {
        return <Loader inline>Chargement des fraudes</Loader>
    }
    return (
        <Grid stackable style={{ paddingTop: '6em' }} centered >
            <Grid.Column width={16}>
                <Container>
                    <Header as="h1" >
                        Fraudes détectées
                    </Header>
                    <Item.Group divided>
                        {vote_frauds.map(fraud =>
                            <Item
                                onClick={() => this.hidde(fraud._id)}
                                style={{cursor: 'pointer'}}
                            >
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header>
                                        <Icon name="warning"/>
                                        {fraud.reason}
                                    </Item.Header>
                                    <Item.Meta>
                                        {fraud.createdAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}
                                    </Item.Meta>
                                    <Item.Description>
                                        {fraud.email}
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        )}
                    </Item.Group>
                </Container>
            </Grid.Column>
        </Grid>
    );
}
}

export default withTracker(() => {
    const VoteFraudsPublication = Meteor.isClient && Meteor.subscribe('vote_frauds.all')
    const loading = Meteor.isClient && !VoteFraudsPublication.ready()
    const vote_frauds = VoteFrauds.find({}).fetch()
    return {
        loading,
        vote_frauds
    }
})(AdminVoteFraudsPage);