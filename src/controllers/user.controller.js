const User = require("../schema/user.schema");
const Post = require("../schema/post.schema");
// const { asyncForEach } = require("../helpers/async.helper");

module.exports.getUsersWithPostCount = async (req, res) => {
  try {
    //added pagination
    const result_per_page = 10;
    let page = req.params.page >= 1 ? req.params.page : 1;
    page = page - 1;

    //limit the number of users
    const users = await User.find({})
      .lean()
      .limit(result_per_page)
      .skip(result_per_page * page);

    const user_ids = [];
    const user_index = {};

    users.forEach((element, index) => {
      user_ids.push(element._id);
      user_index[element._id] = index;
      users[index].posts = [];
    });

    //made single request instead of making database query inside loop
    const user_posts = await Post.find({ userId: user_ids });
    user_posts.forEach((element) => {
      index = user_index[element.userId];
      users[index].posts.push(element);
    });

    // await asyncForEach(users, async (user, i) => {
    //   const posts = await Post.find({ userId: user._id });
    //   users[i].posts = posts;
    // });

    res.send({ users });
  } catch (error) {
    res.send({ error: error.message });
  }
};
