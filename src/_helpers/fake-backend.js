import ApiUrls from '../_helpers/api-urls';

const users = JSON.parse(localStorage.getItem('users')) || [];
const players = JSON.parse(localStorage.getItem('players')) || [];
const apps = JSON.parse(localStorage.getItem('apps')) || [];

function configureFakeBackend() {
  function windowFetch(url, opts) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // login
        if (url.endsWith(ApiUrls.Login) && opts.method === 'POST') {
          const params = JSON.parse(opts.body);

          const filteredUsers = users.filter(user =>
            user.email === params.email && user.password === params.password);

          const appAdmin = [];


          if (filteredUsers.length) {
            const user = filteredUsers[0];
            appAdmin.push(...apps.filter(app => app.adminid === user.id));

            const responseJson = {
              id: user.id,
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              token: 'fake-jwt-token',
              admin: appAdmin,
            };
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
          } else {
            reject(new Error('Username or password is incorrect'));
          }

          return;
        }


        // register user
        if (url.endsWith(ApiUrls.User) && opts.method === 'POST') {
          const newUser = JSON.parse(opts.body);

          const duplicateUser = users.filter(user => user.email === newUser.email).length;
          if (duplicateUser) {
            reject(new Error(`Username "${newUser.email}" is already taken`));
            return;
          }

          // save new user
          newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));

          const responseJson = {
            id: newUser.id,
            email: newUser.email,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            token: 'fake-jwt-token',
          };
          resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });

          return;
        }


        // create app
        if (url.endsWith(ApiUrls.CreateApp) && opts.method === 'POST') {
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            const newApp = JSON.parse(opts.body);

            newApp.id = apps.length ? Math.max(...apps.map(app => app.id)) + 1 : 1;

            apps.push(newApp);
            
            localStorage.setItem('apps', JSON.stringify(apps));

            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(newApp)) });
          } else {
            reject(new Error('Unauthorized'));
          }
        }



        // get app
        if (url.match(/\/getapp\/\d+$/) && opts.method === 'GET') {
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            const urlParts = url.split('/');
            const id = parseInt(urlParts[urlParts.length - 1], 10);

            const theApp = apps.filter(app => app.id === id)[0];

            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(theApp)) });
          } else {
            reject(new Error('Unauthorized'));
          }
        }

        // get app by name
        if (url.split('/')[url.split('/').length-2] === 'getappbyname' && opts.method === 'GET') {
          // if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {

            const idname = url.split('/')[url.split('/').length-1];
            const theApp = apps.filter(app => app.idname === idname)[0];

            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(theApp)) });
          // } else {
          //   reject(new Error('Unauthorized'));
          // }
        }





        // get apps
        if (url.endsWith(ApiUrls.GetApps) && opts.method === 'GET') {
          // if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {



            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(apps)) });
          // } else {
          //   reject(new Error('Unauthorized'));
          // }

          return;
        }







        // create player
        if (url.endsWith(ApiUrls.Players) && opts.method === 'POST') {
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            const newPlayer = JSON.parse(opts.body);

            newPlayer.id = players.length ? Math.max(...players.map(player => player.id)) + 1 : 1;
            players.push(newPlayer);
            localStorage.setItem('players', JSON.stringify(players));

            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(newPlayer)) });
          } else {
            reject(new Error('Unauthorized'));
          }
        }


        // get players
        if (url.endsWith(ApiUrls.Players) && opts.method === 'GET') {
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            const mockPlayers = {
              success: true,
              players,
            };
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(mockPlayers)) });
          } else {
            reject(new Error('Unauthorized'));
          }

          return;
        }

        // delete player
        if (url.match(/\/players\/\d+$/) && opts.method === 'DELETE') {
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            const urlParts = url.split('/');
            const id = parseInt(urlParts[urlParts.length - 1], 10);
            for (let i = 0; i < players.length; i += 1) {
              const player = players[i];
              if (player.id === id) {
                players.splice(i, 1);
                localStorage.setItem('players', JSON.stringify(players));
                break;
              }
            }
            resolve({ ok: true, text: () => Promise.resolve() });
          } else {
            reject(new Error('Unauthorized'));
          }
        }
      }, 500);
    });
  }
  window.fetch = windowFetch;
}


export default configureFakeBackend;
