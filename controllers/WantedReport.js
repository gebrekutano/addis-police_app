const Post = require("../models/post");
const Motorcycle = require("../models/Motorcycle");

exports.getCounts = async (req, res) => {
  const { filter } = req.params;
  let countQuery;
  let lostCount;
  let foundCount;
  let totalCount;
  let notFoundCount;

  switch (filter) {
    case "daily":
      countQuery = {
        $gte: new Date(new Date().setHours(00, 00, 00)),
        $lt: new Date(new Date().setHours(23, 59, 59)),
      };
      break;
    case "monthly":
      countQuery = {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      };
      break;
    case "yearly":
      countQuery = {
        $gte: new Date(new Date().getFullYear(), 0, 1),
        $lt: new Date(new Date().getFullYear(), 11, 31),
      };
      break;
    case "all":
      try {
        lostCount = await Post.countDocuments({});
        foundCount = await Post.countDocuments({
          isLost: false,
        });
        notFoundCount = await Post.countDocuments({
          isLost: true,
        });
        totalCount = await Motorcycle.countDocuments({});
        return res.json({ lostCount, foundCount, totalCount, notFoundCount });
      } catch (err) {
        console.log("Error: ", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    default:
      countQuery = null;
  }

  try {
    lostCount = await Post.countDocuments({
      reportedDate: countQuery || undefined || 0,
    });
    foundCount = await Post.countDocuments({
      isLost: false,
      foundDate: countQuery || undefined || 0,
    });
    notFoundCount = await Post.countDocuments({
      isLost: true,
      reportedDate: countQuery || undefined || 0,
    });
    totalCount = await Motorcycle.countDocuments({
      createdAt: countQuery || undefined || 0,
    });

    return res.json({ lostCount, foundCount, totalCount, notFoundCount });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
