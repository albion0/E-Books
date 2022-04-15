import Card from "./Card/Card";
import classes from "./Cards.module.css";

const Cards = ({title, items}) => {
  return (
    <div className={classes.wrapper}>
        <h3 className={classes.heading}>{title}</h3>

        <div className={classes.cards}>
            {items.map(item => (
                <Card
                    key={item.id}
                    img={item.img}
                    title={item.title}
                    desc={item.desc}
                    price={item.price}
                    date={item.date} 
                />
            ))}
        </div>
    </div>
  )
}

export default Cards