const isProd = process.env.NODE_ENV === 'production';

export const COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd
}

// export const COOKIE_OPTIONS = {
//     httpOnly: true,
//     sameSite: "none",
//     secure: true,
//     domain : '.onrender.com',
//     path : '/'
// }

export const RESERVED_USERNAMES = [
  // System / core
  "admin", "root", "system", "support", "help", "contact", "info", "about", "terms", "privacy", "faq",

  // Auth / user account
  "login", "logout", "signup", "signin", "signout", "register", "auth", "authentication", "verify", "verified", "forgot", "reset", "token", "session", "sessions", "me", "guest",

  // Users & roles
  "user", "users", "seller", "sellers", "buyer", "buyers", "host", "hosts", "admin-panel", "admin-dashboard", "moderator", "staff", "team",

  // Content/media
  "reels", "reel", "video", "videos", "shorts", "live", "stream", "streams", "livestream", "broadcast", "show", "shows", "watch", "play", "media", "feed", "explore", "discover", "trending",

  // Listings / commerce
  "shop", "store", "stores", "market", "marketplace", "product", "products", "listing", "listings", "catalog", "cart", "checkout", "buy", "sell", "sale", "sales", "order", "orders", "shipping", "payment", "payments", "billing", "invoice", "transaction", "transactions",

  // Auctions
  "auction", "auctions", "bid", "bids", "live-auction", "auction-room", "start-bid", "end-bid",

  // Messaging / social
  "notifications", "messages", "message", "inbox", "outbox", "chat", "chats", "dm", "follow", "followers", "following", "likes", "comments", "comment", "reply",

  // Upload / file
  "upload", "uploads", "download", "downloads", "file", "files", "media", "image", "images", "photo", "photos", "avatar", "thumbnail", "preview",

  // Actions / routes
  "new", "create", "edit", "update", "delete", "remove", "save", "submit", "share", "report", "block",

  // Tech / backend / API
  "api", "webhook", "callback", "config", "configuration", "env", "settings", "status", "error", "database", "db", "collection", "collections", "query", "mutation", "graphql", "admin-api",

  // Security / misc
  "secure", "security", "null", "undefined", "true", "false", "test", "demo", "sample",

  // Potential ID/key collisions
  "showId", "userId", "sellerId", "hostId", "productId", "listingId", "auctionId", "user._id", "seller._id", "host._id", "itemId",

  // Reserved frontend
  "home", "app", "dashboard", "profile", "account", "username-availability", "search", "filter", "sort", "page", "pages", "preview",

  // Blank
  "", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
];



// export const USER_PUBLIC_FIELDS = 'name emailId userName mobile role profileURL sellerInfo accessAllowed filledNewSellerForm backgroundCoverURL bio categories';

export const USER_PUBLIC_FIELDS = [
  'name',
  'emailId',
  'userName',
  'mobile',
  'role',
  'profileURL',
  'sellerInfo',
  'dropshipperInfo',
  'accessAllowed',
  'filledNewSellerForm',
  'backgroundCoverURL',
  'bio',
  'categories',
  'isVerified',
  'verificationDate',
  'isPaymentEnabled',
  'paymentEnabledAt',
  'address',
  'verifiedAddress'
].join(' ');

export const SELLER_PUBLIC_FIELDS = 'userInfo companyName email sellerType businessType sellerExperienceInfo productCategories wantToSell approvalStatus rejectedReason';

const SHIPPER_INFO_FIELDS = 'businessName approvalStatus userInfo'; 

export const PRODUCT_EXCLUDED_FIELDS = "-sellerId -productPrice -startingPrice -reservedPrice -createdAt -updatedAt -__v";

export const PRODUCT_PUBLIC_FIELDS = "title description quantity images hsnNo productPrice weight sellerId MRP";

export const USER_FEED_SHOWS_FIELDS = "language likes sellerId showStatus category subCategory tags thumbnailImage scheduledAt title previewVideo liveStreamId";

export const USER_FEED_PRODUCTS_FIELDS = "sellerId title description quantity images category subcategory productPrice MRP";

export const USER_FEED_SHOPPABLE_VIDEOS_FIELDS = "host hostModal sellerId title description category subcategory thumbnailURL visiblity masterPlaylistKey";

export const AGG_USER_FIELDS = {
  name: 1,
  emailId: 1,
  userName: 1,
  mobile: 1,
  role: 1,
  profileURL: 1,
  sellerInfo: 1,
  accessAllowed: 1,
  backgroundCoverURL: 1,
  bio: 1
};

export const AGG_SELLER_FIELDS = {
  userInfo: 1,
  companyName: 1,
  email: 1,
  sellerType: 1,
  businessType: 1,
  sellerExperienceInfo: 1,
  productCategories: 1,
  wantToSell: 1
};

export const AGG_DROPSHIPPER_FIELDS = {
  userInfo: 1,
  businessName: 1,
  email: 1,
  mobileNumber: 1,
  address: 1,
  approvalStatus: 1
};

export const AGG_SHOWS_FIELDS = {
  language: 1,
  likes: 1,
  sellerId: 1,
  showStatus: 1,
  category: 1,
  subCategory: 1,
  tags: 1,
  title: 1,
  scheduledAt: 1,
  thumbnailImage: 1,
  previewVideo: 1,
  liveStreamId: 1
};

export const AGG_PRODUCTS_FIELDS = {
  sellerId: 1,
  title: 1,
  description: 1,
  quantity: 1,
  images: 1,
  category: 1,
  subcategory: 1,
  productPrice: 1,
  MRP: 1
};

export const AGG_SHOPPABLE_VIDEOS_FIELDS = {
  sellerId: 1,
  title: 1,
  description: 1,
  category: 1,
  subcategory: 1,
  thumbnailURL: 1,
  thumbnailBlobName: 1,
  hlsMasterPlaylistUrl: 1
};

export const CLEAN_USER_FIELDS = ['_id', 'userName', 'name', 'emailId', 'role', 'accessAllowed', 'profileURL', 'backgroundCoverURL', 'bio'];


