const faker = require("faker");
const POSTS_COUNT = 200;
const USERS_COUNT = 100;

const posts = [];
const users = [];

let uuid = 0;
function makeUuid() {
  return ++uuid;
}

function createFakePost() {
  // set title
  return {
    id: makeUuid(),
    title: faker.lorem.sentence(),
    text: faker.lorem.paragraph(),
    image: faker.image.image(),
    likes: faker.datatype.number(100),
    tags: new Array(faker.datatype.number(8))
      .fill("")
      .map(() => faker.lorem.word()),
    publishDate: faker.date.recent(null, new Date()),
    userId: users[faker.datatype.number(USERS_COUNT - 1)].id,
  };
}

function createFakeUser() {
  return {
    id: makeUuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  };
}

module.exports = () => {
  for (let i = 0; i < USERS_COUNT; i++) {
    users.push(createFakeUser());
  }

  for (let i = 0; i < POSTS_COUNT; i++) {
    posts.push(createFakePost());
  }

  return {
    posts,
    users,
  };
};
