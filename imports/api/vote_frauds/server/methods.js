import {Meteor} from 'meteor/meteor'
import {VoteFrauds} from '../vote_frauds'

Meteor.methods({
    'vote_frauds.hidde'(id){
        VoteFrauds.update({_id: id}, {$set: {hidden: true}})
    }
})