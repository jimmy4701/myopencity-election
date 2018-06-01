import React, { Component } from 'react'
import { Card, Button, Image, Label, Modal } from 'semantic-ui-react'

export default class AdminpartnerPartial extends Component {
    edit = () => this.props.onEditClick(this.props.partner)

    remove = () => {
        Meteor.call('partners.remove', this.props.partner._id, (error, result) => {
            if (error) {
                console.log('Erreur', error.message)
                Bert.alert({
                    title: 'Erreur lors de la suppression',
                    style: 'growl-bottom-left',
                    type: 'danger'
                })
            } else {
                Bert.alert({
                    title: 'Partenaire supprimé',
                    style: 'growl-bottom-left',
                    type: 'success'
                })
            }
        })
    }

    render() {
        const { partner } = this.props
        return (
            <Card>
                <Image src={partner.image_url} />
                <Card.Content>
                    <Card.Header>
                        <a href={partner.link} target="_blank">{partner.link}</a>
                    </Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={this.edit}>Modifier</Button>,
                    <Button negative onClick={this.remove}>Supprimer</Button>
                </Card.Content>
            </Card>
        )
    }
}