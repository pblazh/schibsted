const BASE_URL = process.env.REACT_APP_API_URL || "/api";

export default {
  issues: `${BASE_URL}/issues`,
  issue: `${BASE_URL}/issues/<id>`,
  open: `${BASE_URL}/issues/open`,
  pending: `${BASE_URL}/issues/pending`,
  closed: `${BASE_URL}/issues/closed`,
  append: `${BASE_URL}/issues`,
  setPending: `${BASE_URL}/issues/<id>/pending`,
  setClosed: `${BASE_URL}/issues/<id>/closed`,
  remove: `${BASE_URL}/issues/<id>`,
};
