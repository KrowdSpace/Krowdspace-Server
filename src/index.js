import * as restify from 'restify';
import {user, proj, socials, impressions} from './lib/user_test.js';

const conf = {
    port: 8080,
};

const server = restify.createServer();

server.get(user.userUrl, user.getUser);
server.get(proj.projUrl, proj.getProj);
server.get(socials.socUrl, socials.getSocials);
server.get(impressions.impUrl, impressions.getImp);

server.listen(conf.port, ()=>
{
    console.log('Server On, and Listening on port ' + conf.port);
});
