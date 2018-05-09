import {Meteor} from 'meteor/meteor'
import {Candidates} from '../candidates'

Meteor.methods({
  'candidates.insert'(candidate){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      Candidates.insert(candidate)
    }
  },
  'candidates.update'(candidate){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      Candidates.update({_id: candidates._id}, {$set: candidates})
    }
  },
  'candidates.remove'(candidate_id){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      Candidates.remove({_id: candidates_id})
    }
  }
})
