import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ChannelIndex(props) {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const getChannels = () => {
      fetch('http://localhost:3001/channels', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json()).then((data) => {
        setChannels(data);
      });
    }

    getChannels();
  }, []);

  return (
    <div
      className="flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-b-xl mb-10 p-4 bg-clip-border"
    >
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                ID
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Channel Name
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Users Active
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Actions
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {channels.map((channel) => (
            <tr key={channel.id}>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {channel.id}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {channel.channel_name}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {channel.user_count}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Link
                  to={`${channel.id}`}
                  className="block text-sm antialiased font-medium leading-normal text-blue-400"
                >
                  Join
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChannelIndex;
