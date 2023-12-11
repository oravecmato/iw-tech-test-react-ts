import {ChangeEvent, useEffect, useState} from "react";
import {getLocalAuthorities} from "../api/ratingsAPI";
import {ILocalAuthority} from "../types/ratings";

const selectStyle = {
    minWidth: "270px",
    padding: "1px 0",
    border: "#fff 1px solid",
    borderRadius: "2px"
};

type LocalAuthoritySelectPropsType = {
    selectedAuthority: number | undefined;
    setSelectedAuthority: (authority: number) => void;
};

export const LocalAuthoritySelect = (
    props: LocalAuthoritySelectPropsType
) => {
    const { selectedAuthority, setSelectedAuthority } = props;
    const [ authorities, setAuthorities ] = useState<ILocalAuthority[]>();
    const handleAuthoritySelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedAuthority(Number(event.target.value));
    };

    useEffect(() => {
        getLocalAuthorities().then(result => {
            setAuthorities(result.authorities);
        })
    }, []);

    return (
        <div>
            <select
                id="localAuthority"
                onChange={handleAuthoritySelect}
                style={selectStyle}
                value={selectedAuthority ?? ""}
            >
                <option value="" disabled >Choose</option>
                {
                    authorities && authorities.map((authority, key) => {
                        return (
                            <option key={key} value={authority.LocalAuthorityId}>
                                {authority.Name}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    );
};
