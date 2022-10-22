const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const ListSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "List Name field is required!"],
			minlength: [2, "Name length must be at least 2 characters!"],
		},
		authorizedUsers: {
			type: Array,
			default: [],
		},
		category: {
			type: String,
			default: "",
		},
		items: {
			type: Array,
			default: [],
		},
		completed: {
			type: Boolean,
			default: false,
		}
	},
	{ timestamps: true },
);
const List = mongoose.model("List", ListSchema);
module.exports = List;




