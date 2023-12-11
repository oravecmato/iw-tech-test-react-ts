const buttonStyle = {
  margin: "0 5px",
};

const wrapperStyle = {
  marginTop: "1rem",
}

type EstablishmentsTableNavigationType = {
  pageNum: number;
  pageCount: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export const EstablishmentsTableNavigation = (
  props: EstablishmentsTableNavigationType
) => {
  const { pageNum, pageCount, onPreviousPage, onNextPage } = props;
  return (
    <nav style={wrapperStyle}>
      {
        <button
          type="button"
          style={buttonStyle}
          disabled={pageNum <= 1}
          onClick={onPreviousPage}
        >
          -
        </button>
      }
      {pageNum}
      {
        <button
          type="button"
          style={buttonStyle}
          disabled={pageNum >= pageCount}
          onClick={onNextPage}
        >
          +
        </button>
      }
    </nav>
  );
};
