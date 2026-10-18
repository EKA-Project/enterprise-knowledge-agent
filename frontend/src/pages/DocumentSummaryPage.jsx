{tab === 'summary' && <AiSummaryTab doc={doc} onReadPage={openReader} />}
{tab === 'reader' && (
  <ReaderTab doc={doc} page={readerPage} onPageChange={setReaderPage} onToast={setToast} />
)}
{tab === 'graph' && <div />}