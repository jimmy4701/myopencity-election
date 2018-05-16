import React, {Component} from 'react'
import { Form, Button } from 'semantic-ui-react'

export default class CandidateForm extends Component {
    state = {
        candidate: {}
    }

    submit = (e) => {
        e.preventDefault()
        const {candidate} = this.state
        const editing = this.props.candidate
        Meteor.call(editing ? 'candidates.update' : 'candidates.insert', candidate  , (error, result) => {
            if(error){
                console.log('Erreur', error.message)
                Bert.alert({
                    title: "Erreur lors de" + ( editing ? " la modification" : " la création") ,
                    style: 'growl-bottom-left',
                    type: 'error'
                })
            }else{
                Bert.alert({
                    title: "Soumission ok" ,
                    style: 'growl-bottom-left',
                    type: 'success'
                })
            }
        })
    }

    componentWillReceiveProps(props){
        if(props.candidate){
            this.setState({candidate: props.candidate})
        }
    }
    
    toggleCandidate = (e, {name}) => {
        let {candidate} = this.state
        candidate[name] = !candidate[name]
        this.setState({candidate})
    }

    handleCandidateChange = (e, {name, value}) => {
        let {candidate} = this.state
        candidate[name] = value
        this.setState({candidate})
    }

    render(){
        const {candidate} = this.state
        return(
            <Form onSubmit={this.submit}>
                <Form.Group widths='equal'>
                    <Form.Input
                        label='Nom de famille'
                        onChange={this.handleCandidateChange}
                        value={candidate.lastname}
                        name='lastname'
                    />
                    <Form.Input
                        label='Prénom'
                        onChange={this.handleCandidateChange}
                        value={candidate.firstname}
                        name='firstname'
                    />
                    <Form.Input
                        label='Punchline'
                        onChange={this.handleCandidateChange}
                        value={candidate.punchline}
                        name='punchline'
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.TextArea
                        label='Description / Biographie'
                        onChange={this.handleCandidateChange}
                        value={candidate.bio}
                        name='bio'
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input
                        label='Social URL'
                        onChange={this.handleCandidateChange}
                        value={candidate.social_url}
                        name='social_url'
                    />
                    <Form.Input
                        label='Image URL'
                        onChange={this.handleCandidateChange}
                        value={candidate.image_url}
                        name='image_url'
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Checkbox
                        label='Actif'
                        onChange={this.toggleCandidate}
                        checked={candidate.active}
                        name='active'
                    />
                    <Form.Checkbox
                        label='Votable'
                        onChange={this.toggleCandidate}
                        checked={candidate.votable}
                        name='votable'
                    />
                </Form.Group>
                <Button positive>{this.props.candidate ? "Modifier" : "Créer"}</Button>
            </Form>
        )
    }
}