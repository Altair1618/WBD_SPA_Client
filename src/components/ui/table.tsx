import React from 'react';

interface ActionTableProps {
  data: Record<string, any>[];
  headers?: Record<string, string>;
  renderActions?: (rowData: Record<string, any>) => React.ReactNode;
}

const ActionTable: React.FC<ActionTableProps> = ({ data, headers, renderActions }) => {
  if (!data || data.length === 0) {
    return <p className='w-full text-center mt-4'>Tidak ada data yang tersedia.</p>;
  }

  const dataHeaders = Object.keys(data[0]);
  const displayHeaders = headers && Object.keys(headers).length <= dataHeaders.length ? Object.keys(headers) : dataHeaders;

  return (
    <table className="border-collapse w-full outline outline-gray-200 outline-1 rounded-[20px] overflow-hidden">
      <thead>
        <tr>
          {displayHeaders.map((header, index) => (
            <th
              key={header}
              className={`border px-2 py-1 ${index === 1 ? 'text-left whitespace-nowrap w-full' : ''}`}
            >
              {!headers ? header : headers[header]}
            </th>
          ))}
          {renderActions && <th className="border px-2 py-1 w-auto">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {displayHeaders.map((header, colIndex) => (
              <td
                key={colIndex}
                className={`border p-2 ${colIndex === 1 ? 'whitespace-nowrap w-full overflow-ellipsis' : ''}`}
              >
                {row[header]}
              </td>
            ))}
            {renderActions && (
              <td className="border px-2 py-1 whitespace-nowrap w-full">{renderActions(row)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ActionTable;
