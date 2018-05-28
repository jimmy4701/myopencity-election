import {Meteor} from 'meteor/meteor'
import {CandidatesVotes} from '../candidates_votes'
import {VoteFrauds} from '/imports/api/vote_frauds/vote_frauds'
import {Candidates} from '/imports/api/candidates/candidates'
import {AuthorizedEmails} from '/imports/api/authorized_emails/authorized_emails';
import {Configuration} from '/imports/api/configuration/configuration';



import _ from 'lodash';

Meteor.methods({
  'candidates_votes.vote'(candidates){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }

    const user = Meteor.users.findOne({_id: this.userId})
    const {vote_step} = Configuration.findOne();

    if (vote_step === "close") {
      VoteFrauds.insert({
        user: this.userId,
        email: user.emails[0].address,
        reason: "A tenté de voter quand les votes étaient clos"
      })
      throw new Meteor.Error('403', "Les votes sont clos")
    }
    
    if (vote_step === "early_voters" && !Roles.userIsInRole(this.userId, ['early_voters', 'admin'])) {
      VoteFrauds.insert({
        user: this.userId,
        email: user.emails[0].address,
        reason: "A tenté de voter en vote anticipé sans faire partie des voteurs anticipés"
      })
      throw new Meteor.Error('403', "Les votes sont ne sont pas encore ouverts")      
    }

    const authorized = AuthorizedEmails.findOne({email: user.emails[0].address});    
    if(!(authorized || Roles.userIsInRole(this.userId, 'admin'))) {
      VoteFrauds.insert({
        user: this.userId,
        email: user.emails[0].address,
        reason: "A tenté de voter sans faire partie des voteurs autorisés"
      })
      throw new Meteor.Error('403', "Vous ne faites pas partis des voteurs autorisés")
    }

    if(candidates.length > 10) {
      VoteFrauds.insert({
        user: this.userId,
        email: user.emails[0].address,
        reason: "A tenté de voter pour plus de dix candidats"
      })
      throw new Meteor.Error('403', "Vous ne pouvez voter que pour dix candidats")
    }

    const already_voted = CandidatesVotes.findOne({ $or: [
      {user: this.userId},
      {email: user.emails[0].address}
    ]})
    if(already_voted){
      VoteFrauds.insert({
        user: this.userId,
        email: user.emails[0].address,
        reason: "A tenté de voter deux fois"
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

    Candidates.update({ _id: {$in: candidates_filtered}}, { $inc: {votes: 1}})

    CandidatesVotes.insert({
      user: this.userId,
      email: user.emails[0].address
    })
  },
})
