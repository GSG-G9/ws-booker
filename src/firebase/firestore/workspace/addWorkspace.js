import firebase from 'firebase';
import { db } from '../../config';
import addWorkspaceSchema from '../../../utils/validation';

const addWorkspace = async (payload) => {
  const payloadObj = {
    name: payload.name,
    description: payload.description,
    days_of_work: payload.days_of_work,
    start_time: payload.start_time,
    end_time: payload.end_time,
    fees_per_hour: payload.fees_per_hour,
    fees_per_day: payload.fees_per_day,
    capacity: payload.capacity,
    location: payload.location,
    amenities: payload.amenities,
    city: payload.city,
    header_image: payload.header_image,
    image_gallery: payload.image_gallery,
    rating: payload.rating,
    reviewers_number: payload.reviewers_number,
  };
  try {
    const {
      name,
      description,
      days_of_work,
      start_time,
      end_time,
      fees_per_hour,
      fees_per_day,
      capacity,
      location,
      amenities,
      city,
      header_image,
      image_gallery,
      rating,
      reviewers_number,
    } = await addWorkspaceSchema.validate(payloadObj);
    db.collection('workspaces').add({
      name,
      description,
      days_of_work,
      start_time,
      end_time,
      fees_per_hour,
      fees_per_day,
      capacity,
      location,
      amenities,
      city,
      header_image,
      image_gallery,
      rating,
      reviewers_number,
      created_at: firebase.firestore.Timestamp.now(),
    });
    return { msg: 'workspace added successfully!' };
  } catch (err) {
    return err;
  }
};

export default addWorkspace;
