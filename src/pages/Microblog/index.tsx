import { FC } from "react";
import MicroblogFeed from "../../components/MicroblogFeed";

const Microblog: FC = () => {
  return (
    <div>
      <MicroblogFeed
        did="did:plc:ys5aypbbeqmwn42edy5t3sho"
        // did="did:plc:h45v3i6c7xkwt2c3fmbsj24u"
        pageSize={10}
      />
    </div>
  );
};

export default Microblog;
