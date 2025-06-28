const isLocalIp = (ip) => {
    return ip === '127.0.0.1' || 
           ip === '::1' || 
           ip.startsWith('10.') || 
           ip.startsWith('192.168.') || 
           ip.startsWith('172.') ||
           ip.startsWith('fc00:');
};

const ipMiddleware = (req, res, next) => {
    const headers = req.headers;
    let ip = req.socket.remoteAddress;
    
    // Check for cloudflare headers first
    if (headers['cf-connecting-ip']) {
        ip = headers['cf-connecting-ip'];
    } else {
        const xForwardedFor = headers['x-forwarded-for'];
        if (xForwardedFor) {
            const ips = xForwardedFor.split(',');
            // Return the first non-internal IP
            for (const candidate of ips) {
                const trimmed = candidate.trim();
                if (!isLocalIp(trimmed)) {
                    ip = trimmed;
                    break;
                }
            }
        }
    }

    // Handle IPv4-mapped IPv6 addresses
    if (ip.startsWith('::ffff:')) {
        ip = ip.substring(7);
    }

    // Set the client IP on the request
    req.clientIp = ip;
    next();
};

export default ipMiddleware;