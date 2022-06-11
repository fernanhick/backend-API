module.exports = (mongoose) => {
  return mongoose.model(
    'Comment',
    mongoose.Schema(
      {
        text: {
          type: String,
          required: true,
          trim: true
        },
        project: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Project'
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      },
      { timestamps: true }
    )
  )
}
