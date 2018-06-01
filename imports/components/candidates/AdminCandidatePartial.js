import React, { Component } from 'react'
import { Card, Button, Image, Label, Modal } from 'semantic-ui-react'

export default class AdminCandidatePartial extends Component {
    state = {
        display_menu: false,
        display_modal: false
    }

    toggleState = (e, { name }) => this.setState({ [name]: !this.state[name] })

    toggleVotable = () => {
        Meteor.call('candidates.toggle_votable', this.props.candidate._id, (error, result) => {
            if (error) {
                console.log('Erreur', error.message)
                Bert.alert({
                    title: 'Erreur lors du changement de configuration',
                    style: 'growl-bottom-left',
                    type: 'danger'
                })
            } else {
                Bert.alert({
                    title: 'Configuration modifiée',
                    style: 'growl-bottom-left',
                    type: 'success'
                })
            }
        })
    }

    toggleActive = () => {
        Meteor.call('candidates.toggle_active', this.props.candidate._id, (error, result) => {
            if (error) {
                console.log('Erreur', error.message)
                Bert.alert({
                    title: 'Erreur lors du changement de configuration',
                    style: 'growl-bottom-left',
                    type: 'danger'
                })
            } else {
                Bert.alert({
                    title: 'Configuration modifiée',
                    style: 'growl-bottom-left',
                    type: 'success'
                })
            }
        })
    }

    edit = () => this.props.onEditClick(this.props.candidate)

    remove = () => {
        Meteor.call('candidates.remove', this.props.candidate._id, (error, result) => {
            if (error) {
                console.log('Erreur', error.message)
                Bert.alert({
                    title: 'Erreur lors de la suppression',
                    style: 'growl-bottom-left',
                    type: 'danger'
                })
            } else {
                Bert.alert({
                    title: 'Candidat supprimé',
                    style: 'growl-bottom-left',
                    type: 'success'
                })
            }
        })
    }

    openModal = () => {
        this.setState({ display_modal: true })
    }

    closeModal = () => {
        this.setState({ display_modal: false })
    }

    render() {
        const { candidate } = this.props
        const { display_menu, display_modal } = this.state
        return (
            <Card>
                <Image src={candidate.image_url} />
                <Card.Content>
                    <Card.Header>
                        {candidate.firstname} {candidate.lastname}
                    </Card.Header>
                    <Card.Meta>
                        <Label positive={candidate.active}>{candidate.active ? "actif" : "désactivé"}</Label>
                        <Label positive={candidate.votable}>{candidate.votable ? "votable" : "non votable"}</Label>
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={this.toggleState} name="display_menu">{display_menu ? "Annuler" : "Gérer"}</Button>
                    {display_menu &&
                        [
                            <Button positive={!candidate.active} negative={candidate.active} onClick={this.toggleActive}>{candidate.active ? "Désactiver" : "Activer"}</Button>,
                            <Button positive={!candidate.votable} negative={candidate.votable} onClick={this.toggleVotable}>{candidate.votable ? "Bloquer votes" : "Activer votes"}</Button>,
                            <Button onClick={this.edit}>Modifier</Button>,
                            <Button negative onClick={this.openModal}>Supprimer</Button>
                        ]
                    }
                </Card.Content>
                <Modal
                    open={display_modal}
                    onClose={this.closeModal}
                    size="tiny"
                >
                    <Modal.Header>Supprimer le Candidat</Modal.Header>
                    <Modal.Content>
                        Êtes-vous sur de vouloir supprimer le candidat <span style={{fontWeight: 'bold'}} >{candidate.firstname} {candidate.lastname}</span> ?
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="blue" onClick={this.closeModal}>
                            Annnuler
                        </Button>
                        <Button negative onClick={this.remove}>
                            Supprimer
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Card>
        )
    }
}