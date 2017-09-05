import { SQLite } from 'expo';
import _ from 'underscore';
import setupScript from './setup.sql';

const db = SQLite.openDatabase('ruah.db');
db.transaction((tx) => tx.executeSql(setupScript), (err) => console.log(err));

export default class AppDb {
  setUserProps(user) {
    return new Promise((resolve, reject) => {
      const rows = _.map(user, (val, key) => [key, val]);
      const props = _.map(user, (val, key) => key);
      const q = _.reduce(props, (memo) => `${memo}${(memo === '' ? '' : ', ')}?`, '');
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM UserProp WHERE PropName IN (${q});`,
          props,
          (tx2) => {
            _.each(rows, (row) => {
              tx2.executeSql('INSERT INTO UserProp (PropName, PropValue) VALUES (?, ?);', row, () => console.log('insert succces'), (err) => console.log(err));
            });
            resolve();
          }, (err) => reject(err)
        );
      }, (err) => {
        reject(err);
      });
    });
  }

  getUserProps(properties) {
    const q = _.reduce(properties, (memo) => `${memo}${(memo === '' ? '' : ', ')}?`, '');
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT PropName, PropValue FROM UserProp WHERE PropName IN (${q});`,
          properties,
          (t, data) => {
            console.log(data.rows);
            const results = {};
            let prevRow = null;
            let i = 0;
            do {
              prevRow = data.rows.item(i);
              if (prevRow) {
                results[prevRow.PropName] = prevRow.PropValue;
              }
              i += 1;
            } while (prevRow);
            resolve(results);
          },
        );
      }, (err) => {
        reject(err);
      });
    });
  }
}
