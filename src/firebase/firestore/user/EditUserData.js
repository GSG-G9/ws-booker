import { db } from '../../config';
import editUserSchema from '../../../utils/validation';

const EditUserData = async (id, payload) => {
  const payloadObj = {
    id: payload.id,
    name: payload.name,
    phoneNumber: payload.phoneNumber,
    image: payload.image,
  };
  try {
    const { name, phoneNumber, image } = await editUserSchema.validate(
      payloadObj
    );
    const response = db.collection('users').doc(id);
    await response.update({
      phoneNumber,
      name,
      image,
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
