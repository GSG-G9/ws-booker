import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import Button from '../Button';
import Rating from '../Rating';

function WorkspaceCard({
  id,
  name,
  image,
  feesPerDay,
  feesPerHour,
  location,
  rating,
  reviewers,
  onClick,
}) {
  return (
    <Card
      hoverable
      style={{
        width: 985,
        height: 350,
        display: 'flex',
        flexDirection: 'row',
      }}
      cover={
        <Link to={`/workspace/${id}`}>
          <img
            alt="workspace"
            style={{
              borderRadius: '5px',
            }}
            className="cover-image"
            src={image}
          />
        </Link>
      }
    >
      <div className="info-container">
        <p className="price">
          ₪ {feesPerDay} - Day - ₪ {feesPerHour} - Hour
        </p>
        <p className="workspace-name">{name}Gaza Sky Geeks</p>
        <p className="location"> {location}</p>
        <Rating rateValue={rating} />
        <p className="reviewers">{reviewers} Reviewers</p>
        <Button
          buttName="Book Now"
          width="150px"
          fontWeight="bold"
          onClick={onClick}
        />
      </div>
    </Card>
  );
}

WorkspaceCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.string,
  feesPerDay: PropTypes.number,
  feesPerHour: PropTypes.number,
  location: PropTypes.string,
  rating: PropTypes.number,
  reviewers: PropTypes.number,
  onClick: PropTypes.func,
};

WorkspaceCard.defaultProps = {
  id: '',
  name: '',
  image: '',
  feesPerDay: 0,
  feesPerHour: 0,
  location: '',
  rating: 0,
  reviewers: 0,
  onClick: () => {},
};

export default WorkspaceCard;
