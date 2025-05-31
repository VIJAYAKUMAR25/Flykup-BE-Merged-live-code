const SCORING_CONFIG = {
  // KYC Verification - Maximum 30 points
  kyc: {
    hasGST: 10,                // Having a GST number is positive
    hasValidPAN: 10,           // Valid PAN format and verification
    hasValidAadhaar: 10,       // Valid Aadhaar format and verification
  },
  
  // Experience and Channel Validation - Maximum 25 points
  experience: {
    sellerExperience: {        // Based on years of experience
      "3+ years": 10,
      "1-3 years": 7,
      "New Seller (<1 year)": 3
    },
    sellingChannelsOnline: 10, // Having established online presence
    sellingChannelsOffline: 5, // Having offline presence
  },
  
  // Product Information - Maximum 20 points
  product: {
    hasProductCatalog: 10,     // Provided product catalog (file or link)
    productCategories: 10,     // Has selected multiple product categories
  },
  
  // Logistics & Fulfillment - Maximum 15 points
  logistics: {
    preferredShipping: {
      "flykup": 10,            // Prefers Flykup logistics
      "self": 5                // Prefers self-shipping
    },
    dispatchTime: {
      "same_day": 5,          // Same day dispatch
      "1-3_days": 3,          // 1-3 days dispatch
      "3-5_days": 1           // 3-5 days dispatch
    },
  },
  
  // Business Information Completeness - Maximum 10 points
  business: {
    hasCompleteAddress: 5,     // Complete address information
    hasBusinessType: 5,        // Business type selection
  },

  // Red Flags - Negative Scoring
  redFlags: {
    hasProhibitedCategories: -20,       // Dealing with prohibited categories
    suspiciousDocumentation: -30,       // Suspicious or inconsistent documentation
    multipleDeclinedApplications: -15,  // Previously declined applications
    incompleteRequiredFields: -20,      // Critical required fields missing
  },
  thresholds: {
    autoApprove: 80,
    autoReject: 40,
  }
};


function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  // Basic validation for Indian phone numbers - you can enhance this as needed
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

function scoreKYC(application) {
  let score = 0;
  let breakdown = {};
  
  // Check GST details
  if (application.gstInfo.hasGST && application.gstInfo.gstNumber && application.gstInfo.gstDocument) {
    score += SCORING_CONFIG.kyc.hasGST;
    breakdown.hasGST = SCORING_CONFIG.kyc.hasGST;
  } else if (!application.gstInfo.hasGST && application.gstInfo.gstDeclaration) {
    // If they don't have GST but provided a declaration, partial points
    score += SCORING_CONFIG.kyc.hasGST / 2;
    breakdown.hasGSTDeclaration = SCORING_CONFIG.kyc.hasGST / 2;
  }
  
  // Check PAN details
  if (application.panInfo.panNumber && application.panInfo.panFront) {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (panRegex.test(application.panInfo.panNumber)) {
      score += SCORING_CONFIG.kyc.hasValidPAN;
      breakdown.hasValidPAN = SCORING_CONFIG.kyc.hasValidPAN;
    } else {
      breakdown.hasInvalidPAN = 0;
    }
  }
  
  // Check Aadhaar details
  if (application.aadhaarInfo.aadhaarNumber && 
      application.aadhaarInfo.aadhaarFront && 
      application.aadhaarInfo.aadhaarBack) {
    const aadhaarRegex = /^\d{12}$/;
    if (aadhaarRegex.test(application.aadhaarInfo.aadhaarNumber)) {
      score += SCORING_CONFIG.kyc.hasValidAadhaar;
      breakdown.hasValidAadhaar = SCORING_CONFIG.kyc.hasValidAadhaar;
    } else {
      breakdown.hasInvalidAadhaar = 0;
    }
  }
  
  return { score, breakdown };
}

function scoreExperience(application) {
  let score = 0;
  let breakdown = {};
  
  // Score based on selling experience
  if (application.sellerExperienceInfo && application.sellerExperienceInfo.experience) {
    const expScore = SCORING_CONFIG.experience.sellerExperience[application.sellerExperienceInfo.experience] || 0;
    score += expScore;
    breakdown.sellerExperience = expScore;
  }
  
  // Score online channels
  if (application.sellerExperienceInfo && 
      application.sellerExperienceInfo.online && 
      application.sellerExperienceInfo.online.length > 0) {
    
    // Calculate proportional score based on number of channels and quality
    const channelCount = application.sellerExperienceInfo.online.length;
    const verifiableChannels = application.sellerExperienceInfo.online.filter(
      channel => channel.profile && channel.profile.trim() !== ""
    ).length;
    
    // Award points proportionally to both channel count and verifiable profiles
    let onlineScore = 0;
    if (channelCount > 0) {
      const basePoints = SCORING_CONFIG.experience.sellingChannelsOnline * 0.4; // 40% for having channels
      const verifiablePoints = SCORING_CONFIG.experience.sellingChannelsOnline * 0.6; // 60% for verification
      
      onlineScore = basePoints * Math.min(1, channelCount / 3); // Max points at 3+ channels
      if (channelCount > 0) {
        onlineScore += verifiablePoints * (verifiableChannels / channelCount);
      }
    }
    
    score += onlineScore;
    breakdown.onlineChannels = Math.round(onlineScore * 10) / 10; // Round to 1 decimal place
  }
  
  // Score offline channels
  if (application.sellerExperienceInfo && 
      application.sellerExperienceInfo.offline && 
      application.sellerExperienceInfo.offline.length > 0) {
    
    const offlineScore = Math.min(
      SCORING_CONFIG.experience.sellingChannelsOffline,
      application.sellerExperienceInfo.offline.length * 2 // 2 points per offline channel
    );
    
    score += offlineScore;
    breakdown.offlineChannels = offlineScore;
  }
  
  return { score, breakdown };
}

