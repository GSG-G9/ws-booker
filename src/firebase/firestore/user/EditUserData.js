import { db } from '../../config';
import { userSchema } from '../../../utils/validation';

const EditUserData = async (id, payload) => {
  const payloadObj = {
    name: payload.name,
    phone_number: payload.phone_number,
    image: payload.image,
  };
  try {
    const { name, phone_number, image } = await userSchema.validate(payloadObj);
    const response = db.collection('users').doc(id);
    await response.update({
      phone_number,
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
