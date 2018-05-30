import { Meteor } from 'meteor/meteor'
import { AuthorizedEmails } from '../authorized_emails'

Meteor.methods({
    'authorized_emails.add'(emails) {
        if (!this.userId) {
            throw new Meteor.Error('403', "Vous devez être connecté")            
        }
        if (!Roles.userIsInRole(this.userId, ['admin', 'moderator'])) {
            throw new Meteor.Error('403', "Vous devez être administrateur")
        }
        if (!Array.isArray(emails)) {
            emails = [emails]
        }
        emails.forEach(email => {
            AuthorizedEmails.insert({email});
        })
    },
    'authorized_emails.remove'(emails) {
        if (!this.userId) {
            throw new Meteor.Error('403', "Vous devez être connecté")            
        }
        if (!Roles.userIsInRole(this.userId, ['admin', 'moderator'])) {
            throw new Meteor.Error('403', "Vous devez être administrateur")
        }
        if (!Array.isArray(emails)) {
            emails = [emails]
        }
        emails.forEach(email => {
            AuthorizedEmails.remove({email});
        })
    },

    'authorized_emails.remove_all'() {
        if (!this.userId) {
            throw new Meteor.Error('403', "Vous devez être connecté")            
        }
        if (!Roles.userIsInRole(this.userId, ['admin', 'moderator'])) {
            throw new Meteor.Error('403', "Vous devez être administrateur")
        }
        AuthorizedEmails.remove({});
    }
})