module.exports = (mongoose) => {
    const comment = mongoose.model(
        "Comment",
        mongoose.Schema(
            {
                text: {
                    type: String,
                    required: true,
                    trim: true,
                },
                project: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Project",
                },
            },
            { timestamps: true }
        )
    );
    return comment;
};
