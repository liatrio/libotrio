// Feature toggle config. Used to enable/disable individual features.
//
// Features are installed in the order they are listed here
// (consider how this affects command-matching precedence)

module.exports = {
  'about': true,
  'aws-billing': !!process.env.AWS_ACCESS_KEY_ID,
  'beerjar': true,
  'birthdays': true,
  'bug': true,
  'echo': true,
  'greet': true,
  'jira': !!process.env.ATLASSIAN_USER,
  'joke': true,
  'promote': !!process.env.JENKINS_USER,
  'saveit': !!process.env.ATLASSIAN_USER,
  'shutdown': true,
  'user': true,
  'whoami': true,
  'closeTicket': true,
  'yt-search': false, //!!process.env.GOOGLE_API_KEY,
  'remind': true,
  'takeTicket': true,
  'aws-list-instances': !!process.env.AWS_ACCESS_KEY_ID,
  'help': true,
};
