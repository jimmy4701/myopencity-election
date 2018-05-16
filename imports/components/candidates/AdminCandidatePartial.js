import React, {Component} from 'react'
import { Card, Button, Image, Label } from 'semantic-ui-react'

export default class AdminCandidatePartial extends Component {
    state = {
        display_menu: false
    }

    toggleState = (e, {name, value}) => this.setState({[name]: value})

    toggleVotes = () => {
        Meteor.call('candidates.toggle_vote', this.props.candidate._id , (error, result) => {
            if(error){
                console.log('Erreur', error.message)
                Bert.alert({
                    title: 'Erreur lors du changement de configuration',
                    style: 'growl-bottom-left',
                    type: 'danger'
                })
            }else{
                Bert.alert({
                    title: 'Configuration modifiée',            
                    style: 'growl-bottom-left',
                    type: 'success'
                })
            }
        })
    }

    toggleActive = () => {
        Meteor.call('candidates.toggle_active', this.props.candidate._id , (error, result) => {
            if(error){
                console.log('Erreur', error.message)
                Bert.alert({
                    title: 'Erreur lors du changement de configuration',
                    style: 'growl-bottom-left',
                    type: 'danger'
                })
            }else{
                Bert.alert({
                    title: 'Configuration modifiée',            
                    style: 'growl-bottom-left',
                    type: 'success'
                })
            }
        })
    }

    render(){
        const {candidate} = this.props
        const {display_menu} = this.state
        return(
            <Card>
                <Image src={candidate.image_url}/>
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
                    <Button onClick={this.toggleState} name="display_menu">{display_menu ? "Gérer" : "Annuler"}</Button>
                    {display_menu &&
                        [
                            <Button positive={!candidate.active} negative={candidate.active} onClick={this.toggleActive}>{candidate.active ? "Désactiver" : "Activer"}</Button>,
                            <Button positive={!candidate.votable} negative={candidate.votable} onClick={this.toggleVotes}>{candidate.votable ? "Bloquer votes" : "Activer votes"}</Button>,
                            <Button negative onClick={this.remove}>Supprimer</Button>
                        ]
                    }
                </Card.Content>
            </Card>
        )
    }
}