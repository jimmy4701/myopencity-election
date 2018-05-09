import {Meteor} from 'meteor/meteor'
import {CandidatesVotes} from '../candidates_votes'
import {VoteFrauds} from '/imports/api/vote_frauds/vote_frauds'
import {Candidates} from '/imports/api/candidates/candidates'

import _ from 'lodash';

Meteor.methods({
  'candidates_votes.vote'(candidates){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }
    if(candidates.length > 10) {
      throw new Meteor.Error('403', "Vous ne pouvez voter que pour dix candidats")
    }
    const user = Meteor.users.findOne({_id: this.userId})
    const already_voted = CandidatesVotes.findOne({ $or: [
      {user: this.userId},
      {email: user.emails[0].address}
    ]})
    if(already_voted){
      VoteFrauds.insert({
        user: this.userId,
        email: user.emails[0].address,
        reason: "A déjà voté"
      })
      throw new Meteor.Error('403', "Vous avez déjà voté")
    }

    candidates.forEach(candidate => {
      const candidate_exist = Candidates.findOne({ _id: candidate})
      if(!candidate_exist) {
        VoteFrauds.insert({
          user: this.userId,
          email: user.emails[0].address,
          reason: "A tenté de voter pour un candidat inexistant"
        })
        throw new Meteor.Error('403', "Vous avez voté pour un candidat inexistant")
      }
    });

    candidates_filtered = _.uniqWith(candidates, _.isEqual)
    if(candidates_filtered.length != candidates.length){
      VoteFrauds.insert({
        user: this.userId,
        email: user.emails[0].address,
        reason: "A tenté de voter deux fois pour le même candidat"
      })
    }

    candidates_filtered.forEach(candidate => {
      Candidates.update({ _id: candidate}, { $inc: {vote: 1}})
    });

    CandidatesVotes.insert({
      user: this.userId,
      email: user.emails[0].address
    })
  },
})
