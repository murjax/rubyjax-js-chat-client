import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function ChannelNew(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const channelId = uuidv4();
    const channelName = prompt('Enter a channel name');
    navigate(`/channels/${channelId}?channel_name=${encodeURIComponent(channelName)}`);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center relative md:rounded-md bg-white shadow-md mb-10 p-2">
      <h2 className="text-2xl">New Channel</h2>
    </div>
  );
}

export default ChannelNew;