function scoreProduct(application) {
  let score = 0;
  let breakdown = {};
  
  // Score product catalog
  if (application.productCatalog) {
    if (application.productCatalog.file) {
      score += SCORING_CONFIG.product.hasProductCatalog;
      breakdown.productCatalogFile = SCORING_CONFIG.product.hasProductCatalog;
    } else if (application.productCatalog.link && isValidUrl(application.productCatalog.link)) {
      score += SCORING_CONFIG.product.hasProductCatalog * 0.7; // Slightly less points for just a link
      breakdown.productCatalogLink = SCORING_CONFIG.product.hasProductCatalog * 0.7;
    }
  }
  
  // Score product categories
  if (application.productCategories && application.productCategories.length > 0) {
    // Award points proportionally to the number of categories (up to 3)
    const categoryScore = Math.min(
      SCORING_CONFIG.product.productCategories,
      (application.productCategories.length / 3) * SCORING_CONFIG.product.productCategories
    );
    
    score += categoryScore;
    breakdown.productCategories = Math.round(categoryScore * 10) / 10;
  }
  
  return { score, breakdown };
}

function scoreLogistics(application) {
  let score = 0;
  let breakdown = {};
  
  // Score shipping preference
  if (application.shippingInfo && application.shippingInfo.preferredShipping) {
    const shippingScore = SCORING_CONFIG.logistics.preferredShipping[application.shippingInfo.preferredShipping] || 0;
    score += shippingScore;
    breakdown.preferredShipping = shippingScore;
    
    // If self-shipping, check if courier partner is provided
    if (application.shippingInfo.preferredShipping === "self" && 
        (!application.shippingInfo.courierPartner || application.shippingInfo.courierPartner.trim() === "")) {
      breakdown.missingCourierPartner = "Courier partner information missing";
    }
  }
  
  // Score dispatch time
  if (application.shippingInfo && application.shippingInfo.dispatchTime) {
    // Handle string format from the UI vs object format from backend
    let dispatchTimeKey = application.shippingInfo.dispatchTime;
    if (dispatchTimeKey === "24 hours") dispatchTimeKey = "same_day";
    
    const dispatchScore = SCORING_CONFIG.logistics.dispatchTime[dispatchTimeKey] || 0;
    score += dispatchScore;
    breakdown.dispatchTime = dispatchScore;
  }
  
  return { score, breakdown };
}


function scoreBusiness(application) {
  let score = 0;
  let breakdown = {};
  
  // Check for complete address
  if (application.address) {
    const addressFields = [
      'addressLine1', 'city', 'state', 'pincode'
    ];
    
    const hasCompleteAddress = addressFields.every(field => 
      application.address[field] && application.address[field].trim() !== ""
    );
    
    if (hasCompleteAddress) {
      score += SCORING_CONFIG.business.hasCompleteAddress;
      breakdown.hasCompleteAddress = SCORING_CONFIG.business.hasCompleteAddress;
    }
  }
  
  // Check for business type
  if (application.businessType && application.businessType.trim() !== "") {
    score += SCORING_CONFIG.business.hasBusinessType;
    breakdown.hasBusinessType = SCORING_CONFIG.business.hasBusinessType;
  }
  
  return { score, breakdown };
}

