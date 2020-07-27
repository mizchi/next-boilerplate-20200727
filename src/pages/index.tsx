import { GetServerSideProps } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import { loginWithGithub, getAuth, logout } from "../client/firebaseHelpers";
import { Header } from "../client/components/Header";
import { useCurrentUserQuery, useDummyMutation } from "../client/gen/index";
import { GraphQLBoolean } from "graphql";

type Props = {};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  return {
    props: {},
  };
};

export default () => {
  const [user, loading] = useAuthState(getAuth());
  return (
    <main>
      <Header />
      {!loading && user ? (
        <>
          <button onClick={() => logout()}>Logout</button>
          <GraphqlExample />
        </>
      ) : (
        <button onClick={() => loginWithGithub()}>Login</button>
      )}
    </main>
  );
};

function GraphqlExample() {
  const currentUserQuery = useCurrentUserQuery();
  const [dummy, result] = useDummyMutation();
  return (
    <div>
      <div>uid: {currentUserQuery.data?.currentUser?.id}</div>
      <button
        disabled={result.loading}
        onClick={async () => {
          const res = await dummy({ variables: {} });
          console.log(res.data?.dummy?.error);
        }}
      >
        run command
      </button>
    </div>
  );
}
