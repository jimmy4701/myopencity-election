import {Meteor} from 'meteor/meteor'
import {VoteFrauds} from '../vote_frauds'

Meteor.publish('vote_frauds.all', function(){
    if(Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
        return VoteFrauds.find({hidden: false})
    }
})
