import { SQLite } from 'expo';
import _ from 'underscore';
import setupScript from './setupSql';

let db = {};

export default class AppDb {
  constructor() {
    db = SQLite.openDatabase('ruah.db');
  }

  init() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        const setups = setupScript.split(';');
        _.each(setups.slice(0, setups.length - 1), (script) => tx.executeSql(script));
      },
      (err) => reject(err),
      () => resolve());
    });
  }

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
    return new Promise((resolve, reject) => {
      const q = _.reduce(properties, (memo) => `${memo}${(memo === '' ? '' : ', ')}?`, '');
      db.transaction((tx) => {
        tx.executeSql(
        `CREATE TABLE IF NOT EXISTS UserProp (
            PropName TEXT PRIMARY KEY NOT NULL,
            PropValue TEXT NOT NULL
          );`,
          properties,
          (tx1) => {
            tx1.executeSql(
          `SELECT PropName, PropValue FROM UserProp WHERE PropName IN (${q});`,
          properties,
          (t, data) => {
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
      }, (err) => {
        reject(err);
      });
    });
  }


  getConversations() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT
            c.ConversationId,
            c.RecipientId,
            s.Name,
            s.ProfilePicUri
          FROM Conversation c
          INNER JOIN
            Store s
          ON c.RecipientId = s.StoreId;`,
          null,
          (t, data) => {
            const results = [];
            let prevRow = null;
            let i = 0;
            do {
              prevRow = data.rows.item(i);
              if (prevRow) {
                results.push({
                  ConversationId: prevRow.ConversationId,
                  RecipientId: prevRow.RecipientId,
                  Name: prevRow.Name,
                  ProfilePicUri: prevRow.ProfilePicUri,
                });
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

  getMostLatestMessageRecord() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT Epoch FROM Message ORDER BY Epoch DESC LIMIT 1;',
          null,
          (t, data) => {
            const result = data.rows.item(0);
            resolve(result ? result.Epoch : null);
          },
        );
      }, (err) => {
        reject(err);
      });
    });
  }

  setConversations(conversations) {
    return new Promise((resolve, reject) => {
      const rows = _.map(conversations, (c) => [c.ConversationId, c.RecipientId]);
      const ids = _.map(conversations, (c) => c.ConversationId);
      const q = _.reduce(ids, (memo) => `${memo}${(memo === '' ? '' : ', ')}?`, '');
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM Conversation WHERE ConversationId IN (${q});`,
          ids,
          (tx2) => {
            _.each(rows, (row) => {
              tx2.executeSql('INSERT INTO Conversation (ConversationId, RecipientId) VALUES (?, ?);', row, () => console.log('insert succces'), (err) => console.error(err));
            });
            resolve();
          }, (err) => reject(err)
        );
      }, (err) => {
        reject(err);
      });
    });
  }

  insertMessage(message) {
    return new Promise((resolve, reject) => {
      const row = [message.ChannelId, message.Timestamp, message.Author, message.Recipient, message.Content];
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO Message (ConversationId, Epoch, Author, Recipient, Content) VALUES (?, ?, ?, ?, ?);',
          row,
          () => resolve(),
          (err) => reject(err)
        );
      }, (err) => {
        reject(err);
      });
    });
  }

  setStores(stores) {
    return new Promise((resolve, reject) => {
      const rows = _.map(stores, (store) => [store.StoreId, store.Name, store.ProfilePicUri]);
      const ids = _.map(stores, (store) => store.StoreId);
      const q = _.reduce(ids, (memo) => `${memo}${(memo === '' ? '' : ', ')}?`, '');
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM Store WHERE StoreId IN (${q});`,
          ids,
          (tx2) => {
            _.each(rows, (row) => {
              tx2.executeSql('INSERT INTO Store (StoreId, Name, ProfilePicUri) VALUES (?, ?, ?);', row, () => console.log('insert succces'), (err) => console.error(err));
            });
            resolve();
          }, (err) => reject(err)
        );
      }, (err) => {
        reject(err);
      });
    });
  }
}
