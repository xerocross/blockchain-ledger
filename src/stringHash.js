import sjcl from "sjcl";

export const hash = function (str) {
    return sjcl.hash.sha256.hash(str).join(" ");
}