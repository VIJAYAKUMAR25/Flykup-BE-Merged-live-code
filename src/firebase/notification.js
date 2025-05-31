import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/user.model.js";

// importing json file

// ES6 Easy way (new feat)
// import serviceAccount from './flykup-dc700-firebase-adminsdk-fbsvc-653633f904.json' assert { type: 'json' };
// import serviceAccount from './flykup-512cc-firebase-adminsdk-fbsvc-0ad4cd762a.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Read and parse the file   ---
const serviceAccountPath = path.join(
  __dirname,
  // "./flykup-dc700-firebase-adminsdk-fbsvc-653633f904.json"
  // "./flykup-512cc-firebase-adminsdk-fbsvc-0ad4cd762a.json"
  "./flykup-512cc-e6db9-firebase-adminsdk-fbsvc-ebd70d32e6.json"
);
const serviceAccountJson = fs.readFileSync(serviceAccountPath, "utf8");
const serviceAccount = JSON.parse(serviceAccountJson);

let isFirebaseInitialized = false;

// --- Firebase Admin SDK Initialization ---
try {
  // Initialize only if no apps are already initialized
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin SDK initialized successfully!");
    isFirebaseInitialized = true;
  } else {
    console.log("Firebase Admin SDK already initialized.");
    // Use the default app if already initialized
    // You might not need admin.app() if you only use the default app.
    isFirebaseInitialized = true;
  }
} catch (error) {
  console.error("Error initializing Firebase admin sdk:", error);
  // Application cannot proceed without Firebase, setting flag to false
  isFirebaseInitialized = false;
  // Consider throwing the error or exiting if initialization is critical
  // throw new Error('Firebase Admin SDK initialization failed.');
}

/**
 * Sends push notifications using Firebase Cloud Messaging.
 */


