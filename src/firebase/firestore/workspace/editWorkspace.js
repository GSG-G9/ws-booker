import { db } from '../../config';
import { workspaceSchema } from '../../../utils/validation';

const editWorkspace = async (id, data) => {
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
    } = await workspaceSchema.validate(data);
    await db.collection('workspaces').doc(id).update({
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
    });
    return { msg: 'workspace updated successfully' };
  } catch (err) {
    return err;
  }
};

export default editWorkspace;
