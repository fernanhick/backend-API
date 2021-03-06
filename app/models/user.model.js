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
            },
            { timestamps: true }
        )
    )
}
