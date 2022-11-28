import pkg from 'mongodb';
const { ObjectID } = pkg;

export function createSessionModel(mongoose){
  const Session = mongoose.model(
    "session",
    mongoose.Schema(
      {
        userID: {type: String, required: true, index: true},
        expire_at: {type: Date, default: Date.now, expires: '1440m'},
      }
    ), 'Session'
  );

  return Session;
};
