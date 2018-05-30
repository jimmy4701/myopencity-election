import {Meteor} from 'meteor/meteor'
import {AuthorizedEmails} from '../authorized_emails'

Meteor.publish('authorized_emails.all', function(){
    if(Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
        return AuthorizedEmails.find({})
    }
})
