const SinglePageReport = ({ report }) => {
  return (
    <div className="w-[100vw] h-[calc(100vh-5.5rem)] mx-auto overflow-hidden">
      <iframe
        srcDoc={report}
        title="Lighthouse Report"
        className="w-full h-full overflow-hidden"
      />
    </div>
  );
};

export default SinglePageReport;
