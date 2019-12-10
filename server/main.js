import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import moment from 'moment';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
    let momentNow = moment();
    console.log(momentNow);
    
    console.log(momentNow.format('MMM Do, YYYY'));
    console.log(momentNow.format('h:mma'));
    console.log(momentNow.locale('fr').fromNow());
    


    WebApp.connectHandlers.use((req, res, next) => {
        const _id = req.url.slice(1);
        console.log('_ID: ', _id);
        const link = Links.findOne({ _id })
        console.log('link: ', link);

        if (link) {
            res.statusCode = 302;
            res.setHeader('Location', link.url);
            res.end();
            Meteor.call('links.trackVisit', _id)
        } else {
            
            next();
        }
    })
    // WebApp.connectHandlers.use((req, res, next) => {
    //     console.log('This.is from my middleware');
    //     console.log(req.url);
    //     console.log('req.method :',req.method);
    //     console.log('req.headers: ',req.headers);
    //     console.log('req.query: ',  req.query);
    //     res.statusCode = 404;
    //     res.setHeader('My-custom-header', 'Philippe was here');
    //     // res.end()
        
    //     next();
    // })
});
