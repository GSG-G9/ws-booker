import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Empty, Image, Pagination } from 'antd';
import PropTypes from 'prop-types';
import WorkspaceCard from '../WorkspaceCard';
import arrow from '../../../assets/icons/arrow.svg';
import './style.css';

const { Title, Text } = Typography;

const CardContainer = ({
  title,
  searchText,
  data,
  seeMoreLink,
  size,
  search,
}) => {
  const numEachPage = 4;
  const [limit, setLimit] = useState([0, numEachPage]);
  return (
    <div className="main-container-cards">
      {searchText || searchText === 'top-new' ? (
        <>
          <div className="search-title-container">
            <Title className="search-title">{title}</Title>
            {search ? <Text className="search-text"> {searchText}</Text> : null}
          </div>
          <div className="cardcontainer">
            <ul className="cardcontainerul">
              {data.length !== 0 ? (
                data.slice(limit[0], limit[1]).map((item) => (
                  <li key={item.id} className="cardcontainerli">
                    <WorkspaceCard
                      image={item.header_image}
                      feesPerDay={item.fees_per_day}
                      feesPerHour={item.fees_per_hour}
                      {...item}
                      size={size}
                    />
                  </li>
                ))
              ) : (
                <Empty description="Sorry! There is no Workspaces." />
              )}
            </ul>
            <div className="pagination">
              <Pagination
                total={data.length}
                pageSize={4}
                onChange={(value) => {
                  setLimit([(value - 1) * numEachPage, value * numEachPage]);
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="title-container">
            <Title className="toprated-title">{title}</Title>
            <Link to={seeMoreLink} className="seemore">
              See more
              <Image src={arrow} className="arrow" />
            </Link>
          </div>

          <div className="cardcontainer">
            <ul className="cardcontainerul">
              {data.length !== 0 ? (
                data.map((item) => (
                  <li key={item.id} className="cardcontainerli">
                    <WorkspaceCard
                      image={item.header_image}
                      feesPerDay={item.fees_per_day}
                      feesPerHour={item.fees_per_hour}
                      {...item}
                      size={size}
                    />
                  </li>
                ))
              ) : (
                <Empty description="Sorry! There is no Workspaces." />
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
CardContainer.defaultProps = {
  title: '',
  searchText: '',
  size: '',
  seeMoreLink: {},
  data: [],
  search: false,
};

CardContainer.propTypes = {
  title: PropTypes.string,
  searchText: PropTypes.string,
  size: PropTypes.string,
  seeMoreLink: PropTypes.shape({
    pathname: PropTypes.string,
    param1: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        image: PropTypes.string,
        feesPerDay: PropTypes.number,
        feesPerHour: PropTypes.number,
        location: PropTypes.string,
        rating: PropTypes.number,
        reviewers: PropTypes.number,
      })
    ),
  }),
  search: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string,
      feesPerDay: PropTypes.number,
      feesPerHour: PropTypes.number,
      location: PropTypes.string,
      rating: PropTypes.number,
      reviewers: PropTypes.number,
    })
  ),
};

export default CardContainer;
