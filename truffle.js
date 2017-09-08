module.exports = {
  networks: {
    live: {
      network_id: 553289,
      host: "http://ethnetj7t.southcentralus.cloudapp.azure.com",
      port: 8545
    },
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
