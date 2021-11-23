import React from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";

const CampaignDetailComponent = () => {
  const { id } = useParams<{ id: string }>();
  const { url } = useRouteMatch();
  const history = useHistory();

  return (
    <div>
      <h6>Campaign Detail</h6>
      <p>You have selected Campaign - {id}</p>
      <button>
        <Link to={`${url}/messages`}>Goto Messages</Link>
      </button>
      <button>
        <Link to={`${url}/contacts`}>Goto Contacts</Link>
      </button>
      <button onClick={history.goBack}>Go Back</button>
    </div>
  );
};

export default CampaignDetailComponent;
