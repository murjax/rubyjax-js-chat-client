import { Link } from 'react-router-dom';

function Navigation(props) {
  const navigationOptions = () => {
    return (
      <div>
        <Link
          to="/channels"
          className="p-2 rounded-md text-black font-medium hover:bg-slate-100"
          data-test-id="nav-post-new"
        >
          Channels
        </Link>
        <Link
          to="/channels/new"
          className="p-2 rounded-md text-black font-medium hover:bg-slate-100"
          data-test-id="nav-post-new"
        >
          New Channel
        </Link>
      </div>
    );
  };

  return (
    <div className="p-2 bg-white shadow-lg mb-4">
      <div className="flex p-2 justify-between bg-white">
        <h3 className="text-2xl px-1 text-black">
          Chat
        </h3>

        <div className="flex">
          {navigationOptions()}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
