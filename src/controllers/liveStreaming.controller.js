import { AccessToken } from 'livekit-server-sdk';

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY;
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET;


export const generateLiveStramingAccessToken = async (req, res) => {

    const roomName = req.query.room || 'default-room';
    const participantName = req.query.username || 'participant';

  const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
    identity: participantName,
    ttl: '10m',
  });
  at.addGrant({ roomJoin: true, room: roomName });

  const token =  await at.toJwt();

  return res.status(200).json({status:true, message:"token generated successfully!", data:{token}})
  }