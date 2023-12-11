import {useState, useEffect, useMemo} from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { LocalAuthoritySelect } from "./LocalAuthoritySelect";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import {getEstablishmentRatings } from "../api/ratingsAPI";
import {LocalAuthorityProfile} from "./LocalAuthorityProfile";
import {CircleLoader} from "./CircleLoader";

const tableStyle = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
};

const selectLabelStyle = {
  margin: "0 0 7px",
  color: "rgba(255,255,255,0.8)",
}

export const PaginatedEstablishmentsTable = () => {
  const [error, setError] =
    useState<{ message: string; [key: string]: string }>();
  const [establishments, setEstablishments] = useState<
    { [key: string]: string }[]
  >([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState(100);
  const [authority, setAuthority] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  const establishmentsPaginated = useMemo<
      { [key: string]: string }[]
      >(() => {
    return establishments.slice((pageNum - 1) * itemsPerPage, pageNum * itemsPerPage);
  }, [establishments, pageNum]);

  useEffect(() => {
    if (!authority)
      return;

    setIsLoading(true);
    getEstablishmentRatings(authority).then(
      (result) => {
        setEstablishments(result?.establishments);
        setPageCount(Math.ceil((result?.establishments.length ?? 0) / itemsPerPage));
        setPageNum(1);
        setIsLoading(false);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      }
    );
  }, [authority]);

  async function handlePreviousPage() {
    pageNum > 1 && setPageNum(pageNum - 1);
  }

  async function handleNextPage() {
    pageNum < pageCount && setPageNum(pageNum + 1);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div style={tableStyle}>
        <h2>Food Hygiene Ratings</h2>
        <h5 style={selectLabelStyle}>
          { authority ? (<>Local authority</>) : (<>Select a local authority</>) }
        </h5>
        <LocalAuthoritySelect selectedAuthority={authority} setSelectedAuthority={setAuthority} />
        { isLoading ? <CircleLoader /> : (
            <>
              { authority && <LocalAuthorityProfile establishments={establishments}/> }
              { authority && <EstablishmentsTable establishments={establishmentsPaginated} /> }
              { authority && <EstablishmentsTableNavigation
                  pageNum={pageNum}
                  pageCount={pageCount}
                  onPreviousPage={handlePreviousPage}
                  onNextPage={handleNextPage}
              />
              }
            </>
        )}
      </div>
    );
  }
};
