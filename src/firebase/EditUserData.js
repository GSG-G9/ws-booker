import { db } from './config';

const EditUserData = async (
  id,
  phoneNumber,
  Name,
  isAdmin,
  Image,
  Email,
  coverImage,
  canBook,
  bookStartTime,
  bookEndTime,
  bookCapacity
) => {
  try {
    const response = db.collection('users').doc(id);
    await response.update({
      phone_number: phoneNumber,
      name: Name,
      is_admin: isAdmin,
      image: Image,
      email: Email,
      cover_image: coverImage,
      can_book: canBook,
      book_start_time: bookStartTime,
      book_end_time: bookEndTime,
      book_capacity: bookCapacity,
    });
    return {
      data: (await response.get()).data(),
      msg: 'user updated successfully',
    };
  } catch (err) {
    return err;
  }
};
export default EditUserData;
