import React, {Component} from 'react'
import { Form, Button } from 'semantic-ui-react'

export default class CandidateForm extends Component {
    state = {
        candidate: {}
    }

    handlePictureImport(e){
        e.preventDefault()
        this.setState({loading_candidate_image: true})
        var metaContext = {}
        var uploader = new Slingshot.Upload("ConsultImage", metaContext)
        uploader.send(e.target.files[0], (error, downloadUrl) => {
          if (error) {
            // Log service detailed response
            console.error('Error uploading', error)
            this.setState({loading_candidate_image: false})
            Bert.alert({
              title: "Une erreur est survenue durant l'envoi de l'image à Amazon",
              message: error.reason,
              type: 'danger',
              style: 'growl-bottom-left',
            })
          }
          else {
            // we use $set because the user can change their avatar so it overwrites the url :)
            const {candidate} = this.state
            candidate.image_url = downloadUrl
            this.setState({candidate, loading_candidate_image: false})
          }
          // you will need this in the event the user hit the update button because it will remove the avatar url
        })
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
                if(this.props.onSubmitForm){
                    this.props.onSubmitForm()
                }
            }
        })
    }

    componentDidMount(){
        if(this.props.candidate){
            this.setState({candidate: this.props.candidate})
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

    handleGender = (event, data) => {
        let { candidate } = this.state
        candidate.gender = data.value
        this.setState({candidate})
    }

    render(){
        const {candidate, loading_candidate_image} = this.state
        const {amazon_connected} = Session.get('global_configuration')
        return(
            <Form onSubmit={this.submit}>
                <Form.Group widths='equal'>
                    <Form.Select
                        value={candidate.gender}
                        required
                        options={[
                            {key: "F", value: "F", text: "Femme"},
                            {key: "M", value: "M", text: "Homme"}
                        ]}
                        onChange={this.handleGender}
                        label="Genre"
                    />
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
                {amazon_connected ?
                    <Form.Input
                        label='Envoyez une image à partir de votre ordinateur'
                        onChange={(e) => {this.handlePictureImport(e)}}
                        type="file"
                        loading={loading_candidate_image}
                    />
                :
                    <p>Envie d'envoyer des images depuis votre ordinateur ? Vous devez <a href="/admin/external_apis">configurer Amazon S3</a></p>
                }
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