const api = {
  protocol: 'http',
  // address: '41.231.253.195:8080',
  address: 'atfp-be.loc',
  port: 7080,
  root: '',
  host: 'http://atfp-be.loc',
};
const socket = {
  protocol: 'ws',
  address: '41.231.253.195:8100',
  channel: 'atfp/candidature/'
};

// @ts-ignore
export const environment = {
  production: true,
  registrationActive: false,
  //baseUrl: api.protocol + '://' + api.address + api.root,
  baseUrl: api.protocol + ':// ' + '41.231.253.195:8080' ,
  baseSocket: socket.protocol + '://' + socket.address + '/atfp?Bearer=',
  channel: socket.channel,
  isMockEnabled: false// You have to switch this, when your real back-end is done
};
// export const environment = {
//   production: false,
//   host:'http://atfp-be.loc',
//   api:'api',
//
// };
