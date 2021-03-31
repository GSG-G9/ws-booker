import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Empty, Image } from 'antd';
import PropTypes from 'prop-types';

import WorkspaceCard from '../WorkspaceCard';
import arrow from '../../../assets/icons/arrow.svg';
import './style.css';

const { Title, Text } = Typography;

const CardContainer = ({ title, searchText, data, seeMoreLink, size }) => (
  <div>
    {searchText ? (
      <div className="search-title-container">
        <Title className="search-title">{title}</Title>
        <Text className="search-text"> {searchText}</Text>
      </div>
    ) : (
      <div className="title-container">
        <Title className="toprated-title">{title}</Title>
        <Link to={`/${seeMoreLink}`} className="seemore">
          See more
          <Image src={arrow} className="arrow" />
        </Link>
      </div>
    )}

    <div className="cardcontainer">
      <ul className="cardcontainerul">
        {data.length !== 0 ? (
          data.map((item) => (
            <li key={item.id} className="cardcontainerli">
              <WorkspaceCard {...item} size={size} />
            </li>
          ))
        ) : (
          <Empty description="Sorry! There is no Workspaces." />
        )}
      </ul>
    </div>
  </div>
);
CardContainer.defaultProps = {
  title: '',
  searchText: '',
  size: '',
  seeMoreLink: '',
  data: [],
};

CardContainer.propTypes = {
  title: PropTypes.string,
  searchText: PropTypes.string,
  size: PropTypes.string,
  seeMoreLink: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      image: PropTypes.string,
      feesPerDay: PropTypes.number,
      feesPerHour: PropTypes.number,
      location: PropTypes.string,
      rating: PropTypes.number,
      reviewers: PropTypes.number,
      onClick: PropTypes.func,
    })
  ),
};

export default CardContainer;
