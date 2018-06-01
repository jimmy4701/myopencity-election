import {Meteor} from 'meteor/meteor'
import {Partners} from '../partners'

Meteor.methods({
  'partners.insert'(partner){
    if(!Roles.userIsInRole(this.userId, ['admin', 'moderator'])) {
      throw new Meteor.Error('403', "Vous devez vous être administrateur")
    }
    Partners.insert(partner)
  },
  'partners.update'(partner){
    if(!Roles.userIsInRole(this.userId, ['admin', 'moderator'])) {
      throw new Meteor.Error('403', "Vous devez vous être administrateur")
    }
    Partners.update({_id: partner._id}, {$set: partner})
  },
  'partners.remove'(id){
    if(!Roles.userIsInRole(this.userId, ['admin', 'moderator'])) {
      throw new Meteor.Error('403', "Vous devez vous être administrateur")
    }
    Partners.remove(id)
  },
})
