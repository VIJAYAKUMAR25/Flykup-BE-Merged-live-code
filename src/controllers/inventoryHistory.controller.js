import InventoryHistory from "../models/inventoryHistory.js";

export const getHistoryByInventoryId = async (req, res) => {
    const { inventoryId } = req.params;
    try {
        const history = await InventoryHistory.findOne({ inventoryInfo: inventoryId }).populate('inventoryInfo');

        if(!history){
            return res.status(200).json({
                status: true,
                message: "No history found",
                data: {}
            })
        }

        // converting it to plain object
        const modifiedHistory = history.toObject();

        modifiedHistory.availableQuantity = modifiedHistory.inventoryInfo.totalQuantity;

        delete modifiedHistory.inventoryInfo;

        return res.status(200).json({
            status: true,
            message:"Inventory history fetched successfully!",
            data: modifiedHistory
        });
    } catch (error) {
        console.error("Error in getHistoryByInventoryId:", error.message);
        return res.status(500).json({ status: false, message: "Internal server error. Please try again later." });
    }
}


export const getAllInventoriesHistory  = async ( req, res ) => {
    try {
        const histories = await InventoryHistory.find().sort({createdAt: -1}).populate('inventoryInfo');
        
        const modifiedHistories = histories.map( history => {
            // converting it to plain object
            const modified = history.toObject();
            modified.availableQuantity = modified.inventoryInfo.totalQuantity;
            delete modified.inventoryInfo;
            return modified;
        });

        return res.status(200).json({
            status: true,
            message: modifiedHistories.length > 0
            ? "Inventory history fetched successfully!"
            : "No history found.",
            data: modifiedHistories
        })
    } catch (error) {
        console.error("Error in getAllInventoriesHistory:", error.message);
        return res.status(500).json({
            status: false ,
            message: "Internal server Error. Please try again later."
        })
    }
}