const Spinner = ({ loadingText }: { loadingText?: string }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="border-t-primary! size-14 animate-spin rounded-full border-[6px] border-gray-200">
        <span className="sr-only">Loading...</span>
      </div>
      <span>{loadingText}</span>
    </div>
  );
};

export default Spinner;
