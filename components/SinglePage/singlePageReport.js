const SinglePageReport = ({ report }) => {
  return (
    <div className="w-[100vw] h-[calc(100vh-3.5rem)]">
      <iframe
        srcDoc={report}
        title="Lighthouse Report"
        className="w-full h-full"
      />
    </div>
  );
};

export default SinglePageReport;
