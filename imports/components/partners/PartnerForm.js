import React, {Component} from 'react'
import { Form, Button } from 'semantic-ui-react'

export default class PartnerForm extends Component {
    state = {
        partner: {}
    }

    handlePictureImport(e){
        e.preventDefault()
        this.setState({loading_partner_image: true})
        var metaContext = {}
        var uploader = new Slingshot.Upload("ConsultImage", metaContext)
        uploader.send(e.target.files[0], (error, downloadUrl) => {
          if (error) {
            // Log service detailed response
            console.error('Error uploading', error)
            this.setState({loading_partner_image: false})
            Bert.alert({
              title: "Une erreur est survenue durant l'envoi de l'image à Amazon",
              message: error.reason,
              type: 'danger',
              style: 'growl-bottom-left',
            })
          }
          else {
            // we use $set because the user can change their avatar so it overwrites the url :)
            const {partner} = this.state
            partner.image_url = downloadUrl
            this.setState({partner, loading_partner_image: false})
          }
          // you will need this in the event the user hit the update button because it will remove the avatar url
        })
    }

    submit = (e) => {
        e.preventDefault()
        const {partner} = this.state
        const editing = this.props.partner
        Meteor.call(editing ? 'partners.update' : 'partners.insert', partner  , (error, result) => {
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
        if(this.props.partner){
            this.setState({partner: this.props.partner})
        }
    }
    
    togglePartner = (e, {name}) => {
        let {partner} = this.state
        partner[name] = !partner[name]
        this.setState({partner})
    }

    handlePartnerChange = (e, {name, value}) => {
        let {partner} = this.state
        partner[name] = value
        this.setState({partner})
    }

    render(){
        const {partner, loading_partner_image} = this.state
        const {amazon_connected} = Session.get('global_configuration')
        return(
            <Form onSubmit={this.submit}>
                <Form.Group widths='equal'>
                    <Form.Input
                        label='Lien vers le site du partenaire'
                        onChange={this.handlePartnerChange}
                        value={partner.link}
                        name='link'
                    />
                    <Form.Input
                        label='Image URL du logo'
                        onChange={this.handlePartnerChange}
                        value={partner.image_url}
                        name='image_url'
                    />
                </Form.Group>
                {amazon_connected ?
                    <Form.Input
                        label='Envoyez une image à partir de votre ordinateur'
                        onChange={(e) => {this.handlePictureImport(e)}}
                        type="file"
                        loading={loading_partner_image}
                    />
                :
                    <p>Envie d'envoyer des images depuis votre ordinateur ? Vous devez <a href="/admin/external_apis">configurer Amazon S3</a></p>
                }
                <Button positive>{this.props.partner ? "Modifier" : "Créer"}</Button>
            </Form>
        )
    }
}