async function sendMulticastNotification(tokens, title, body, customData = {}) {
    // 1. Validate Input Tokens
    if (!Array.isArray(tokens) || tokens.length === 0) {
      console.error(
        "[sendMulticastNotification] Invalid FCM tokens provided. Must be a non-empty array. Received:",
        tokens
      );
      return null;
    }
    if (tokens.length > 500) {
       console.error(
        `[sendMulticastNotification] Token array exceeds the limit of 500. Received ${tokens.length}. You need to batch these calls.`
        // Consider implementing batching logic here or in the calling function
      );
       return null; // Or throw an error / implement batching
    }
    // Optional: Deeper validation to ensure all tokens are strings
    const invalidTokens = tokens.filter(t => typeof t !== 'string' || t.trim() === '');
    if (invalidTokens.length > 0) {
        console.error(
          `[sendMulticastNotification] Some invalid tokens found in the array:`, invalidTokens
        );
        // Decide whether to proceed with valid ones or fail. Filtering is often preferred:
        tokens = tokens.filter(t => typeof t === 'string' && t.trim() !== '');
        if (tokens.length === 0) {
            console.error("[sendMulticastNotification] No valid tokens remaining after filtering.");
            return null;
        }
        console.warn(`[sendMulticastNotification] Proceeding with ${tokens.length} valid tokens.`);
    }
  
  
    // 2. Validate Title and Body (same as single send)
    if (!title || typeof title !== "string") {
      console.warn(
        "[sendMulticastNotification] Invalid or missing title. Sending anyway, but notification might not display well."
      );
      title = title || "";
    }
    if (!body || typeof body !== "string") {
      console.warn(
        "[sendMulticastNotification] Invalid or missing body. Sending anyway, but notification might not display well."
      );
      body = body || "";
    }
  
    // 3. Construct Data Payload (same as single send)
    const payloadData = {
      ...customData,
      notificationTitle: title,
      notificationBody: body,
    };

    // 4. Construct Notification Payload (React Native)
    const notificationPayload = {
      title: title,
      body: body,
  };

  if (customData && typeof customData.imageUrl === 'string' && customData.imageUrl.trim() !== '') {
    notificationPayload.image = customData.imageUrl;
  }
  
    // 4. Message Payload for Multicast
    const messageToSend = {
      // notification: notificationPayload, //(Removed because of web duplication)
      data: payloadData, // Attach custom data
      // --- Platform Specific Config (same as single send) ---
      apns: {
        headers: {
          // 'apns-priority': '5',
          "apns-push-type": "background",
          // 'apns-topic': 'YOUR_APP_BUNDLE_ID' // IMPORTANT! Add your Bundle ID
        },
        payload: {
          aps: {
            "content-available": 1,
          },
        },
      },
      android: {
        priority: "high",
        notification: {
             title: title,
             body: body,
             ...(notificationPayload.image && { imageUrl: notificationPayload.image })
        }
    },
      webpush: {
        headers: {
          // 'Urgency': 'normal',
        },
      },
    };
  
    // 5. Prepare the Multicast Message Object
    const multicastMessage = {
      ...messageToSend, // Spread the common message properties
      tokens: tokens,    // Add the array of target tokens
    };
  
  
    // 6. Send the multicast message
    try {
      console.log(
        `[sendMulticastNotification] Calling admin.messaging().sendEachForMulticast() for ${tokens.length} tokens.`
      );
  
      // Use admin.messaging().sendEachForMulticast()
      const response = await admin.messaging().sendEachForMulticast(multicastMessage);
  
      // 'response' is a BatchResponse object
      console.log(
        `[sendMulticastNotification] Multicast send completed. Success count: ${response.successCount}, Failure count: ${response.failureCount}`
      );
  
      // --- Detailed Error Handling for Failed Tokens ---
      if (response.failureCount > 0) {
        console.warn(`-----------------------------------------`);
        console.warn(`[sendMulticastNotification] Some messages failed to send:`);
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            const failedToken = tokens[idx]; // Get the token corresponding to the failed response
            console.error(
              `  - Token[${idx}]: ${failedToken.substring(0, 15)}... Error: ${resp.error.code} (${resp.error.message})`
            );
            // IMPORTANT: Check for 'messaging/registration-token-not-registered'
            // or 'messaging/invalid-registration-token' errors here
            // and implement logic to remove these invalid tokens from your database.
            if (resp.error.code === 'messaging/registration-token-not-registered' ||
                resp.error.code === 'messaging/invalid-registration-token') {
                 console.log(`   -> Suggest removing invalid token: ${failedToken}`);
                 // Add your DB cleanup logic here, e.g.,
                 // removeTokenFromUser(failedToken);
            }
          }
        });
        console.warn(`-----------------------------------------`);
      }
      // --- End Error Handling ---
  
      return response; // Return the BatchResponse object
  
    } catch (error) {
      // --- General Error Logging (network issues, auth problems, etc.) ---
      console.error(`-----------------------------------------`);
      console.error(
        `!!! [sendMulticastNotification] Critical error sending multicast notification !!!`
      );
      console.error("Timestamp:", new Date().toISOString());
      if (error.code) {
        console.error("Firebase Error Code:", error.code);
      }
      if (error.message) {
        console.error("Firebase Error Message:", error.message);
      }
      console.error("Full Error Object:", JSON.stringify(error, null, 2));
      console.error(`-----------------------------------------`);
      // --- End Logging ---
      return null; // Indicate failure
    }
  }
  

