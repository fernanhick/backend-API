module.exports = (mongoose) => {
    return mongoose.model(
        'User',
        new mongoose.Schema(
            {
                username: {
                    type: String,
                    required: true,
                    trim: true,
                },
                email: {
                    type: String,
                    trim: true,
                    unique: true,
                    lowercase: true,
                },
                password: {
                    type: String,
                    required: true,
                },

                roles: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Role',
                    },
                ],

                projects: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Project',
                    },
                ],
                comments: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Comment',
                    },
                ],
                description: {
                    type: String,
                    trim: true,
                },
                skills: {
                    type: String,
                },
                languages: {
                    type: String,
                },
                website: {
                    type: String,
                },
                technologies: {
                    type: String,
                },
                friends: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User',
                        date: 'created_at',
                    },
                ],
                friendRequest: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'FriendRequest',
                        date: 'created_at',
                    },
                ],
            },
            { timestamps: true }
        )
    )
}
