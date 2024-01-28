const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    CLIENT_URL,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    EXPRESS_SESSION_KEY,
} = process.env;


assert(PORT, "PORT is required");
assert(HOST, "HOST is required");
assert(HOST_URL, "HOST_URL is required");
assert(CLIENT_URL, "CLIENT_URL is required");
assert(ACCESS_TOKEN_SECRET, "ACCESS_TOKEN_SECRET is required");
assert(REFRESH_TOKEN_SECRET, "REFRESH_TOKEN_SECRET is required");
assert(EXPRESS_SESSION_KEY, "EXPRESS_SESSION_KEY is required");

module.exports = {
    port: PORT,
    host: HOST,
    host_url: HOST_URL,
    client_url: CLIENT_URL,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    EXPRESS_SESSION_KEY,
};
