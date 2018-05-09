import {Mongo} from 'meteor/mongo'

export const VoteFrauds = new Mongo.Collection('votefrauds')

const VoteFraudSchema = new SimpleSchema({
    user: {
      type: String
    },
    email: {
      type: String
    },
    createdAt: {
      type: Date,
      defaultValue: new Date()
    },
    reason: {
      type: String,
    }
})

VoteFrauds.attachSchema(VoteFraudSchema);
