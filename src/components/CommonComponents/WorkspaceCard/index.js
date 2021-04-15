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
  const matchesSmall = useMediaQuery({ query: '(max-width:768px)' });
  const matchesMedium = useMediaQuery({ query: '(max-width:1200px)' });
  return (
    <Card
      hoverable
      className={
        size === 'small' || matchesSmall
          ? 'small-card'
          : matchesMedium
          ? 'medium-card'
          : 'card'
      }
      cover={
        <Link to={`/workspace/${id}`}>
          <img
            alt="workspace"
            className={
              size === 'small' || matchesSmall
                ? 'small-cover-image'
                : matchesMedium
                ? 'medium-cover-image'
                : 'cover-image'
            }
            src={image}
          />
        </Link>
      }
    >
      <div
        className={
          size === 'small' || matchesSmall
            ? 'small-info-container'
            : matchesMedium
            ? 'medium-info-container'
            : 'info-container'
        }
      >
        <p
          className={size === 'small' || matchesSmall ? 'small-price' : 'price'}
        >
          ₪ {feesPerDay} - Day | ₪ {feesPerHour} - Hour
        </p>
        <p
          className={
            size === 'small' || matchesSmall
              ? 'small-workspace-name'
              : 'workspace-name'
          }
        >
          {name}
        </p>
        <p
          className={
            size === 'small' || matchesSmall ? 'small-location' : 'location'
          }
        >
          {' '}
          {location}
        </p>
        <Rating rateValue={rating} />
        {size === 'small' || matchesSmall ? (
          <br />
        ) : (
          <p className="reviewers">{reviewers} Reviewers</p>
        )}
        <Button
          buttName="Book Now"
          // width={size === 'small' || matchesSmall ? '100px' : '150px'}
          fontWeight="bold"
          onClick={onClick}
          className="book-btn-card"
        />
      </div>
    </Card>
  );
}

WorkspaceCard.propTypes = {
  size: PropTypes.string,
  id: PropTypes.string,
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
