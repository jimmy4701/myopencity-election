import {Meteor} from 'meteor/meteor'
import {Partners} from '../partners'

Meteor.publish('partners.all', function(){
    return Partners.find()
})