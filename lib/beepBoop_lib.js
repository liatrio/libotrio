var i = 1;

const respond = () => {
    return `BOOP #${i++} since last restart`;
}

module.exports = { respond };
