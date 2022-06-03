module.exports = (mongoose) => {
    const user = mongoose.model(
        "User",
        mongoose.Schema({
            username: {
                type: String,
                required: true,
                required: true,
                trim: true,
            },
            email: {
                type: String,
                trim: true,
            },
            projects: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Project",
                },
            ],
            comments: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Comment",
                },
            ],
        })
    );
    return user;
};
