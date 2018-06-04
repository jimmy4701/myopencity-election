import {Mongo} from 'meteor/mongo'

export const CandidatesVotes = new Mongo.Collection('candidatesvotes')

const CandidateVoteSchema = new SimpleSchema({
    user: {
      type: String,
      unique: true
    },
    username: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    created_at: {
      type: Date,
      defaultValue: new Date()
    }
    
})

CandidatesVotes.attachSchema(CandidateVoteSchema);
