export default (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    return res
      .status(error.statusCode || error.status || 500)
      .json({
        error: error.body || { code: "unknown", message: error.message },
      });
  }
};
