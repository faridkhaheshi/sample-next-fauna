import { UnauthorizedError } from "restify-errors";
import { setUpDatabase } from "../../../../services/database/processors";
import { withErrorHandling } from "../../../../services/errors/middlewares";

const handleReqs = async (req, res) => {
  const {
    query: { secret },
  } = req;
  if (secret !== process.env.FAUNA_ADMIN_SECRET)
    throw new UnauthorizedError("You must know what you are doing!");
  const bootstrapSecret = await setUpDatabase(secret);
  res.statusCode = 200;
  res.json({ done: true, bootstrapSecret });
};

export default withErrorHandling(handleReqs);
