import React, { useState } from 'react';
import { Image, Typography, Divider, Form, Checkbox, message } from 'antd';
import { NavLink } from 'react-router-dom';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import { AllWorkspaces } from '../../utils';
import MainInput from '../../components/CommonComponents/Input';
import MainButton from '../../components/CommonComponents/Button';
import AdminNav from '../../components/CommonComponents/AdminNav';
import firebaseConfig from '../../firebase/config';
import {
  addWorkspace,
  getAllWorkspaces,
} from '../../firebase/firestore/workspace';
import Loader from '../../components/CommonComponents/Loader';
import './style.css';

const { Title, Text } = Typography;

const key = 'updatable';
const DashboardAddWorkspace = () => {
  const [headerImage, setHeaderImage] = useState('');
  const [headerImageURL, setHeaderImageURL] = useState('');
  const [galleryImage, setGalleryImage] = useState('');
  const [galleryImageURL, setGalleryImageURL] = useState('');
  const [isImageUploadLoader, setIsImageUploadLoader] = useState(false);
  const [isGalleryUploadLoader, setIsGalleryUploadLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const moment = extendMoment(Moment);

  const handleUpload = async () => {
    const image = headerImage.target.files[0];
    try {
      setIsImageUploadLoader(true);
      const storageRef = await firebaseConfig.storage().ref();
      const fileRef = storageRef.child(image.name);
      await fileRef.put(image);
      const url = await fileRef.getDownloadURL();
      setHeaderImageURL(url);
      setIsImageUploadLoader(false);
      return url;
    } catch (err) {
      return err;
    }
  };

  const handleUploadGallery = async () => {
    const gallery = galleryImage.target.files[0];
    try {
      setIsGalleryUploadLoader(true);
      const storageRef = await firebaseConfig.storage().ref();
      const fileRef = storageRef.child(gallery.name);
      await fileRef.put(gallery);
      const url = await fileRef.getDownloadURL();
      setGalleryImageURL(url);
      setIsGalleryUploadLoader(false);
      return url;
    } catch (err) {
      return err;
    }
  };

  const [form] = Form.useForm();
  const onFinish = async (e) => {
    setLoading(true);
    const {
      workspaceName,
      Description,
      hoursOperation,
      feesPerHour,
      feesPerDay,
      totalCapacity,
      DaysOFWork,
      workspaceCity,
      workspaceAmenities,
      workspaceLocation,
    } = e;
    const converteStart = moment(hoursOperation[0]._d)
      .format('HH:mm:ss')
      .toString();
    const converteEnd = moment(hoursOperation[1]._d)
      .format('HH:mm:ss')
      .toString();
    if (!loading) {
      message.loading({ content: 'Loading...', key, duration: loading });
    }
    const fileURL = await handleUpload();
    const galleryFileURL = await handleUploadGallery();

    const addedWS = await addWorkspace({
      name: workspaceName,
      description: Description,
      days_of_work: DaysOFWork,
      start_time: converteStart,
      end_time: converteEnd,
      fees_per_hour: feesPerHour,
      fees_per_day: feesPerDay,
      capacity: totalCapacity,
      location: workspaceLocation,
      amenities: workspaceAmenities,
      city: workspaceCity,
      header_image: fileURL,
      image_gallery: galleryFileURL,
      rating: 0,
    });

    await getAllWorkspaces();
    form.resetFields();
    setHeaderImageURL(null);
    setGalleryImageURL(null);
    setLoading(false);
    if (addedWS.msg) {
      message.success({ content: 'Added successfully!', key });
    }
  };

  return (
    <div className="admin-main-container">
      <AdminNav />
      <div className="admin-dashboard-container">
        <Form
          className="add-ws-form"
          onFinish={onFinish}
          name="add-ws-form"
          form={form}
        >
          <Title level={3} className="admin-dashboard-title">
            Add Workspace{' '}
          </Title>
          <Divider />
          <div className="name-img-section">
            <div className="half-section-left">
              <Form.Item
                name="workspaceName"
                rules={[
                  { required: true, message: 'Please enter workspace name!' },
                ]}
              >
                <MainInput label="Workspace Name" name="workspaceNameInput" />
              </Form.Item>
              <div className="upload-section">
                <Form.Item name="headerImageMain">
                  <Text className="label">Header Image</Text>
                  <input
                    type="file"
                    name="headerImageInput"
                    onChange={(e) => setHeaderImage(e)}
                    className="upload-input"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="view-uploaded-image">
              {isImageUploadLoader ? (
                <Loader />
              ) : (
                headerImageURL && (
                  <Image src={headerImageURL} alt="" className="image-view" />
                )
              )}
            </div>
          </div>
          <Form.Item
            name="Description"
            rules={[
              {
                required: true,
                message: 'Please enter the workspace description!',
              },
            ]}
          >
            <MainInput
              type="textArea"
              label="Description"
              name="descriptionInput"
              className="textarea-description"
            />
          </Form.Item>
          <div className="flex-container">
            <div className="half-section-left">
              <Form.Item
                name="hoursOperation"
                rules={[
                  {
                    required: true,
                    message: 'Please enter workspace hours operations!',
                  },
                ]}
              >
                <MainInput
                  label="Hours of Operation"
                  name="OperationHoursInput"
                  type="time"
                />
              </Form.Item>
              <Form.Item
                name="workspaceCity"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the workspace city!',
                  },
                ]}
              >
                <MainInput label="Workspace City" name="workspaceCityInput" />
              </Form.Item>
              <Text className="label">Days of Work</Text>
              <div className="checkout-container">
                <Form.Item
                  name="DaysOFWork"
                  rules={[
                    {
                      required: true,
                      message: 'Please Select the Days of Work!',
                    },
                  ]}
                >
                  <Checkbox.Group>
                    <Checkbox value="Sun">Sun</Checkbox>
                    <Checkbox value="Mon">Mon</Checkbox>
                    <Checkbox value="Tue">Tue</Checkbox>
                    <Checkbox value="Wed">Wed</Checkbox>
                    <Checkbox value="The">The</Checkbox>
                    <Checkbox value="Fri">Fri</Checkbox>
                    <Checkbox value="Sat">Sat</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </div>
            </div>
            <div className="half-section-right">
              <Form.Item
                name="feesPerHour"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the workspace fees per hour!',
                  },
                ]}
              >
                <MainInput
                  label="Fees per Hour"
                  name="feesPerHourInput"
                  type="number"
                  className="feesH-input"
                />
              </Form.Item>
              <Form.Item
                name="feesPerDay"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the workspace fees per day!',
                  },
                ]}
              >
                <MainInput
                  label="Fees per Day"
                  name="feesPerDayInput"
                  type="number"
                  className="feesD-input"
                />
              </Form.Item>
              <Form.Item
                name="totalCapacity"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the workspace total capacity!',
                  },
                ]}
              >
                <MainInput
                  label="Total Capacity"
                  name="totalCapacityInput"
                  type="number"
                  className="totalC-input"
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item
            name="workspaceLocation"
            rules={[
              {
                required: true,
                message: 'Please enter the workspace location!',
              },
            ]}
          >
            <MainInput
              label="Location Details"
              name="locationDetails"
              placeholder="Town / City"
              className="location-input"
            />
          </Form.Item>
          <div className="amentities-Contaienr">
            <Text className="label">Amenities</Text>
            <div className="amenities-section">
              <Form.Item
                name="workspaceAmenities"
                rules={[
                  {
                    required: true,
                    message: 'Please Select the workspace amenities!',
                  },
                ]}
              >
                <Checkbox.Group>
                  <Checkbox className="check" value="High Speed WiFi">
                    High Speed WiFi
                  </Checkbox>
                  <Checkbox className="check" value="Library">
                    Library
                  </Checkbox>
                  <Checkbox className="check" value="Scanner">
                    Scanner
                  </Checkbox>
                  <Checkbox className="check" value="Free Coffee">
                    Free Coffee
                  </Checkbox>
                  <Checkbox className="check" value="Lounge / Chill-out Area">
                    Lounge / Chill-out Area
                  </Checkbox>
                  <Checkbox className="check" value="Kitchen">
                    Kitchen
                  </Checkbox>
                  <Checkbox className="check" value="Air Conditioning">
                    Air Conditioning
                  </Checkbox>
                  <Checkbox className="check" value="Computers">
                    Computers
                  </Checkbox>
                  <Checkbox className="check" value="Projector">
                    Projector
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </div>
          </div>

          <div className="images-section">
            <Form.Item name="headerImageAdditional">
              <Text className="label">Additional Images</Text>
              <input
                type="file"
                name="additionalImages"
                onChange={(e) => setGalleryImage(e)}
                className="upload-input"
              />
            </Form.Item>
            <div className="view-uploaded-image">
              {isGalleryUploadLoader ? (
                <Loader />
              ) : (
                galleryImageURL && (
                  <Image src={galleryImageURL} alt="" className="image-view" />
                )
              )}
            </div>
          </div>
          <div className="buttons-section">
            <Form.Item>
              <NavLink to={AllWorkspaces}>
                <MainButton
                  buttName="Cancel"
                  htmlType="default"
                  className="cancel"
                />
              </NavLink>
            </Form.Item>
            <Form.Item>
              <MainButton buttName="Add" className="add" htmlType="submit" />
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default DashboardAddWorkspace;
