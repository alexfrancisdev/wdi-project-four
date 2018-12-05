const port = process.env.port || 4000;
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost/wdi-project-four';
const secret = process.env.SECRET || 'hush';

module.exports = {
  port, dbUri, secret
};