async function sendSingleNotification(token, title, body, customData = {}) {
  // Validate Input Token
  if (typeof token !== "string" || token.trim() === "") {
    console.error(
      "[sendSingleNotification] Invalid FCM token provided. Must be a non-empty string. Received:",
      token
    );
    return null;
  }
  if (!title || typeof title !== "string") {
    console.warn(
      "[sendSingleNotification] Invalid or missing title. Sending anyway, but notification might not display well."
    );
    title = title || "";
  }
  if (!body || typeof body !== "string") {
    console.warn(
      "[sendSingleNotification] Invalid or missing body. Sending anyway, but notification might not display well."
    );
    body = body || "";
  }

  // construct data payload
  const payloadData = {
    ...customData,
    notificationTitle: title,
    notificationBody: body,
  };

  // Message Payload (Data - only) - to avoid duplication
  const messageToSend = {
    data: payloadData, // Attach custom data
    token: token,
    // --- Platform Specific Config for Reliability (Especially iOS Background) ---
    apns: {
      headers: {
        // 'apns-priority': '5', // '5' for normal, '10' for high (use '5' for background unless urgent)
        "apns-push-type": "background", // Crucial: Informs APNS this is for background execution
        // 'apns-topic': 'YOUR_APP_BUNDLE_ID' // IMPORTANT: Often required by Apple. Replace with your actual Bundle ID.
      },
      payload: {
        aps: {
          "content-available": 1, // Signals iOS to wake app in background for processing
        },
      },
    },
    android: {
      priority: "normal", // 'normal' or 'high'. 'High' tries to deliver faster/wake sleeping devices.
      // Use 'normal' unless immediate action is required.
    },
    webpush: {
      // Optional: You can set headers for web push if needed
      headers: {
        // 'Urgency': 'normal', // 'very-low', 'low', 'normal', 'high'
        // 'Topic': 'your-topic' // Example custom header if your SW uses it
      },
    },
  };

  // 4. Send the message
  try {
    console.log(
      `[sendSingleNotification] Calling admin.messaging().send() for token: ${token}`
    );
    // Use admin.messaging().send() for single tokens
    const response = await admin.messaging().send(messageToSend);

    // 'response' is a string (the message ID) on success
    console.log(
      `[sendSingleNotification] Successfully sent message to token ${token}. Message ID:`,
      response
    );
    return response; // Return the message ID
  } catch (error) {
    // --- Detailed Error Logging ---
    console.error(`-----------------------------------------`);
    console.error(
      `!!! [sendSingleNotification] Error sending notification to single token: ${token} !!!`
    );
    console.error("Timestamp:", new Date().toISOString());
    if (error.code) {
      // Log Firebase specific error code (e.g., 'messaging/invalid-registration-token')
      console.error("Firebase Error Code:", error.code);
    }
    if (error.message) {
      console.error("Firebase Error Message:", error.message);
    }
    console.error("Full Error Object:", JSON.stringify(error, null, 2)); // Log the structured error
    // console.error('Stack Trace:', error.stack); // Uncomment for full stack if needed
    console.error(`-----------------------------------------`);
    // --- End Logging ---

    // You might want to check error.code here to decide if the token should be removed
    // e.g., if (error.code === 'messaging/registration-token-not-registered') { /* mark token as invalid */ }

    return null; // Indicate failure
  }
}


