import {Meteor} from 'meteor/meteor'
import {Candidates} from '../candidates'

Meteor.publish('candidates.all', function(){
    return Candidates.find({ active: true})
})
