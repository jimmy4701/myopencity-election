import {Mongo} from 'meteor/mongo'

export const AuthorizedEmails = new Mongo.Collection('authorizedemails')

const AuthorizedEmailSchema = new SimpleSchema({
    email: {
      type: String,
      unique: true
    }
})

AuthorizedEmails.attachSchema(AuthorizedEmailSchema);
