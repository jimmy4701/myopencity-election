import {Mongo} from 'meteor/mongo'

export const Candidates = new Mongo.Collection('candidates')

const CandidateSchema = new SimpleSchema({
    image_url: {
      type: String
    },
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    social_url: {
      type: String
    },
    votes: {
      type: Number,
      defaultValue: 0
    },
    active: {
        type: Boolean,
        defaultValue: true
      },
    votables: {
      type: Boolean,
      defaultValue: true
    },
})

Candidates.attachSchema(CandidateSchema);
