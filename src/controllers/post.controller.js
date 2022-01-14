const ObjectId = require("mongodb").ObjectId;
const Post = require("../schema/post.schema");
module.exports.createPost = async (req, res) => {
  try {
    const { userId, title, description } = req.body;

    // TODO: 1. Validate userId, title, description
    /**
     * Validation criteria:
     * 1. userId must be a valid ObjectId
     * 2. title must be a string and minimum of 10 characters excluding spaces
     * 3. description must be a string and minimum of 50 characters excluding spaces
     */
    // TODO: 2. Create post and return in the response

    if (!ObjectId.isValid(userId)) {
      return res.status(400).send("userId must be a valid ObjectId");
    }
    if (typeof title !== "string" || title.replace(/\s/g, "").length <= 10) {
      return res
        .status(400)
        .send(
          "title must be a string and minimum of 10 characters excluding spaces"
        );
    }
    if (
      typeof description !== "string" ||
      description.replace(/\s/g, "").length <= 50
    ) {
      return res
        .status(400)
        .send(
          "description must be a string and minimum of 50 characters excluding spaces"
        );
    }

    const post_data = new Post({
      userId,
      title,
      description,
    });

    await post_data.save();

    res.send(post_data);
  } catch (error) {
    res.send({ error: error.message });
  }
};