async function notifyAllUsersWithTokens(title, body, data = {}) {
  let totalSuccess = 0;
  let totalFailure = 0;
  let totalTokensAttempted = 0;

  try {
    // 1. Fetch all users who have at least one token in their fcmTokens array
    const usersWithTokens = await User.find({
      fcmTokens: { $exists: true, $ne: [], $ne: null }
    })
      .select('fcmTokens')
      .lean();

    if (!usersWithTokens || usersWithTokens.length === 0) {
      console.log("[notifyAllUsersWithTokens] No users found with valid FCM tokens.");
      return { success: 0, failure: 0, totalTokensAttempted: 0 };
    }

    // 2. Extract, trim, flatten, and dedupe all tokens
    const allTokens = usersWithTokens.flatMap(user =>
      user.fcmTokens
        .filter(t => typeof t === 'string' && t.trim() !== '')
        .map(t => t.trim())
    );
    const uniqueTokens = [...new Set(allTokens)];
    totalTokensAttempted = uniqueTokens.length;

    if (totalTokensAttempted === 0) {
      console.log("[notifyAllUsersWithTokens] No valid FCM tokens after processing.");
      return { success: 0, failure: 0, totalTokensAttempted: 0 };
    }

    // 3. Batch‐send in groups of 500
    const BATCH_SIZE = 500;
    const totalBatches = Math.ceil(totalTokensAttempted / BATCH_SIZE);

    for (let batchNum = 0; batchNum < totalBatches; batchNum++) {
      const start = batchNum * BATCH_SIZE;
      const tokenBatch = uniqueTokens.slice(start, start + BATCH_SIZE);
      console.log(
        `[notifyAllUsersWithTokens] Sending batch ${batchNum + 1}/${totalBatches} (${tokenBatch.length} tokens)`
      );

      const batchResponse = await sendMulticastNotification(tokenBatch, title, body, data);
      if (batchResponse) {
        totalSuccess += batchResponse.successCount;
        totalFailure += batchResponse.failureCount;
      } else {
        console.error(
          `[notifyAllUsersWithTokens] Batch ${batchNum + 1} failed; marking all ${tokenBatch.length} as failures.`
        );
        totalFailure += tokenBatch.length;
      }

      // small pause between batches (optional)
      await new Promise((r) => setTimeout(r, 200));
    }

    console.log(
      `[notifyAllUsersWithTokens] Done. Attempted=${totalTokensAttempted}, Success=${totalSuccess}, Failure=${totalFailure}`
    );
    return { success: totalSuccess, failure: totalFailure, totalTokensAttempted };
  } catch (error) {
    console.error("[notifyAllUsersWithTokens] Critical error:", error);
    return {
      success: totalSuccess,
      failure: totalFailure,
      totalTokensAttempted,
      error: true,
      errorMessage: error.message
    };
  }
}



async function notifyMultipleUsers(userIds, title, body, data = {}) {
    console.log(`[notifyMultipleUsers] Starting notification process for ${userIds.length} user IDs.`);
    try {
        // 1. Fetch FCM tokens
        const users = await User.find({
            '_id': { $in: userIds },
            'fcmToken': { $exists: true, $ne: null, $ne: "" }
        }).select('fcmToken'); // Only fetch necessary field

        if (!users || users.length === 0) {
            console.log("[notifyMultipleUsers] No users found with FCM tokens for the given IDs.");
            return { success: 0, failure: 0, skipped: userIds.length }; // Indicate nothing sent
        }

        // 2. Extract and deduplicate tokens
        const allTokens = users.reduce((acc, user) => {
             if (typeof user.fcmToken === 'string' && user.fcmToken.trim() !== '') {
                acc.push(user.fcmToken);
            } else if (Array.isArray(user.fcmToken)) {
                const validTokens = user.fcmToken.filter(t => typeof t === 'string' && t.trim() !== '');
                acc.push(...validTokens);
            }
            return acc;
        }, []);
        const uniqueTokens = [...new Set(allTokens)];

        if (uniqueTokens.length === 0) {
            console.log("[notifyMultipleUsers] No valid FCM tokens found among the specified users.");
             return { success: 0, failure: 0, skipped: userIds.length }; // Indicate nothing sent
        }

        console.log(`[notifyMultipleUsers] Found ${uniqueTokens.length} unique valid tokens. Preparing to send.`);

        // 3. Batch and Send using sendMulticastNotification
        const BATCH_SIZE = 500;
        let totalSuccess = 0;
        let totalFailure = 0;

        for (let i = 0; i < uniqueTokens.length; i += BATCH_SIZE) {
            const tokenBatch = uniqueTokens.slice(i, i + BATCH_SIZE);
            const batchNum = Math.floor(i / BATCH_SIZE) + 1;
            const totalBatches = Math.ceil(uniqueTokens.length / BATCH_SIZE);

            console.log(`[notifyMultipleUsers] Sending batch ${batchNum}/${totalBatches} with ${tokenBatch.length} tokens.`);

            // Call the multicast function (defined in this same file)
            const batchResponse = await sendMulticastNotification(tokenBatch, title, body, data);

            if (batchResponse) {
                 console.log(`[notifyMultipleUsers] Batch ${batchNum} Result: Success=${batchResponse.successCount}, Failure=${batchResponse.failureCount}`);
                 totalSuccess += batchResponse.successCount;
                 totalFailure += batchResponse.failureCount;
                 // Error details and token cleanup logic should be inside sendMulticastNotification
            } else {
                 console.error(`[notifyMultipleUsers] Batch ${batchNum} failed to send (sendMulticastNotification returned null). Assuming all ${tokenBatch.length} failed.`);
                 totalFailure += tokenBatch.length;
            }
        }

        console.log(`[notifyMultipleUsers] Overall Result: Total Success=${totalSuccess}, Total Failure=${totalFailure}`);
        return { success: totalSuccess, failure: totalFailure }; // Return summary

    } catch (error) {
        console.error("[notifyMultipleUsers] Error during the process:", error);
        // Re-throw or handle appropriately depending on how you want calling functions (like your API route) to react
        throw error;
    }
}

