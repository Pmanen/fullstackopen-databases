const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')
const Session = require('./session')

User.hasMany(Blog, { as: 'blogs' })
Blog.belongsTo(User)
User.hasMany(Session, { as: 'sessions' })
Session.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'saved_by' })
User.hasMany(ReadingList, { as: 'reading_list' })
ReadingList.belongsTo(User)
Blog.hasMany(ReadingList, { as: 'reading_list' })
ReadingList.belongsTo(Blog)


module.exports = {
  Blog,
  User,
  ReadingList,
  Session
}
