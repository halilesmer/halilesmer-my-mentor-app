const nodeEnv = {
  env:
    process.env.NODE_ENV === "production"
      ? "https://server-halilesmer.vercel.app/api"
      : "http://localhost:5001/api",
};

export { nodeEnv };
