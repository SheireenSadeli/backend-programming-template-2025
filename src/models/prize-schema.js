module.exports = (db) =>
  db.model(
    'Prizes',
    db.Schema(
      {
        name: String,
        quota: Number,
        claimed: {
          type: Number,
          default: 0,
        },
      },
      {
        timestamps: true,
      }
    )
  );
