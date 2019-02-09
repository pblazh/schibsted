import { makeAction } from "../utils";

export default (mountPoint) => ({
    fetch: makeAction(`schibsted.issues.${mountPoint}.fetch`),
    pending: makeAction(`schibsted.issues.${mountPoint}.pending`),
    closed: makeAction(`schibsted.issues.${mountPoint}.closed`),
    remove: makeAction(`schibsted.issues.${mountPoint}.remove`),
    append: makeAction(`schibsted.issues.${mountPoint}.append`),
    set: makeAction(`schibsted.issues.${mountPoint}.set`),
});
