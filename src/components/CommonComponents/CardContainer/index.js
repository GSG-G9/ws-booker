import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Empty } from 'antd';
import PropTypes from 'prop-types';
import WorkspaceCard from '../WorkspaceCard';
import './style.css';

const { Title, Text } = Typography;

const CardContainer = ({ title, searchText, data, seeMoreLink, size }) => (
  <div className="maincontainer">
    {searchText ? (
      <>
        <Title>{title}</Title>
        <Text>{searchText}</Text>
      </>
    ) : (
      <>
        <Title>{title}</Title>
        <Link to={`/${seeMoreLink}`}>See more</Link>
      </>
    )}

    <div className="cardcontainer">
      <ul>
        {data.length !== 0 ? (
          data.map((item) => (
            <li key={item.id}>
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
