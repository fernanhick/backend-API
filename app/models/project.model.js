// Set to export module and pass the function to handle the model creation
module.exports = (mongoose) => {
    return mongoose.model(
        'Project',
        mongoose.Schema(
            {
                title: {
                    type: String,
                    required: true,
                    trim: true,
                },
                description: {
                    type: String,
                    required: true,
                    trim: true,
                },
                members: {
                    type: String,
                },
                technologies: {
                    type: String,
                },
                comments: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Comment',
                    },
                ],
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                likes: {
                    type: Array,
                },
            },
            { timestamps: true }
        )
    )
}
