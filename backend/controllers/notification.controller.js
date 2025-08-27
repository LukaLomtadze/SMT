import Notification from "../models/notifications.model.js"


export const getNotification = async(req, res) => {
    try {
        
        const notifications = await Notification.find({user: req.userId})
        .populate("sender", "name image isAdmin hasBadge")
        .populate("post", "content images")
        .sort({createdAt: -1})

        res.status(200).json({sucess: true, data: notifications})
    } catch (error) {
        res.status(500).json({sucess: false, error: error})
    }
}

export const markAllAsRead = async (req, res) => {
    try {
      await Notification.updateMany(
        { user: req.userId, isRead: false },
        { $set: { isRead: true } }
      );
  
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
};