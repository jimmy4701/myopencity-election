import {Meteor} from 'meteor/meteor'
import {CandidatesVotes} from '../candidates_votes'

Meteor.publish('candidates_votes.all', function(){
    if(Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
        return CandidatesVotes.find()
    }
})

Meteor.publish('candidates_votes.me', function(){
    if (this.userId) {
        return CandidatesVotes.find({user: this.userId})
    }else{
        return CandidatesVotes.find({user: null})
    }
})