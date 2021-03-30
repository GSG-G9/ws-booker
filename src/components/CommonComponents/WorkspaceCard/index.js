import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import Button from '../Button';
import Rating from '../Rating';

function WorkspaceCard({
  size,
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
  const matches = useMediaQuery({ query: '(max-width:600px)' });
  return (
    <Card
      hoverable
      style={{
        width: size === 'small' || matches ? 350 : 985,
        height: size === 'small' || matches ? 250 : 350,
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
            className={
              size === 'small' || matches ? 'small-cover-image' : 'cover-image'
            }
            src={image}
          />
        </Link>
      }
    >
      <div
        className={
          size === 'small' || matches
            ? 'small-info-container'
            : 'info-container'
        }
      >
        <p className={size === 'small' || matches ? 'small-price' : 'price'}>
          ₪ {feesPerDay} - Day - ₪ {feesPerHour} - Hour
        </p>
        <p
          className={
            size === 'small' || matches
              ? 'small-workspace-name'
              : 'workspace-name'
          }
        >
          {name}
        </p>
        <p
          className={
            size === 'small' || matches ? 'small-location' : 'location'
          }
        >
          {' '}
          {location}
        </p>
        <Rating rateValue={rating} />
        {size === 'small' || matches ? (
          <br />
        ) : (
          <p className="reviewers">{reviewers} Reviewers</p>
        )}
        <Button
          buttName="Book Now"
          width={size === 'small' || matches ? '100px' : '150px'}
          fontWeight="bold"
          onClick={onClick}
        />
      </div>
    </Card>
  );
}

WorkspaceCard.propTypes = {
  size: PropTypes.string,
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
  size: '',
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
