export default function Table() {
  return (
    <div className="overflow-hidden rounded-lg w-full border border-gray-300">
      <table className="p-3 w-full text-left border-collapse overflow-x-scroll">
        <thead className="bg-gray-75">
          <tr className="">
            <th className="uppercase text-sm font-medium text-gray-700 p-3">
              Date
            </th>
            <th className="uppercase text-sm font-medium text-gray-700 p-3">
              Discription
            </th>
            <th className="uppercase text-sm font-medium text-gray-700 p-3">
              amount
            </th>
            <th className="uppercase text-sm font-medium text-gray-700 p-3"></th>
          </tr>
        </thead>
        <tbody className="bg-gray-50 border-collapse">
          <tr className="">
            <td className="p-3 text-gray-600 text-sm">5/21/2024 - 6/4/2024</td>
            <td className="p-3 text-gray-600 text-sm">548628682-D6</td>
            <td className="p-3 text-gray-600 text-sm">$0.00</td>
            <td className="p-3 text-gray-600 text-sm"></td>
          </tr>
          {/* tr - 2 */}
          <tr>
            <td className="p-3 text-gray-600 text-sm">5/21/2024 - 6/4/2024</td>
            <td className="p-3 text-gray-600 text-sm">548628682-D6</td>
            <td className="p-3 text-gray-600 text-sm font-dium">$0.00</td>
            <td className="p-3 text-gray-600 text-sm font-dium"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
