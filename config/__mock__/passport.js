jest.mock("passport", () => ({
  initialize: jest.fn(() => (req, res, next) => next()),
  session: jest.fn(() => (req, res, next) => next()),
  authenticate: jest.fn(() => (req, res, next) => {
    req.user = { id: "mockUserId" }; // Mock user
    next();
  }),
}));
