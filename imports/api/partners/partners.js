import {Mongo} from 'meteor/mongo'

export const Partners = new Mongo.Collection('partners')

const PartnerSchema = new SimpleSchema({
    image_url: {
      type: String
    },
    link: {
      type: String
    }
})

Partners.attachSchema(PartnerSchema);
