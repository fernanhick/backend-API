//Set to export module and pass the function to handle the model creation
module.exports = (mongoose) => {
    const project = mongoose.model(
        "Project",
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
                    type: Array,
                },
                technologies: {
                    type: Array,
                },
                comments: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Comment",
                    },
                ],
                /*   user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                }, */
            },
            { timestamps: true }
        )
    );
    return project;
};
