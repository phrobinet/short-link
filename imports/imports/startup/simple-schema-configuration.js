import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

SimpleSchema.defineValidationErrorTransform(error => {
    return new Meteor.Error(error.message);
    // messages: {
    //     fr: {
    //       regEx({ label, regExp }) {
    //                   switch (regExp) {
    //                       case (SimpleSchema.RegEx.Email.toString()):
    //                       case (SimpleSchema.RegEx.EmailWithTLD.toString()):
    //                           return "Cette adresse e-mail est incorrecte";
    //                       case (SimpleSchema.RegEx.Domain.toString()):
    //                       case (SimpleSchema.RegEx.WeakDomain.toString()):
    //                           return "Ce champ doit être un domaine valide";
    //                       case (SimpleSchema.RegEx.IP.toString()):
    //                           return "Cette adresse IP est invalide";
    //                       case (SimpleSchema.RegEx.IPv4.toString()):
    //                           return "Cette adresse IPv4 est invalide";
    //                       case (SimpleSchema.RegEx.IPv6.toString()):
    //                           return "Cette adresse IPv6 est invalide";
    //                       case (SimpleSchema.RegEx.Url.toString()):
    //                           return "Cette URL is invalide";
    //                       case (SimpleSchema.RegEx.Id.toString()):
    //                           return "Cet identifiant alphanumérique est invalide";
    //                       case (SimpleSchema.RegEx.ZipCode.toString()):
    //                           return "Ce code ZIP est invalide";
    //                       case (SimpleSchema.RegEx.Phone.toString()):
    //                           return "Ce numéro de téléphone est invalide";
    //                       default:
    //                           return "Ce champ a échoué la validation par Regex";
    //                   }
    //               },
    //       }
    //     }
    //   }
});