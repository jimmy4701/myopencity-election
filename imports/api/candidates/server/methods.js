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
      Candidates.update({_id: candidate._id}, {$set: candidate})
    }
  },
  'candidates.remove'(candidate_id){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      Candidates.remove({_id: candidate_id})
    }
  },
  'candidates.toggle_active'(candidate_id){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      const candidate = Candidates.findOne({_id: candidate_id})
      if(!candidate){
        throw new Meteor.Error('500', "Candidat inexistant")
      }
      Candidates.update({_id: candidate_id}, {$set: {active: !candidate.active}})
    }
  },
  'candidates.toggle_votable'(candidate_id){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      const candidate = Candidates.findOne({_id: candidate_id})
      if(!candidate){
        throw new Meteor.Error('500', "Candidat inexistant")
      }
      Candidates.update({_id: candidate_id}, {$set: {votable: !candidate.votable}})
    }
  }
})
