module.exports = {
  apps: [
    {
      name: "Bluesheep_web",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
