import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useGetByUsernameQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Flex, Wrap, WrapItem, Button } from "@chakra-ui/react";
import { Wrapper } from "../../components/Wrapper";

const User: NextPage = () => {
  const router = useRouter();
  const username = router.query.username as string;
  const [{ data, error, fetching }] = useGetByUsernameQuery({
    variables: { username },
  });
  const firstname = data?.getByUsername?.firstName
  const lastname = data?.getByUsername?.lastName

  if (fetching) {
    return (
      <Flex alignItems="center" h="100vh" justifyContent="center">
        loading...
      </Flex>
    );
  } else if (error) {
    return (
      <Flex alignItems="center" h="100vh" justifyContent="center">
        {" "}
        an error occurered when fetching
      </Flex>
    );
  } else {
    return (
      <Wrapper variant="small">
        <Flex
          alignItems="center"
          justifyContent="center"
          fontWeight="bold"
          fontSize="5xl"
          flexWrap="wrap"
        >
          Welcome {`${firstname} ${lastname}`}
          <Wrap>
            <WrapItem>
                <Button colorScheme='teal' onClick={() => {
                  router.push("quiz")
                }}>Play</Button>
            </WrapItem>
          </Wrap>
        </Flex>
      </Wrapper>
    );
  }
};

export default withUrqlClient(createUrqlClient, { ssr: true })(User);
