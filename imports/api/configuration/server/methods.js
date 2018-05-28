import {Meteor} from 'meteor/meteor'
import {Configuration} from '../configuration'

Meteor.methods({
  'configuration.update'(config){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      console.log("config call", config);

      config.initial_configuration = false
      Configuration.update({}, {$set: config})
    }
  },

  'configuration.show_results'(){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez être administrateur")      
    }
    Configuration.update({}, {$set:{
      show_results: true,
      animate: true,
      vote_step: "close"
    }})
  },

  'configuration.finish_animation'(){
    const { show_results } = Configuration.findOne();
    if(show_results) {
      Configuration.update({}, {$set:{
        show_results: true,
        animate: false,
        vote_step: "close"
      }})
    }
  }
})
