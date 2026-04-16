module.exports = (db) =>
  db.model(
    'GachaLogs',
    db.Schema(
      {
        userId: {
          type: String,
          index: true,
        },
        userName: {
          type: String,
        },
        prizeId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Prizes',
          default: null,
        },
        reward: {
          type: String,
          default: 'Zonk',
        },
      },
      {
        timestamps: true,
      }
    )
  );
