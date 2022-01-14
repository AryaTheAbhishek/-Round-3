const faker = require("faker");
const connection = require("./src/helpers/db.helper");
const User = require("./src/schema/user.schema");
const Post = require("./src/schema/post.schema");

connection
  .then(async () => {
    console.log("Connected to database...");
    console.log("Seeder started...");

    await Promise.all(
      Array.from(Array(100).keys()).map(async () => {
        const resp = await User.create({
          name: faker.name.firstName(),
        });
        console.log(resp);
        console.log("Created user's name: ", resp.name);

        await Promise.all(
          Array.from(Array(2).keys()).map(async () => {
            await Post.create({
              userId: resp._id,
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph(10),
            });
          })
        );
      })
    );

    console.log("Seeder completed... Exiting...");
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
  });
