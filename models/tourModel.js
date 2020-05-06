const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

// validation
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
      maxLength: [40, "A tour name must have less or equal 40 characters"],
      minLength: [10, "A tour name must have at least 10 characters"],
      validate: validator.isAlpha,
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "difficulty is either easy or medium or difficult",
      },
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "rating must be above 1"],
      max: [5, "rating must be below 5"],
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    priceDiscount: {
      type: Number,

      // custom validation
      validate: {
        validator: function(value) {
          // this only points to the same document
          return value < this.price; // if val > this.price there will be an error
        },
        message: "discount price {{VALUE}} must be below regular price",
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have a description"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// creating weeks
tourSchema.virtual("durationWeeks").get(function() {
  return this.duration / 7;
});

// document middleware: runs before .save() and .create()
tourSchema.pre("save", function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// query middleware
tourSchema.pre(/^find/, function(next) {
  //   /^find/ - all the strings starts with 'find'
  this.find({ secretTour: { $ne: true } }); //$ne = not equal

  this.start = Date.now();
  next();
});

// aggregation middleware
tourSchema.pre("aggregate", function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
