import BlockedRegion from '../models/blockedRegion.models.js';

// Create new block entry
export const createBlockedRegion = async (req, res) => {
  try {
    const { region, country, regionName, countryName } = req.body;

    const blocked = new BlockedRegion({ region, country, regionName, countryName });
    await blocked.save();

    res.status(201).json({ message: "Blocked region/country added", data: blocked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Bulk create block entries
export const bulkCreateBlockedRegions = async (req, res) => {
    try {
      const blockedList = req.body; // expecting an array of objects [{region, country}, {country}, ...]
  
      if (!Array.isArray(blockedList)) {
        return res.status(400).json({ message: "Request body must be an array." });
      }
  
      const blocked = await BlockedRegion.insertMany(blockedList);
  
      res.status(201).json({ message: "Blocked regions/countries added in bulk", data: blocked });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Get all blocked entries
export const getBlockedRegions = async (req, res) => {
  try {
    const blocked = await BlockedRegion.find();
    res.status(200).json({ data: blocked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a blocked entry
export const deleteBlockedRegion = async (req, res) => {
  try {
    const { id } = req.params;
    await BlockedRegion.findByIdAndDelete(id);
    res.status(200).json({ message: "Blocked region/country removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
