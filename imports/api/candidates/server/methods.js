import {Meteor} from 'meteor/meteor'
import {Candidates} from '../candidates'

Meteor.methods({
  'candidates.insert'(candidate){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      Candidates.insert(candidate)
    }
  },
  'candidates.update'(candidate){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      Candidates.update({_id: candidates._id}, {$set: candidates})
    }
  },
  'candidates.remove'(candidate_id){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      Candidates.remove({_id: candidates_id})
    }
  }
})
