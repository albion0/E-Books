import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TablePagination } from "@mui/material";
import { getAllBookReviews } from "../../../../store/actions/books";
import Review from "./Review/Review";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import classes from "./Reviews.module.css";

/*
const reviews = [];

for(let i = 1; i <= 5; i++) {
  reviews.push({
    id: "id" + i,
    stars: 3.5,
    name: "John",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    review: "Bibendum at varius vel pharetra vel turpis nunc eget lorem. Porttitor lacus luctus accumsan tortor posuere. Faucibus turpis in eu mi bibendum. Ullamcorper dignissim cras tincidunt lobortis feugiat. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh sed pulvinar. Tincidunt praesent semper feugiat nibh sed. Semper viverra nam libero justo laoreet. Sagittis purus sit amet volutpat consequat mauris. Nam aliquam sem et tortor consequat id. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit. Turpis tincidunt id aliquet risus feugiat in ante metus. Adipiscing commodo elit at imperdiet dui accumsan sit."
  })
}
*/
const defaultPage = 0;
const defaultLimit = 10;

const Reviews = ({ bookId, paginationLimits }) => {
  const [currentReviews, setCurrentReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [currentLimit, setCurrentLimit] = useState(defaultLimit);
  const [totalItems, setTotalItems] = useState(100);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const getAllBookReviewsResponse = useSelector(
    ({ books }) => books.bookReviews
  );

  /*
  const getBookReviewsResponse = useSelector(({ books }) => books.bookReviews);
  useEffect(() => {
    if(getBookReviewsResponse.loading) {
      dispatch(getAllBookReviews({
        bookId,
        page: currentPage + 1,
        limit: currentLimit
      }))
    }
  }, [getBookReviewsResponse.loading]);
  */

  useEffect(() => {
    paginationLimits({ page: currentPage, limit: currentLimit });

    dispatch(
      getAllBookReviews({
        bookId,
        page: currentPage + 1,
        limit: currentLimit,
      })
    );
  }, [currentPage, currentLimit]);

  useEffect(() => {
    if (getAllBookReviewsResponse && getAllBookReviewsResponse.loading) {
      setIsLoading(true);
    } else if (getAllBookReviewsResponse && getAllBookReviewsResponse.success) {
      setIsLoading(false);

      const { reviews, totalItems } = getAllBookReviewsResponse.data;

      setCurrentReviews(reviews);
      setTotalItems(totalItems);
    } else if (getAllBookReviewsResponse && getAllBookReviewsResponse.error) {
      setIsLoading(false);
    }
  }, [getAllBookReviewsResponse]);

  if (isLoading)
    return (
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "300px" }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
      </div>
    );

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setCurrentLimit(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <div>
      {currentReviews.map((review) => (
        <Review
          key={review._id}
          name={review.name}
          rating={review.rating}
          title={review.title}
          description={review.description}
        />
      ))}

      <div className={classes.pagination}>
        <TablePagination
          component="div"
          count={totalItems}
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={currentLimit}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ marginBottom: "20px" }}
          className={classes.table}
        />
      </div>
    </div>
  );
};

export default Reviews;
