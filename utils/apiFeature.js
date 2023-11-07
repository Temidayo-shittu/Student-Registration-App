// Define a class called ApiFeatures
class ApiFeatures {
	// Constructor function that takes in a query and query string
	constructor(query, queryStr) {
		// Set the query and queryStr properties of the instance to the passed in values
		this.query = query;
		this.queryStr = queryStr;
	}

	// Define a search method
	search() {
		// If there is a keyword property in the query string
		const keyword = this.queryStr.keyword
			? {
					// Set the name property of the keyword object to a regex that matches the keyword with case insensitivity
					name: {
						$regex: this.queryStr.keyword,
						$options: "i",
					},
			  }
			: {};

		// Update the query property of the instance to include the keyword object
		this.query = this.query.find({ ...keyword });
		return this;
	}

	// Define a filter method
	filter() {
		// Create a copy of the query string object
		const queryCopy = { ...this.queryStr };
		// Removing some fields for category
		// Define an array of fields to remove from the query string object
		const removeFields = ["keyword", "page", "limit"];

		// Loop through the removeFields array and delete the corresponding property from the queryCopy object
		removeFields.forEach((key) => delete queryCopy[key]);

		// Filter for price and rating
		// Convert the queryCopy object to a string and replace any occurrence of gt, gte, lt, or lte with $gt, $gte, $lt, or $lte respectively
		let queryStr = JSON.stringify(queryCopy);
		queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

		// Update the query property of the instance to include the parsed query string object
		this.query = this.query.find(JSON.parse(queryStr));

		return this;
	}

	// Define a pagination method that takes in a resultPerPage parameter
	pagination(resultPerPage) {
		// Get the current page number from the query string or default to 1
		const currentPage = Number(this.queryStr.page) || 1;
		// Calculate the number of results to skip based on the current page and resultPerPage
		const skip = resultPerPage * (currentPage - 1);

		// If either skip or resultPerPage is not a number, throw an error
		if (isNaN(skip) || isNaN(resultPerPage)) {
			throw new Error("Invalid pagination parameters");
		}

		// Update the query property of the instance to include the skip and limit methods
		this.query = this.query.skip(skip).limit(resultPerPage);

		return this;
	}

	// Define an executeQuery method that returns the query property of the instance
	executeQuery() {
		return this.query;
	}
}

// Export the ApiFeatures class
module.exports = { ApiFeatures };
