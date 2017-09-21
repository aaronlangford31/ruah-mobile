const sql = `CREATE TABLE IF NOT EXISTS UserProp (
  PropName TEXT PRIMARY KEY NOT NULL,
  PropValue TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Conversation (
  ConversationId TEXT PRIMARY KEY NOT NULL,
  RecipientId TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Message (
  ConversationId TEXT NOT NULL,
  Epoch INTEGER NOT NULL,
  Author TEXT NOT NULL,
  Recipient TEXT NOT NULL,
  Content TEXT NOT NULL,
  AttachmentsJSON TEXT,
  PRIMARY KEY (ConversationId, Epoch)
);

CREATE TABLE IF NOT EXISTS Store (
  StoreId TEXT PRIMARY KEY NOT NULL,
  Name TEXT NOT NULL,
  ProfilePicUri TEXT NOT NULL
);`;

export default sql;
