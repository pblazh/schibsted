import { makeAction } from "../utils";

export default (mountPoint) => ({
    fetch: makeAction(`schibsted.issues.${mountPoint}.fetch`),
    pending: makeAction(`schibsted.issues.${mountPoint}.pending`),
    set: makeAction(`schibsted.issues.${mountPoint}.set`),
});