function checkRedFlags(application, previousApplications) {
  let score = 0;
  let redFlags = [];
  let requiredManualChecks = [];
  
  // Check for prohibited categories
  const prohibitedCategories = ["Tobacco", "Alcohol", "Weapons", "Drugs", "Adult Content"];
  if (application.productCategories) {
    const hasProhibited = application.productCategories.some(category => 
      prohibitedCategories.some(prohibited => 
        category.toLowerCase().includes(prohibited.toLowerCase())
      )
    );
    
    if (hasProhibited) {
      score += SCORING_CONFIG.redFlags.hasProhibitedCategories;
      redFlags.push({
        type: "prohibited_category",
        description: "Application includes prohibited product categories",
        severity: "high"
      });
    }
  }
  
  // Check for multiple declined applications
  if (previousApplications && previousApplications.length > 0) {
    const declinedCount = previousApplications.filter(app => 
      app.status === "rejected" || app.status === "auto_rejected"
    ).length;
    
    if (declinedCount >= 2) {
      score += SCORING_CONFIG.redFlags.multipleDeclinedApplications;
      redFlags.push({
        type: "multiple_rejections",
        description: `Application has been rejected ${declinedCount} times previously`,
        severity: "medium"
      });
      requiredManualChecks.push("Review previous rejection reasons");
    }
  }
  
  // Check for inconsistent KYC information
  if (application.panInfo && application.aadhaarInfo) {
    // check manually until implementing cashfree
    requiredManualChecks.push("Verify consistency between PAN and Aadhaar details");
  }
  
  // Check for missing critical information
  const criticallyMissingFields = [];
  
  // Critical personal info
  if (!application.companyName || application.companyName.trim() === "") 
    criticallyMissingFields.push("Name/Business Name");
  
  if (!application.email || !isValidEmail(application.email)) 
    criticallyMissingFields.push("Valid Email");
  
  if (!application.mobileNumber || !isValidPhone(application.mobileNumber)) 
    criticallyMissingFields.push("Valid Mobile Number");
  
  if (application.sellerType === "social" && !application.isAdult)
    criticallyMissingFields.push("Age Confirmation");
  
  // If critical fields are missing, add a red flag
  if (criticallyMissingFields.length > 0) {
    score += SCORING_CONFIG.redFlags.incompleteRequiredFields;
    redFlags.push({
      type: "incomplete_critical_info",
      description: `Missing critical information: ${criticallyMissingFields.join(", ")}`,
      severity: "high"
    });
  }
  
  return { score, redFlags, requiredManualChecks };
}

function generateRejectionReason(redFlags, totalScore) {
  if (redFlags.length > 0) {
    // Get the most severe red flag
    const sortedFlags = [...redFlags].sort((a, b) => {
      const severityMap = { high: 3, medium: 2, low: 1 };
      return severityMap[b.severity] - severityMap[a.severity];
    });
    
    const primaryFlag = sortedFlags[0];
    
    // Generate rejection reason based on the primary flag
    switch (primaryFlag.type) {
      case "prohibited_category":
        return "Your application lists product categories that are not permitted on our platform.";
      
      case "multiple_rejections":
        return "Your application has been declined due to multiple previous rejections. Please contact support for assistance.";
      
      case "incomplete_critical_info":
        return `Your application is missing required information: ${primaryFlag.description.replace("Missing critical information: ", "")}.`;
      
      default:
        return "Your application doesn't meet our current criteria for approval.";
    }
  } else if (totalScore <= 40) {
    return "Your application doesn't have sufficient information or credentials to meet our approval criteria. Consider adding more details about your business and experience.";
  }
  
  return "Your application does not meet our approval criteria at this time.";
}

export const calculateSellerScore = (application, previousApplications = []) => {
  let totalScore = 0;
  const breakdown        = {};
  let redFlags           = [];
  let manualChecks       = [];

  // 1. KYC
  const kycResult = scoreKYC(application);
  totalScore    += kycResult.score;
  Object.assign(breakdown, { kyc: kycResult.breakdown });

  // 2. Experience
  const expResult = scoreExperience(application);
  totalScore    += expResult.score;
  Object.assign(breakdown, { experience: expResult.breakdown });

  // 3. Product
  const prodResult = scoreProduct(application);
  totalScore     += prodResult.score;
  Object.assign(breakdown, { product: prodResult.breakdown });

  // 4. Logistics
  const logResult = scoreLogistics(application);
  totalScore    += logResult.score;
  Object.assign(breakdown, { logistics: logResult.breakdown });

  // 5. Business
  const busResult = scoreBusiness(application);
  totalScore    += busResult.score;
  Object.assign(breakdown, { business: busResult.breakdown });

  // 6. Red flags
  const rfResult = checkRedFlags(application, previousApplications);
  totalScore += rfResult.score;
  redFlags     = rfResult.redFlags;
  manualChecks = rfResult.requiredManualChecks;

  // 7. Final recommendation & reason
  let recommendation  = 'manual_review';
  let rejectionReason = null;

  if (totalScore >= SCORING_CONFIG.thresholds.autoApprove && redFlags.length === 0) {
    recommendation = 'auto_approved';
  } else if (totalScore <= SCORING_CONFIG.thresholds.autoReject || redFlags.length > 0) {
    recommendation  = 'auto_rejected';
    rejectionReason = generateRejectionReason(redFlags, totalScore);
  }

  return {
    totalScore,
    breakdown,
    redFlags,
    manualChecks,
    recommendation,
    rejectionReason
  };
};
