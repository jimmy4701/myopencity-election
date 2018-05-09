import {Mongo} from 'meteor/mongo'

export const CandidatesVotes = new Mongo.Collection('candidatesvotes')

const CandidateVoteSchema = new SimpleSchema({
    user: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    }
})

CandidatesVotes.attachSchema(CandidateVoteSchema);