export { sendSingleNotification, sendMulticastNotification, notifyMultipleUsers, notifyAllUsersWithTokens };



// one user one-fcmToken logic 
// <<<< >>>>>>

// async function notifyAllUsersWithTokens(title, body, data = {}) {
//   let totalSuccess = 0;
//   let totalFailure = 0;
//   let totalTokensAttempted = 0;

//   try {
//       const usersWithTokens = await User.find({
//           'fcmToken': { $exists: true, $ne: null, $ne: "" }
//       }).select('fcmToken').lean();

//       if (!usersWithTokens || usersWithTokens.length === 0) {
//           return { success: 0, failure: 0, totalTokensAttempted: 0 };
//       }


//       // 2. Extract, flatten (if tokens are arrays), and deduplicate tokens
//       const allTokens = usersWithTokens.reduce((acc, user) => {
//           if (typeof user.fcmToken === 'string' && user.fcmToken.trim() !== '') {
//               acc.push(user.fcmToken.trim()); // Ensure no leading/trailing whitespace
//           } else if (Array.isArray(user.fcmToken)) {
//               // Filter out empty/null tokens if stored in an array and trim
//               const validTokens = user.fcmToken
//                   .filter(t => typeof t === 'string' && t.trim() !== '')
//                   .map(t => t.trim());
//               acc.push(...validTokens);
//           }
//           return acc;
//       }, []);

//       const uniqueTokens = [...new Set(allTokens)];
//       totalTokensAttempted = uniqueTokens.length;

//       if (totalTokensAttempted === 0) {
//           return { success: 0, failure: 0, totalTokensAttempted: 0 };
//       }

//       // 3. Batch and Send using sendMulticastNotification
//       const BATCH_SIZE = 500; // FCM limit per multicast call

//       for (let i = 0; i < totalTokensAttempted; i += BATCH_SIZE) {
//           const tokenBatch = uniqueTokens.slice(i, i + BATCH_SIZE);
//           const batchNum = Math.floor(i / BATCH_SIZE) + 1;
//           const totalBatches = Math.ceil(totalTokensAttempted / BATCH_SIZE);


//           // Call the multicast function
//           const batchResponse = await sendMulticastNotification(tokenBatch, title, body, data);

//           if (batchResponse) {
//                // Successfully called the function, update counts from response
//                totalSuccess += batchResponse.successCount;
//                totalFailure += batchResponse.failureCount;
//           } else {
//                // The sendMulticastNotification call itself failed (e.g., network error)
//                totalFailure += tokenBatch.length; // Increment failure count by the batch size
//           }
//           // Add a small delay between batches if sending a very large number
//           await new Promise(resolve => setTimeout(resolve, 200)); // 100ms delay
//       }

//       return { success: totalSuccess, failure: totalFailure, totalTokensAttempted: totalTokensAttempted };

//   } catch (error) {
//       console.error("[notifyAllUsersWithTokens] Critical error during the process:", error);
//       return { success: totalSuccess, failure: totalFailure, totalTokensAttempted: totalTokensAttempted, error: true, errorMessage: error.message };
//   }
// }
