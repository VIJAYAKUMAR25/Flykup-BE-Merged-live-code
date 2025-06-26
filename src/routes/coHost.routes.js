import Express from 'express';
import { 
    cancelCoHostInvite, 
    getReceivedCoHostRequests, 
    getSellersAndDropshippers, 
    getShowCoHostInvites, 
    inviteAndJoinLive, 
    leaveCoHost, 
    removeCoHostByHost, 
    respondToCoHostInvite, 
    sendInvite 
} from '../controllers/coHost.controller.js';
import { hostAuth, userAuth } from '../middlewares/auth.js';

const coHostRouter = Express.Router();

/* ------ GET methods -------- */ 
coHostRouter.get("/users", userAuth, getSellersAndDropshippers);
coHostRouter.get("/invite/received", userAuth, getReceivedCoHostRequests);
coHostRouter.get("/invited/:showId", userAuth, getShowCoHostInvites);

/* ------ POST methods -------- */ 
coHostRouter.post("/invite/:showId", hostAuth, sendInvite);

/* ------ PATCH methods -------- */ 
coHostRouter.patch("/respond/:inviteId", userAuth, respondToCoHostInvite);
coHostRouter.patch("/cancel/:inviteId", userAuth, cancelCoHostInvite);
coHostRouter.patch("/leave/:inviteId", userAuth, leaveCoHost);
coHostRouter.patch("/remove/:inviteId", userAuth, removeCoHostByHost);
coHostRouter.post("/invite-live/:showId", hostAuth, inviteAndJoinLive);

export default coHostRouter;