import {Meteor} from 'meteor/meteor'
import {Candidates} from '../candidates'

Meteor.publish('candidates.all', function(){
    if(Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
        return Candidates.find({})
    }
})

Meteor.publish('candidates.active', function(){
    return Candidates.find({active: true})
})
