const sequelize = require('../config/connection');
const { User, Blog, Post } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const blogs = await Blog.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogs) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const post = postData[Math.floor(Math.random() * postData.length)];

    await blog.createPost({
      ...post,
      user_id: randomUser.id,
    });
  }
  
  process.exit(0);
};

seedDatabase();