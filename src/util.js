export function getRedirectPath({ type, avatar }) {
  //  user.type
  //  user.avator
  console.log(avatar)
  let url = type === "boss" ? "/boss" : "/genius";
  if (!avatar) {
    url += "info";
  }
  return url;
}
