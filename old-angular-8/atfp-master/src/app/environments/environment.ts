// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const socket = {
  protocol: 'ws',
  address: 'atfp-notif.loc',
  channel: 'atfp/candidature/'
};

const api = {
  protocol: 'http',
  address: 'atfp-be.loc',
  port: 7080,
  root: '',
};

export const environment = {
  production: true,
  host: 'http:www.inscription.atfp.tn',
  api: 'api',

  registrationActive: false,
  //baseUrl: api.protocol + '://' + api.address + api.root,
  baseUrl: api.protocol + ':// ' + '41.231.253.195:8080',
  baseSocket: socket.protocol + '://' + socket.address + '/atfp?Bearer=',
  channel: socket.channel,
  isMockEnabled: false// You have to switch this, when your real back-end is done

};



