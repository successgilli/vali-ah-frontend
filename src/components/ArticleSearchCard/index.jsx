import React from 'react';
import PropTypes from 'prop-types';
import {
  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBBtn
} from 'mdbreact';

// eslint-disable-next-line max-len
const ArticleSearchCard = ({
  authorName, title, summary, id, category
}) => (
  <MDBCard key={id} className="my-5 px-5 pb-5">
    <MDBCardBody>
      <MDBRow>
        <MDBCol lg="5">
          <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
            <img
              className="img-fluid"
              src="https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg"
              alt={authorName}
            />
            <a href="#!">
              <MDBMask overlay="white-slight" />
            </a>
          </MDBView>
        </MDBCol>
        <MDBCol lg="7">
          <a href="#!" className="green-text">
            <h6 className="font-weight-bold mb-3">
              <MDBIcon icon="utensils" className="pr-2" />
              {category}
            </h6>
          </a>
          <h3 className="font-weight-bold mb-3 p-0">
            <strong>{title}</strong>
          </h3>
          <p>
            {summary}
          </p>
          <p>
              by
            <a href="#!">
              <strong>{authorName}</strong>
            </a>
            , 19/08/2019
          </p>
          <MDBBtn color="success" size="md" className="waves-light ">
              Read more
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      <hr className="my-5" />
    </MDBCardBody>
  </MDBCard>
);

ArticleSearchCard.propTypes = {
  authorName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default ArticleSearchCard;
