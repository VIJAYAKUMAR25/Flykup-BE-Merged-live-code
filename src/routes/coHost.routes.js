import Express from 'express';
import { cancelCoHostInvite, getReceivedCoHostRequests, getSellersAndDropshippers, getShowCoHostInvites, leaveCoHost, removeCoHostByHost, respondToCoHostInvite, sendInvite } from '../controllers/coHost.controller.js';
import { hostAuth, userAuth } from '../middlewares/auth.js';

const coHostRouter = Express.Router();

/*  ------ GET methods -------- */ 

// find user to invite
coHostRouter.get("/users", userAuth, getSellersAndDropshippers);
// co host invites received
coHostRouter.get("/invite/received", userAuth, getReceivedCoHostRequests);
// co host invites related to show
coHostRouter.get("/invited/:showId", userAuth, getShowCoHostInvites);


/*  ------ POST methods -------- */ 

// send invite to cohost
coHostRouter.post("/invite/:showId", hostAuth, sendInvite);

/*  ------ PATCH methods -------- */ 

// accept or reject received cohost request
coHostRouter.patch("/respond/:inviteId", userAuth, respondToCoHostInvite);
// host cancelling cohost request they sent
coHostRouter.patch("/cancel/:inviteId", userAuth, cancelCoHostInvite);
// cohost leaving the show
coHostRouter.patch("/leave/:inviteId", userAuth, leaveCoHost);
// host removing cohost from the show
coHostRouter.patch("/remove/:inviteId", userAuth, removeCoHostByHost);


export default coHostRouter;