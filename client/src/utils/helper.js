export const getCookie = (name) => {
  return ('; '+document.cookie).split(`; ${name}=`).pop().split(';')[0];
}