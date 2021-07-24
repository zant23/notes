export default () => ({
    port: parseInt(process.env.PORT, 10) || 8080,
    mongodb_uri: process.env.MONGODB_URI || '<mongodb url>'
});