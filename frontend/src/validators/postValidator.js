// filepath: /C:/Users/ROG/OneDrive/Desktop/Projects/The Home Services Booking System/frontend/src/validators/postValidator.js
const postValidator = ({
  title,
  description,
  contactNo,
  category,
  location,
  whatappLink,
  facebookLink,
  websiteLink,
}) => {
  const errors = {
    title: "",
    description: "",
    contactNo: "",
    category: "",
    location: "",
    whatappLink: "",
    facebookLink: "",
    websiteLink: "",
  };

  if (!title) {
    errors.title = "Title is required";
  }

  if (!description) {
    errors.description = "Description is required";
  }

  if (!contactNo) {
    errors.contactNo = "Contact number is required";
  }

  if (!category) {
    errors.category = "Category is required";
  }

  if (!location) {
    errors.location = "Location is required";
  }

  if (!whatappLink) {
    errors.whatappLink = "WhatsApp link is required";
  }

  if (!facebookLink) {
    errors.facebookLink = "Facebook link is required";
  }

  if (!websiteLink) {
    errors.websiteLink = "Website link is required";
  }

  return errors;
};

export default postValidator;
