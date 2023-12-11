import {useEffect, useState} from "react";
import _uniqBy from "lodash/uniqBy";

const listStyle = {
    listStyle: "none",
    paddingLeft: "0",
    display: "inline-block",
    marginBottom: "7px",
};

const listItemStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "1rem",
    paddingBottom: "4px",
}

const headingStyle = {
    marginBottom: "0",
    fontSize: "16px",
    display: "flex",
    gap: "8px",
    alignItems: "baseline",
    color: "rgba(255,255,255,0.8)",
}

export const LocalAuthorityProfile: React.FC<{
    establishments: {[key: string]: string}[]
}> = ({ establishments }) => {
    const [count, setCount] = useState(0);
    const [ratings, setRatings] = useState<{rating: string; percentage: number}[]>([]);
    useEffect(() => {
        const cnt = establishments.length;
        setCount(cnt);
        setRatings(
            _uniqBy(establishments, 'RatingValue')
                .map(establishment => ({
                    rating: establishment.RatingValue,
                    percentage: establishments.filter(({RatingValue}) => RatingValue === establishment.RatingValue).length * 100 / cnt
                }))
        );
    }, [establishments]);

    return (
        <div>
            <h3 style={headingStyle}>Overall Hygiene Profile
                <small>({count} establishments)</small>
            </h3>
            <ul style={listStyle}>
                {
                    ratings.length && ratings.map(({rating, percentage}, key) => {
                        return (
                            <li key={key} style={listItemStyle}>
                                <span>
                                    {rating}
                                </span>
                                <strong>
                                    {percentage.toFixed(2)}%
                                </strong>
                            </li>
                        )
                    })
                }
            </ul>
            <hr/>
        </div>
    );
};
