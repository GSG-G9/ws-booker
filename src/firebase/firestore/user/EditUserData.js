import { db } from '../../config';
import { userSchema } from '../../../utils/validation';

const EditUserData = async (id, payload) => {
  const payloadObj = {
    name: payload.name,
    phone_number: payload.phone_number,
  };

  try {
    const { name, phone_number } = await userSchema.validate(payloadObj);

    const response = db.collection('users').doc(id);
    await response.update({
      phone_number,
      name,
    });
    return {
      data: (await response.get()).data(),
      msg: 'user updated successfully',
    };
  } catch (err) {
    console.log('errr', err);
    return err;
  }
};
export default EditUserData;
