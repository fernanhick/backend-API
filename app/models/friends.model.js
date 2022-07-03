module.exports = (mongoose) => {
    return mongoose.model(
        'FriendRequest',
        new mongoose.Schema(
            {
                requester: {
                    type: String,
                    required: true,
                    trim: false,
                },
                receiver: {
                    type: String,
                    required: true,
                    trim: false,
                },
                status: {
                    type: String,
                    enum: ['requested', 'accepted', 'rejected'],
                    required: true,
                },
            },
            { timestamps: true }
        )
    )
}