import Review from "./Review/Review";
import classes from "./Reviews.module.css";

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

const Reviews = () => {
  return (
    <div>
      {reviews.map(review => (
        <Review
          key={review.id}
          name={review.name}
          stars={review.stars}
          title={review.title}
          review={review.review}
        />
      ))}
    </div>
  )
}

export default Reviews