/**
 * util function to get fullname
 * @param {*} user
 * @returns fullName
 */
function getFullName(user) {
    return `${user.firstName} ${user.lastName}`;
}

module.exports = {
    getFullName,
};
